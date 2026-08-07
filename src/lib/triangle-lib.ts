import {engine, animate, utils, JSAnimation} from "animejs";
import colorParse from 'color-parse'

type Coordinate = {
    x: number;
    y: number;
}

type Triangle = {
    p0: Coordinate;
    p1: Coordinate;
    p2: Coordinate;
    p3: Coordinate;
    defaultColor: string;
}

const TRI_W = 60;
const TRI_H = 52;

const MAX_PARALLEL_ANIMATIONS = 50;

const dynamicColors = ['--color-primary', '--color-secondary', '--color-accent', '--color-brightest-triangle'];
const styles = getComputedStyle(document.documentElement);

let resizeTimer: NodeJS.Timeout;
let triangles: Triangle[] = [];
let animations: JSAnimation[] = [];

function getRandomShadeOfGreyOklch(): string {
    const num = randomInteger(0, 2435);
    return `oklch(${num / 10000} 0 0)`;
}

export function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function initializeTriangles(): void {
    const canvasEl = document.querySelector('#stage') as HTMLCanvasElement;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    canvasEl.style.width = window.innerWidth + 'px';
    canvasEl.style.height = window.innerHeight + 'px';
    canvasEl.getContext('2d')!.scale(1, 1);

    let yOffset = 0;
    let rowOrderType = randomInteger(0, 1);

    for (let i = rowOrderType; i < 30 + rowOrderType; i++) {
        if (i % 2 === 0) {
            createLineVariant1(ctx, yOffset);
        } else {
            createLineVariant2(ctx, yOffset);
        }

        yOffset += TRI_H;
    }

    startTriangleAnimation();

    const prevWidth = window.innerWidth;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            const width = window.innerWidth;
            if (prevWidth === width) {
                return; // only window width change is the reason for re-drawing the canvas and destroying previous animations
            }

            // clean all previous unfinished animations to avoid animated triangles misaligned to the grid
            animations.forEach((anim) => {
                anim.revert();
            });

            animations = [];
            triangles = [];
            initializeTriangles();
        }, 150);
    });
}

function createLineVariant1(ctx: CanvasRenderingContext2D, yOffset: number) {
    createTriangleDown(ctx, -TRI_W / 2, yOffset);
    let xOffset = TRI_W / 2;

    for (let i = 0; i < 30; i++) {
        createTriangleUp(ctx, xOffset - TRI_W / 2, yOffset);
        createTriangleDown(ctx, xOffset, yOffset);
        xOffset += TRI_W;
    }
}

function createLineVariant2(ctx: CanvasRenderingContext2D, yOffset: number) {
    createTriangleUp(ctx, -TRI_W / 2, yOffset);
    let xOffset = TRI_W / 2;

    for (let i = 0; i < 30; i++) {
        createTriangleDown(ctx, xOffset - TRI_W / 2, yOffset);
        createTriangleUp(ctx, xOffset, yOffset);
        xOffset += TRI_W;
    }
}

function createTriangleUp(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void {
    const triangle: Triangle = {
        p0: {x: xOffset, y: TRI_H + yOffset},
        p1: {x: xOffset + TRI_W, y: TRI_H + yOffset},
        p2: {x: xOffset + TRI_W / 2, y: yOffset},
        p3: {x: xOffset, y: TRI_H + yOffset},
        defaultColor: getRandomShadeOfGreyOklch()
    }

    drawTriangle(ctx, triangle);
    triangles.push(triangle);
}

function createTriangleDown(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number): void {
    const triangle: Triangle = {
        p0: {x: xOffset, y: yOffset},
        p1: {x: xOffset + TRI_W, y: yOffset},
        p2: {x: xOffset + TRI_W / 2, y: TRI_H + yOffset},
        p3: {x: xOffset, y: yOffset},
        defaultColor: getRandomShadeOfGreyOklch()
    }

    drawTriangle(ctx, triangle);
    triangles.push(triangle);
}

function drawTriangle(ctx: CanvasRenderingContext2D, triangle: Triangle) {
    ctx.beginPath();
    ctx.moveTo(triangle.p0.x, triangle.p0.y);
    ctx.lineTo(triangle.p1.x, triangle.p1.y);
    ctx.lineTo(triangle.p2.x, triangle.p2.y);
    ctx.lineTo(triangle.p3.x, triangle.p3.y);
    ctx.closePath();

    ctx.fillStyle = triangle.defaultColor;
    ctx.fill();
}

function animateRandomTriangle(ctx: CanvasRenderingContext2D): void {
    const trianglesCount = triangles.length;
    const randomTriangleIndex = randomInteger(0, trianglesCount - 1);
    const randomColorIndex = randomInteger(0, dynamicColors.length - 1);

    const defaultColor = colorParse(triangles[randomTriangleIndex]!.defaultColor);
    const targetColor = colorParse(styles.getPropertyValue(dynamicColors[randomColorIndex]!));

    if (targetColor.space !== "oklch" || defaultColor.space !== "oklch") {
        console.error("[triangle-lib]: all colors must be of oklch type");
    }

    if (targetColor.values.length !== 3 || defaultColor.values.length !== 3) {
        console.error("[triangle-lib]: all oklch colors must be absolute values");
    }

    let oklch = {
        lightness: defaultColor.values[0],
        chroma: defaultColor.values[1],
        hue: defaultColor.values[2],
    };

    animate(oklch, {
        lightness: targetColor.values[0] as number,
        chroma: targetColor.values[1] as number,
        hue: targetColor.values[2] as number,
        duration: 4000,
        ease: 'out(2)',
        modifier: utils.lerp(0, 1),
        onUpdate: () => {drawTriangle(ctx, {...triangles[randomTriangleIndex],
            defaultColor: `oklch(${oklch.lightness} ${oklch.chroma} ${oklch.hue})`} as Triangle);
        },
        onBegin: (self) => animations.push(self),
        onComplete: (self) => {
            self.reverse();
        },
    }).then(() => animateRandomTriangle(ctx));
}

function startTriangleAnimation() {
    const canvasEl = document.querySelector('#stage') as HTMLCanvasElement;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    for (let i = 0; i < MAX_PARALLEL_ANIMATIONS; i++) {
        animateRandomTriangle(ctx);
    }
}