import {animate, stagger} from "animejs";

const TRI_W = 60;
const TRI_H = 52;

const MAX_PARALLEL_ANIMATIONS = 40;

const dynamicColors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', 'var(--color-white)'];

function upTriangleSVG(cls: string, color: string): string {
    return `<svg class="tri ${cls}" viewBox="0 0 ${TRI_W} ${TRI_H}" xmlns="http://www.w3.org/2000/svg" style="fill: ${color}">
      <polygon points="0,${TRI_H} ${TRI_W/2},0 ${TRI_W},${TRI_H}" />
    </svg>`;
}

function downTriangleSVG(cls: string, color: string): string {
    return `<svg class="tri down ${cls}" viewBox="0 0 ${TRI_W} ${TRI_H}" xmlns="http://www.w3.org/2000/svg" style="fill: ${color}">
      <polygon points="0,0 ${TRI_W},0 ${TRI_W/2},${TRI_H}" />
    </svg>`;
}

function getRandomShadeOfGreyRgb(): string {
    const num = randomInteger(0, 32);
    return `rgb(${num},${num},${num})`;
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
            html += isUp
                ? upTriangleSVG(cls, getRandomShadeOfGreyRgb())
                : downTriangleSVG(cls, getRandomShadeOfGreyRgb());
        }
        html += `</div>`;
    }

    stage.innerHTML = html;
}

function animateRandomTriangle(triangles: NodeListOf<Element>): void {
    const trianglesCount = triangles.length;
    const randomTriangleIndex = randomInteger(0, trianglesCount - 1);
    const randomColorIndex = randomInteger(0, dynamicColors.length - 1);

    animate(triangles.item(randomTriangleIndex), {
        fill: dynamicColors[randomColorIndex]!,
        duration: 2000,
        delay: stagger(600),

        onComplete: (self) => {
            self.reverse();
        },
    }).then(() => animateRandomTriangle(triangles));
}

export function startTriangleAnimation(triangles: NodeListOf<Element>) {
    for (let i = 0; i < MAX_PARALLEL_ANIMATIONS; i++) {
        animateRandomTriangle(triangles);
    }
}

export function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}