import { useEffect, useRef } from 'react';
import { useBackgroundPhysics } from './useBackgroundPhysics';
import { useTheme } from '../../context/ThemeContext';

export const CanvasLayer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const { init, cleanup } = useBackgroundPhysics(canvasRef, theme);

    useEffect(() => {
        if (canvasRef.current) {
            init();
        }

        return () => {
            cleanup();
        };
    }, [init, cleanup, theme]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full">
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            />
        </div>
    );
};
