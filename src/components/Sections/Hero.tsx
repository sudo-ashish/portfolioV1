import { motion } from "framer-motion";
import { Section } from "../UI/Section";
import { Terminal, ArrowDown } from "lucide-react";

export const Hero = () => {
    const scrollToWork = () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Section id="hero" className="min-h-screen justify-center">
            <div className="flex flex-col gap-6 max-w-4xl min-w-0">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Status badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6 font-mono text-xs text-white/70">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 font-medium">sudo-ashish</span>
                        <span className="text-white/30">•</span>
                        <span>Arch Linux & Wayland UI</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-light text-white/60 tracking-wider mb-2 font-mono">
                        ASHISH
                    </h2>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white mb-8">
                        Creative <br />
                        <span className="text-white/40">Developer.</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="max-w-xl min-w-0"
                >
                    <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed mb-8">
                        Crafting digital experiences that feel <span className="text-white font-medium">physical</span>.
                        Focusing on Wayland compositors, custom desktop shells, and software built with craftsmanship.
                    </p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={scrollToWork}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-400/50 text-white hover:text-emerald-300 font-mono text-xs transition-all cursor-pointer shadow-lg group"
                        >
                            <Terminal size={14} className="text-emerald-400" />
                            <span>View Projects</span>
                            <ArrowDown size={13} className="text-white/50 group-hover:translate-y-0.5 transition-transform" />
                        </button>

                        <a
                            href="https://github.com/sudo-ashish"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 text-white/70 hover:text-white font-mono text-xs transition-all"
                        >
                            <span>github.com/sudo-ashish</span>
                            <span className="text-emerald-400">↗</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};
