import { describe, expect, it } from 'vitest';
import { HUD_PANEL_LAYOUT_STORAGE_KEY, loadPersistedPanelUi, serializePanelUi } from '../components/ui/hudLayoutPersistence';

const fallback = {
  left: { minimized: false, zoomLevel: 0, offsetX: 0, offsetY: 0 },
  right: { minimized: true, zoomLevel: 1, offsetX: 50, offsetY: -10 },
};

describe('hud layout persistence', () => {
  it('uses a stable storage key', () => {
    expect(HUD_PANEL_LAYOUT_STORAGE_KEY).toBe('hud-panel-layout-v1');
  });

  it('loads persisted panel data and clamps zoom safely', () => {
    const result = loadPersistedPanelUi(JSON.stringify({
      left: { minimized: true, zoomLevel: 99, offsetX: 120, offsetY: -40 },
      right: { minimized: false, zoomLevel: -99, offsetX: 12, offsetY: 8 },
    }), fallback);

    expect(result).toEqual({
      left: { minimized: true, zoomLevel: 3, offsetX: 120, offsetY: -40 },
      right: { minimized: false, zoomLevel: -3, offsetX: 12, offsetY: 8 },
    });
  });

  it('falls back to defaults for invalid persisted payloads', () => {
    expect(loadPersistedPanelUi('{invalid-json', fallback)).toEqual(fallback);
    expect(loadPersistedPanelUi(JSON.stringify({ left: { minimized: 'bad' } }), fallback)).toEqual({
      left: fallback.left,
      right: fallback.right,
    });
  });

  it('serializes panel state deterministically', () => {
    expect(serializePanelUi(fallback)).toBe(JSON.stringify(fallback));
  });
});
