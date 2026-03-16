type PanelUiEntry = {
  minimized: boolean;
  zoomLevel: number;
  offsetX: number;
  offsetY: number;
};

type PanelUiShape = Record<string, PanelUiEntry>;
type HudLayoutBundle<T extends PanelUiShape> = {
  version: 1;
  hudScale: number;
  panelUi: T;
};

export const HUD_PANEL_LAYOUT_STORAGE_KEY = 'hud-panel-layout-v1';
export const HUD_SCALE_STORAGE_KEY = 'hud-scale';
export const HUD_LAYOUT_EXPORT_VERSION = 1;

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const clampHudScale = (value: unknown, fallback: number): number => isFiniteNumber(value) ? Math.max(0.5, Math.min(1.2, value)) : fallback;

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

export const serializeHudLayoutBundle = <T extends PanelUiShape>(panelUi: T, hudScale: number): string => JSON.stringify({
  version: HUD_LAYOUT_EXPORT_VERSION,
  hudScale: clampHudScale(hudScale, 0.68),
  panelUi,
} satisfies HudLayoutBundle<T>);

export const loadImportedHudLayoutBundle = <T extends PanelUiShape>(
  raw: string | null,
  fallbackPanelUi: T,
  fallbackScale: number,
): { panelUi: T; hudScale: number } => {
  if (!raw) return { panelUi: fallbackPanelUi, hudScale: fallbackScale };

  try {
    const parsed = JSON.parse(raw) as Partial<HudLayoutBundle<T>>;
    const panelUi = loadPersistedPanelUi(JSON.stringify(parsed.panelUi ?? {}), fallbackPanelUi);
    const hudScale = clampHudScale(parsed.hudScale, fallbackScale);
    return { panelUi, hudScale };
  } catch {
    return { panelUi: fallbackPanelUi, hudScale: fallbackScale };
  }
};

export const clearPersistedHudLayout = (storage: Pick<Storage, 'removeItem'>): void => {
  storage.removeItem(HUD_PANEL_LAYOUT_STORAGE_KEY);
  storage.removeItem(HUD_SCALE_STORAGE_KEY);
};
