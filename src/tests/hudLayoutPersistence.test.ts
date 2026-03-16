import { describe, expect, it, vi } from 'vitest';
import {
  HUD_LAYOUT_EXPORT_VERSION,
  HUD_PANEL_LAYOUT_STORAGE_KEY,
  HUD_SCALE_STORAGE_KEY,
  clearPersistedHudLayout,
  loadImportedHudLayoutBundle,
  loadPersistedPanelUi,
  serializeHudLayoutBundle,
  serializePanelUi,
} from '../components/ui/hudLayoutPersistence';

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

  it('serializes a portable hud layout bundle including scale', () => {
    expect(serializeHudLayoutBundle(fallback, 2)).toBe(JSON.stringify({
      version: HUD_LAYOUT_EXPORT_VERSION,
      hudScale: 1.2,
      panelUi: fallback,
    }));
  });

  it('imports a hud layout bundle with safe fallback behavior', () => {
    const imported = loadImportedHudLayoutBundle(JSON.stringify({
      version: HUD_LAYOUT_EXPORT_VERSION,
      hudScale: 0.55,
      panelUi: {
        left: { minimized: true, zoomLevel: 2, offsetX: 12, offsetY: 18 },
        right: { minimized: false, zoomLevel: -8, offsetX: 5, offsetY: -3 },
      },
    }), fallback, 0.68);

    expect(imported).toEqual({
      hudScale: 0.55,
      panelUi: {
        left: { minimized: true, zoomLevel: 2, offsetX: 12, offsetY: 18 },
        right: { minimized: false, zoomLevel: -3, offsetX: 5, offsetY: -3 },
      },
    });

    expect(loadImportedHudLayoutBundle('bad-json', fallback, 0.68)).toEqual({
      hudScale: 0.68,
      panelUi: fallback,
    });
  });

  it('clears persisted layout and scale keys together', () => {
    const storage = { removeItem: vi.fn() };

    clearPersistedHudLayout(storage);

    expect(storage.removeItem).toHaveBeenNthCalledWith(1, HUD_PANEL_LAYOUT_STORAGE_KEY);
    expect(storage.removeItem).toHaveBeenNthCalledWith(2, HUD_SCALE_STORAGE_KEY);
  });
});
