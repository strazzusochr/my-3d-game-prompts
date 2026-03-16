export const canStartHudDrag = (layoutEditMode: boolean, mouseButton: number): boolean => layoutEditMode && mouseButton === 0;

export const computeHudDragOffset = (
  originX: number,
  originY: number,
  startX: number,
  startY: number,
  currentX: number,
  currentY: number,
): { offsetX: number; offsetY: number } => ({
  offsetX: originX + (currentX - startX),
  offsetY: originY + (currentY - startY),
});
