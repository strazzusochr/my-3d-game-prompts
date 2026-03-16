import { readFileSync, writeFileSync } from 'fs';
const f = './src/components/ui/HUD.tsx';
let c = readFileSync(f, 'utf-8');
let ok = 0, miss = 0;

function rep(label, from, to) {
    if (c.includes(from)) { c = c.replace(from, to); ok++; console.log('OK', label); }
    else { miss++; console.error('MISS', label); }
}

// 1. Replace the two old functions with makeHandleDrag
rep('1:functions',
`    const isDragHandleTarget = (target: EventTarget | null) => {
        if (!(target instanceof HTMLElement)) return false;
        return Boolean(target.closest('[data-hud-drag-handle="true"]'));
    };

    const startPanelDrag = (panel: HudPanelKey, event: React.MouseEvent<HTMLDivElement>) => {
        if (!layoutEditMode || event.button !== 0) return;
        if (!isDragHandleTarget(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        const startX = event.clientX;
        const startY = event.clientY;
        const originX = panelUi[panel].offsetX;
        const originY = panelUi[panel].offsetY;

        const onMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            setPanelUi((prev) => ({
                ...prev,
                [panel]: { ...prev[panel], offsetX: originX + dx, offsetY: originY + dy },
            }));
        };

        const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    };`,
`    const makeHandleDrag = (panel: HudPanelKey) => (event: React.MouseEvent) => {
        if (!layoutEditMode || event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        const startX = event.clientX;
        const startY = event.clientY;
        const originX = panelUi[panel].offsetX;
        const originY = panelUi[panel].offsetY;
        const onMove = (e: MouseEvent) => {
            setPanelUi((prev) => ({
                ...prev,
                [panel]: { ...prev[panel], offsetX: originX + (e.clientX - startX), offsetY: originY + (e.clientY - startY) },
            }));
        };
        const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    };`
);

// 2. Add onMouseDown directly to drag handle button
rep('2:button-handler',
`                data-hud-drag-handle="true"
                style={{ ...squareControlStyle(layoutEditMode), minWidth: compact ? '28px' : '30px'`,
`                data-hud-drag-handle="true"
                onMouseDown={makeHandleDrag(panel)}
                style={{ ...squareControlStyle(layoutEditMode), minWidth: compact ? '28px' : '30px'`
);

// 3. Left panel: remove multi-line onMouseDown
rep('3:left',
`            <div
                onMouseDown={(event) => startPanelDrag('left', event)}
                style={{ pointerEvents: 'auto', position: 'absolute', top: '24px', left: '24px'`,
`            <div
                style={{ pointerEvents: 'auto', position: 'absolute', top: '24px', left: '24px'`
);

// 4. Top panel: remove multi-line onMouseDown
rep('4:top',
`            <div
                onMouseDown={(event) => startPanelDrag('top', event)}
                style={{ position: 'absolute', top: '24px', left: '50%'`,
`            <div
                style={{ position: 'absolute', top: '24px', left: '50%'`
);

// 5–11. Trailing-pattern panels (all use ` onMouseDown={...}>` at end of style block)
for (const p of ['right','nasa','telemetry','mission','timeline','interaction','bottom']) {
    const trail = ` onMouseDown={(event) => startPanelDrag('${p}', event)}>`;
    if (c.includes(trail)) { c = c.replaceAll(trail, '>'); ok++; console.log('OK trailing:', p); }
    else { miss++; console.error('MISS trailing:', p); }
}

writeFileSync(f, c, 'utf-8');
console.log(`\nDONE  ok=${ok}  miss=${miss}`);
if (miss > 0) process.exit(1);
