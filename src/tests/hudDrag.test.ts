import { describe, expect, it } from 'vitest';
import { canStartHudDrag, computeHudDragOffset } from '../components/ui/hudDrag';

describe('hud drag helpers', () => {
  it('starts drag only in edit mode with left mouse button', () => {
    expect(canStartHudDrag(true, 0)).toBe(true);
    expect(canStartHudDrag(false, 0)).toBe(false);
    expect(canStartHudDrag(true, 1)).toBe(false);
    expect(canStartHudDrag(true, 2)).toBe(false);
  });

  it('computes drag offset from origin and pointer delta', () => {
    const result = computeHudDragOffset(120, -40, 400, 300, 455, 260);
    expect(result).toEqual({ offsetX: 175, offsetY: -80 });
  });
});
