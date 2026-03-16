import { beforeEach, describe, expect, it, vi } from 'vitest';

const socketState = vi.hoisted(() => {
  const socket = {
    connected: false,
    connect: vi.fn(() => {
      socket.connected = true;
    }),
    on: vi.fn(),
    emit: vi.fn(),
  };
  return { socket };
});

const workerState = vi.hoisted(() => ({
  workerManager: {
    init: vi.fn(),
    startSimulation: vi.fn(),
    syncNpcs: vi.fn(),
    moveNpcsToTarget: vi.fn(),
    sendTension: vi.fn(),
    stopSimulation: vi.fn(),
  },
}));

vi.mock('socket.io-client', () => ({
  io: vi.fn(() => socketState.socket),
}));

vi.mock('../managers/WorkerManager', () => workerState);

import { useGameStore } from '../stores/gameStore';
import { INITIAL_MISSION_PROGRESS } from '../systems/interactionZones';
import { NPCBehavior, NPCMood, NPCType, EmotionalState } from '../types/enums';

const resetStore = () => {
  useGameStore.setState({
    npcs: [],
    firedEventKeys: [],
    interactionState: {
      nearbyZoneId: null,
      lastMessage: null,
      missionProgress: INITIAL_MISSION_PROGRESS,
    },
    dayStats: { killed: 0, arrested: 0, injured: 0, damage: 0 },
    gameState: {
      isPlaying: false,
      isTimePaused: false,
      inGameTime: '06:00',
      tensionLevel: 10,
      timeSpeed: 1,
      currentPhaseLabel: 'start',
      playerReputation: 0,
      moralScore: 50,
      showStatistics: false,
      masterVolume: 0.5,
      muted: false,
    },
  });
  socketState.socket.connected = false;
  socketState.socket.connect.mockClear();
  socketState.socket.on.mockClear();
  socketState.socket.emit.mockClear();
  workerState.workerManager.syncNpcs.mockClear();
  workerState.workerManager.moveNpcsToTarget.mockClear();
};

