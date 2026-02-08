import { type HTMLMotionProps, motion } from "framer-motion";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({
    children,
    className,
    hoverEffect = false,
    ...props
}: GlassCardProps) => {
    return (
        <motion.div
            className={twMerge(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md",
                "shadow-lg ring-1 ring-white/5",
                hoverEffect && "transition-colors duration-300 hover:bg-white/10 hover:border-white/20",
                className
            )}
            {...props}
        >
            {/* Noise Texture Overlay for realism */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {children}
        </motion.div>
    );
};
