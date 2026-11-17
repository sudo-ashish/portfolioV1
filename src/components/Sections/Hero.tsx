import { motion } from "framer-motion";
import { Section } from "../UI/Section";
import { ArrowDown, ExternalLink } from "lucide-react";

export const Hero = () => {
    const scrollToWork = () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Section id="hero" className="min-h-screen justify-center py-20">
            <div className="flex flex-col gap-6 max-w-4xl min-w-0">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Editorial Tagline */}
                    <div className="inline-flex items-center gap-2 pb-1 mb-8 border-b border-white/[0.1] text-xs font-mono text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-zinc-200 uppercase tracking-widest font-medium">sudo-ashish</span>
                        <span className="text-zinc-600">/</span>
                        <span className="text-zinc-400 uppercase tracking-wider">Arch Linux · Hyprland · QML</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-zinc-100 mb-6 leading-[1.05]">
                        Systems Developer <br />
                        <span className="text-zinc-500 font-normal">& Desktop Architect.</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="max-w-xl min-w-0"
                >
                    <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed mb-8">
                        Engineering modular desktop shells, reactive Wayland widgets, and Linux diagnostic utilities tuned for keyboard-driven workflows.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                        <button
                            onClick={scrollToWork}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#141419] hover:bg-[#1a1a21] border border-white/[0.1] border-t-white/[0.2] text-zinc-200 hover:text-white transition-all cursor-pointer shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] group"
                        >
                            <span className="text-amber-400 font-bold">01 //</span>
                            <span>View Projects</span>
                            <ArrowDown size={13} className="text-zinc-500 group-hover:translate-y-0.5 transition-transform" />
                        </button>

                        <a
                            href="https://github.com/sudo-ashish"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-transparent hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] text-zinc-400 hover:text-zinc-200 transition-all"
                        >
                            <span>github.com/sudo-ashish</span>
                            <ExternalLink size={12} className="text-zinc-500" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};
