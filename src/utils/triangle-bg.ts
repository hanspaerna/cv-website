const TRI_W = 60;
const TRI_H = 52;

function upTriangleSVG(cls: string): string {
    return `<svg class="tri ${cls}" viewBox="0 0 ${TRI_W} ${TRI_H}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,${TRI_H} ${TRI_W/2},0 ${TRI_W},${TRI_H}" />
    </svg>`;
}

function downTriangleSVG(cls: string): string {
    return `<svg class="tri down ${cls}" viewBox="0 0 ${TRI_W} ${TRI_H}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,0 ${TRI_W},0 ${TRI_W/2},${TRI_H}" />
    </svg>`;
}

export function buildTriangleBackground(stage: HTMLElement): void {
    const rect = stage.getBoundingClientRect();
    const cols = Math.ceil((2 * rect.width) / TRI_W) + 2;
    const rows = Math.ceil(rect.height / TRI_H) + 1;
    let html = '';

    for (let r = 0; r < rows; r++) {
        const offsetClass = r % 2 === 1 ? 'offset' : '';
        html += `<div class="tri-row ${offsetClass}" data-row="${r}">`;

        for (let c = 0; c < cols; c++) {
            const isUp = c % 2 === 0;
            const cls = `r${r}-c${c}`;
            html += isUp ? upTriangleSVG(cls) : downTriangleSVG(cls);
        }
        html += `</div>`;
    }

    stage.innerHTML = html;
}