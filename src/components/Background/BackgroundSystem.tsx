import { CanvasLayer } from './CanvasLayer';

export const BackgroundSystem = () => {

    return (
        <div
            className="fixed inset-0 w-full h-full -z-10 overflow-hidden transition-colors duration-700"
            style={{ backgroundColor: 'var(--bg-primary)' }}
            aria-hidden="true"
        >
            <CanvasLayer />

            {/* Optional: Noise overlay for texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    );
};
