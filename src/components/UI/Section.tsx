import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
}

export const Section = ({ children, id, className }: SectionProps) => {
    return (
        <section
            id={id}
            className={twMerge(
                "relative w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 box-border min-w-0",
                "flex flex-col justify-center",
                className
            )}
        >
            {children}
        </section>
    );
};
