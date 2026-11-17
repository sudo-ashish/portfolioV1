import { CanvasLayer } from './CanvasLayer';

export const BackgroundSystem = () => {
    return (
        <div
            className="fixed inset-0 w-full h-full -z-10 overflow-hidden transition-colors duration-700 bg-[#09090b]"
            aria-hidden="true"
        >
            <CanvasLayer />

            {/* Subtle 2.5% opacity SVG fractal-noise grain overlay for machined tactile texture */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    );
};
