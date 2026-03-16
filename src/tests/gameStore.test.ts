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

const resetStore = () => {
  useGameStore.setState({
    npcs: [],
    firedEventKeys: [],
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
});
