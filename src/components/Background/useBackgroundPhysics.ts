import { useCallback, useRef, useEffect } from 'react';

// Antigravity Configuration
const CONFIG = {
    gridSpacing: 35, // Tighter grid for smoother waves
    dotBaseSize: 1.0,
    dotMaxSize: 4.8,
    influenceRadius: 260, // Tighter control for "Spikes"
    stiffness: 0.15, // Snappier spring
    damping: 0.86,
    mass: 1.0,
    waveSpeed: 0.0015,
};

interface Point {
    x: number;
    y: number;
    baseY: number; // Original Y for wave calc
    baseX: number; // Original X for wave calc
    displacement: number;
    velocity: number;
    // Aurora Color HSL values
    hue: number;
}

export const useBackgroundPhysics = (canvasRef: React.RefObject<HTMLCanvasElement | null>, theme: 'dark' | 'gruvbox' = 'dark') => {
    const pointsRef = useRef<Point[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const dimensionsRef = useRef({ w: 0, h: 0 });
    const timeRef = useRef(0);


    const initPoints = useCallback((width: number, height: number) => {
        const points: Point[] = [];
        const cols = Math.ceil(width / CONFIG.gridSpacing);
        const rows = Math.ceil(height / CONFIG.gridSpacing);

        const offsetX = (width - ((cols - 1) * CONFIG.gridSpacing)) / 2;
        const offsetY = (height - ((rows - 1) * CONFIG.gridSpacing)) / 2;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = offsetX + i * CONFIG.gridSpacing;
                const y = offsetY + j * CONFIG.gridSpacing;

                // Base Hue Gradient (Left to Right: Blue -> Purple -> Cyan)
                // Map x to 180 (Cyan) - 280 (Purple)
                const hue = 190 + (x / width) * 100;

                points.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    displacement: 0,
                    velocity: 0,
                    hue
                });
            }
        }
        pointsRef.current = points;
    }, []);

    const updatePhysics = useCallback(() => {
        const points = pointsRef.current;
        const mouse = mouseRef.current;
        timeRef.current += CONFIG.waveSpeed;
        const t = timeRef.current;

        points.forEach(p => {
            // 1. Calculate Aurora Wave (Idle Motion)
            // Complex combo of sines for "organic" feel
            const wave =
                Math.sin(p.baseX * 0.003 + t) *
                Math.cos(p.baseY * 0.003 + t * 0.5) * 0.2; // Base ambient wave

            // 2. Mouse Interaction (Spike)
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distSq = dx * dx + dy * dy;

            let targetDisplacement = wave; // Default to wave

            if (distSq < CONFIG.influenceRadius * CONFIG.influenceRadius) {
                const dist = Math.sqrt(distSq);
                // Exponential Spike: (1 - dist)^3 produces a sharp peak
                const pct = 1 - (dist / CONFIG.influenceRadius);
                const spike = Math.pow(pct, 4) * 1.5; // Power 4 for very sharp spike

                targetDisplacement += spike;
            }

            // Spring Physics
            const force = (targetDisplacement - p.displacement) * CONFIG.stiffness;
            const accel = force / CONFIG.mass;

            p.velocity += accel;
            p.velocity *= CONFIG.damping;
            p.displacement += p.velocity;
        });
    }, []);

    const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Trail effect? No, keep it clean for now.
        ctx.clearRect(0, 0, width, height);

        const points = pointsRef.current;

        points.forEach(p => {
            // Cull invisible dots
            if (p.displacement < 0.05) return;

            // Map displacement to visuals
            // Input: -0.2 (trough) to 1.5 (peak)
            const normDisp = Math.max(0, p.displacement); // Clamp negative wave parts

            // Size: Bigger at peak
            const size = CONFIG.dotBaseSize + (normDisp * (CONFIG.dotMaxSize - CONFIG.dotBaseSize));

            // Color Logic
            if (theme === 'gruvbox') {
                // Gruvbox Mode: Ink on Paper
                const isSpike = normDisp > 0.4;
                const hue = isSpike ? 24 : 0; // Orange or Black
                const sat = isSpike ? 88 : 0;
                const light = isSpike ? 45 : 20;

                // Much subtler alpha for light theme
                // Base: 0.12 (faint texture) -> Peak: 0.6 (visible ink)
                const alpha = Math.min(0.8, 0.12 + normDisp * 0.5);

                ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
            } else {
                // "Aurora" Logic (Dark Theme)
                // Shift hue based on displacement (Spike = Hotter/Brighter)
                // Base: p.hue (Blue/Cyan)
                // Spike: Shift towards White/Magenta
                const activeHue = p.hue - (normDisp * 20);
                const lightness = 50 + (normDisp * 40); // 50% -> 90% (Brightness)
                const alpha = Math.min(1, normDisp * 0.8 + 0.1);

                ctx.fillStyle = `hsla(${activeHue}, 80%, ${lightness}%, ${alpha})`;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();

            // Core Glow (Only for spikes)
            if (normDisp > 0.6) {
                if (theme !== 'gruvbox') {
                    const activeHue = p.hue - (normDisp * 20); // Recalculate activeHue for glow
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = `hsla(${activeHue}, 90%, 70%, 0.8)`;
                    ctx.fillStyle = `rgba(255, 255, 255, ${normDisp * 0.8})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0; // Reset
                }
            }
        });

    }, [theme]);

    const animateRef = useRef<() => void>(() => {});

    const animate = useCallback(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Check for reduced motion
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reducedMotion) {
            updatePhysics();
        }
        draw(ctx, dimensionsRef.current.w, dimensionsRef.current.h);

        animationFrameRef.current = requestAnimationFrame(() => animateRef.current());
    }, [updatePhysics, draw, canvasRef]);

    useEffect(() => {
        animateRef.current = animate;
    }, [animate]);

    const handleResize = useCallback(() => {
        if (!canvasRef.current) return;

        const { innerWidth, innerHeight } = window;
        const dpr = window.devicePixelRatio || 1;

        canvasRef.current.width = innerWidth * dpr;
        canvasRef.current.height = innerHeight * dpr;
        canvasRef.current.style.width = `${innerWidth}px`;
        canvasRef.current.style.height = `${innerHeight}px`;

        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        dimensionsRef.current = { w: innerWidth, h: innerHeight };
        initPoints(innerWidth, innerHeight);
    }, [initPoints, canvasRef]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    }, []);

    const init = useCallback(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        handleResize();
        animate();
    }, [handleResize, handleMouseMove, animate]);

    const cleanup = useCallback(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    }, [handleResize, handleMouseMove]);

    return { init, cleanup };
};
