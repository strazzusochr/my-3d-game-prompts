type PanelUiEntry = {
  minimized: boolean;
  zoomLevel: number;
  offsetX: number;
  offsetY: number;
};

type PanelUiShape = Record<string, PanelUiEntry>;

export const HUD_PANEL_LAYOUT_STORAGE_KEY = 'hud-panel-layout-v1';
export const HUD_SCALE_STORAGE_KEY = 'hud-scale';

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const sanitizePanelEntry = (value: unknown, fallback: PanelUiEntry): PanelUiEntry => {
  if (!value || typeof value !== 'object') return { ...fallback };

  const panel = value as Partial<PanelUiEntry>;
  return {
    minimized: typeof panel.minimized === 'boolean' ? panel.minimized : fallback.minimized,
    zoomLevel: isFiniteNumber(panel.zoomLevel) ? Math.max(-3, Math.min(3, panel.zoomLevel)) : fallback.zoomLevel,
    offsetX: isFiniteNumber(panel.offsetX) ? panel.offsetX : fallback.offsetX,
    offsetY: isFiniteNumber(panel.offsetY) ? panel.offsetY : fallback.offsetY,
  };
};

export const loadPersistedPanelUi = <T extends PanelUiShape>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const next = {} as Record<keyof T, PanelUiEntry>;

    for (const key of Object.keys(fallback) as Array<keyof T>) {
      next[key] = sanitizePanelEntry(parsed[key as string], fallback[key]);
    }

    return next as T;
  } catch {
    return fallback;
  }
};

export const serializePanelUi = <T extends PanelUiShape>(state: T): string => JSON.stringify(state);

export const clearPersistedHudLayout = (storage: Pick<Storage, 'removeItem'>): void => {
  storage.removeItem(HUD_PANEL_LAYOUT_STORAGE_KEY);
  storage.removeItem(HUD_SCALE_STORAGE_KEY);
};
