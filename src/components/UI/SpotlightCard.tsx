import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    borderColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = '',
    spotlightColor = 'rgba(52, 211, 153, 0.08)',
    borderColor = 'rgba(52, 211, 153, 0.35)',
    ...props
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/90 backdrop-blur-md transition-all duration-300 ${className}`}
            {...props}
        >
            {/* Radial Spotlight Surface Gradient */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />

            {/* Glowing Border Spotlight */}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ease-out"
                style={{
                    opacity: isHovered ? 1 : 0,
                    border: `1px solid ${borderColor}`,
                    maskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black 30%, transparent)`,
                    WebkitMaskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black 30%, transparent)`,
                }}
            />

            {/* Noise texture overlay for high realism */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Card Content */}
            <div className="relative z-10 w-full h-full min-w-0">
                {children}
            </div>
        </div>
    );
};
