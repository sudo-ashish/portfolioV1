import { Section } from "../UI/Section";
import { FastfetchTerminal } from "../UI/FastfetchTerminal";

export const About = () => {
    return (
        <Section id="about" className="w-full max-w-6xl mx-auto px-6 md:px-12 box-border min-w-0 py-24">
            {/* Asymmetric Editorial Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 mb-10 border-b border-white/[0.07] min-w-0">
                <div>
                    <span className="text-xs font-mono tracking-widest text-[#2ee59d]/90 font-medium uppercase">
                        03 // ABOUT & ENVIRONMENT
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-zinc-100 tracking-tight mt-2">
                        About Me.
                    </h2>
                </div>
                <span className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0 uppercase tracking-wider">
                    Fastfetch · Arch Linux · Hyprland
                </span>
            </div>

            {/* Fastfetch Terminal Window */}
            <div className="w-full min-w-0">
                <FastfetchTerminal />
            </div>
        </Section>
    );
};