describe('gameStore core flow', () => {
  beforeEach(() => {
    resetStore();
  });

  it('initializes socket only once and registers listeners', () => {
    const state = useGameStore.getState();

    state.initSocket();
    state.initSocket();

    expect(socketState.socket.connect).toHaveBeenCalledTimes(1);
    expect(socketState.socket.on).toHaveBeenCalledWith('init-state', expect.any(Function));
    expect(socketState.socket.on).toHaveBeenCalledWith('time-sync', expect.any(Function));
  });

  it('evaluates 06:00 timeline and spawns first wave', () => {
    useGameStore.getState().evaluateEvents('06:00');
    const state = useGameStore.getState();

    expect(state.gameState.inGameTime).toBe('06:00');
    expect(state.gameState.tensionLevel).toBe(10);
    expect(state.npcs.length).toBe(25);
    expect(workerState.workerManager.syncNpcs).toHaveBeenCalled();
    expect(socketState.socket.emit).toHaveBeenCalledWith('update-time', '06:00');
  });

  it('resets the day cycle to midnight and clears dynamic entities', () => {
    useGameStore.getState().evaluateEvents('12:30');
    expect(useGameStore.getState().npcs.length).toBeGreaterThan(0);

    useGameStore.getState().resetDayCycle();
    const state = useGameStore.getState();

    expect(state.npcs.length).toBe(0);
    expect(state.firedEventKeys.length).toBe(0);
    expect(state.gameState.inGameTime).toBe('00:00');
  });

  it('applies interaction outcomes to mission state and game metrics', () => {
    useGameStore.getState().setNearbyInteraction('epoch-terminal');
    useGameStore.getState().triggerInteraction();

    const state = useGameStore.getState();

    expect(state.interactionState.missionProgress.epochBriefingVerified).toBe(true);
    expect(state.gameState.playerReputation).toBe(8);
    expect(state.gameState.moralScore).toBe(60);
    expect(state.gameState.tensionLevel).toBe(4);
    expect(state.interactionState.lastMessage).toContain('Einsatzstab');
  });

  it('does not double-count the same interaction twice', () => {
    useGameStore.getState().setNearbyInteraction('epoch-terminal');
    useGameStore.getState().triggerInteraction();
    useGameStore.getState().setNearbyInteraction('hazard-console');
    useGameStore.getState().triggerInteraction();
    useGameStore.getState().triggerInteraction();

    const state = useGameStore.getState();

    expect(state.interactionState.missionProgress.hazardMapPrepared).toBe(true);
    expect(state.gameState.playerReputation).toBe(14);
    expect(state.interactionState.lastMessage).toContain('bereits');
  });

  it('returns a locked message for mission steps out of order', () => {
    useGameStore.getState().setNearbyInteraction('evacuation-board-north');
    useGameStore.getState().triggerInteraction();

    const state = useGameStore.getState();

    expect(state.interactionState.missionProgress.prioritizedZoneIds).toHaveLength(0);
    expect(state.interactionState.lastMessage).toContain('Hazard');
  });

  it('applies hazard mission effects to responders and security units', () => {
    useGameStore.setState((state) => ({
      ...state,
      npcs: [
        {
          id: 9001,
          type: NPCType.MEDIC,
          position: [10, 1.2, 8],
          rotation: 0,
          outfitColor: '#ffffff',
          emotionalState: EmotionalState.NEUTRAL,
          mood: NPCMood.PEACEFUL,
          behavior: NPCBehavior.IDLE,
        },
        {
          id: 9002,
          type: NPCType.POLICE,
          position: [8, 1.2, 9],
          rotation: 0,
          outfitColor: '#1122aa',
          emotionalState: EmotionalState.NEUTRAL,
          mood: NPCMood.PEACEFUL,
          behavior: NPCBehavior.PATROL,
        },
      ],
    }));

    useGameStore.getState().setNearbyInteraction('epoch-terminal');
    useGameStore.getState().triggerInteraction();
    useGameStore.getState().setNearbyInteraction('hazard-console');
    useGameStore.getState().triggerInteraction();

    const state = useGameStore.getState();
    const medic = state.npcs.find((npc) => npc.id === 9001)!;
    const police = state.npcs.find((npc) => npc.id === 9002)!;

    expect(medic.behavior).toBe(NPCBehavior.CLEANUP);
    expect(medic.mood).toBe(NPCMood.TENSE);
    expect(police.behavior).toBe(NPCBehavior.SHIELD_WALL);
    expect(police.mood).toBe(NPCMood.TENSE);
  });

  it('applies evacuation board effects only to the addressed zone sector', () => {
    useGameStore.setState((state) => ({
      ...state,
      npcs: [
        {
          id: 9101,
          type: NPCType.CIVILIAN,
          position: [-12, 1.2, 18],
          rotation: 0,
          outfitColor: '#bbbbbb',
          emotionalState: EmotionalState.PEACEFUL,
          mood: NPCMood.PEACEFUL,
          behavior: NPCBehavior.WANDER,
        },
        {
          id: 9102,
          type: NPCType.CIVILIAN,
          position: [14, 1.2, -16],
          rotation: 0,
          outfitColor: '#bbbbbb',
          emotionalState: EmotionalState.PEACEFUL,
          mood: NPCMood.PEACEFUL,
          behavior: NPCBehavior.WANDER,
        },
      ],
    }));

    useGameStore.getState().setNearbyInteraction('epoch-terminal');
    useGameStore.getState().triggerInteraction();
    useGameStore.getState().setNearbyInteraction('hazard-console');
    useGameStore.getState().triggerInteraction();
    useGameStore.getState().setNearbyInteraction('evacuation-board-north');
    useGameStore.getState().triggerInteraction();

    const state = useGameStore.getState();
    const northCivilian = state.npcs.find((npc) => npc.id === 9101)!;
    const southCivilian = state.npcs.find((npc) => npc.id === 9102)!;

    expect(northCivilian.behavior).toBe(NPCBehavior.FLEE);
    expect(northCivilian.mood).toBe(NPCMood.PANICKED);
    expect(southCivilian.behavior).toBe(NPCBehavior.WANDER);
    expect(southCivilian.mood).toBe(NPCMood.PEACEFUL);
  });
});
