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
    spotlightColor = 'rgba(255, 255, 255, 0.03)',
    borderColor = 'rgba(255, 255, 255, 0.18)',
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
            className={`group relative overflow-hidden rounded-xl border border-white/[0.07] border-t-white/[0.15] bg-[#0e0e11] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_16px_36px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 ${className}`}
            {...props}
        >
            {/* Subtle Surface Glint following mouse */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 45%)`,
                }}
            />

            {/* Glowing Border Spotlight */}
            <div
                className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 ease-out"
                style={{
                    opacity: isHovered ? 1 : 0,
                    border: `1px solid ${borderColor}`,
                    maskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black 30%, transparent)`,
                    WebkitMaskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black 30%, transparent)`,
                }}
            />

            {/* 2.5% opacity tactile noise texture overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Card Content */}
            <div className="relative z-10 w-full h-full min-w-0">
                {children}
            </div>
        </div>
    );
};
