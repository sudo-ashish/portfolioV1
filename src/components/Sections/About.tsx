import { Section } from "../UI/Section";
import { FastfetchTerminal } from "../UI/FastfetchTerminal";
import { Terminal, Cpu, Layers } from "lucide-react";

export const About = () => {
    return (
        <Section id="about" className="w-full max-w-6xl mx-auto px-6 md:px-12 box-border min-w-0">
            {/* Section Header */}
            <div className="w-full mb-12 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/90">
                        System Architecture & Environment
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                    System <span className="text-white/40">Architecture.</span>
                </h2>
                <p className="mt-4 text-lg text-white/70 font-light max-w-2xl leading-relaxed">
                    A terminal-first, keyboard-driven environment governed by the Unix philosophy.
                    Every component is tuned for zero-friction workflows, reactive desktop widgets, and modular system ownership.
                </p>
            </div>

            {/* Fastfetch Terminal Window */}
            <div className="w-full min-w-0 mb-12">
                <FastfetchTerminal />
            </div>

            {/* Architectural Highlights / Foundations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full min-w-0">
                <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3 text-emerald-400">
                        <Terminal size={18} />
                        <h3 className="text-white font-medium text-sm font-mono uppercase tracking-wider">
                            Wayland Compositor
                        </h3>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-mono">
                        Configured Hyprland with hardware-accelerated animations, dynamic workspace rules, and native IPC event broadcasting.
                    </p>
                </div>

                <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3 text-cyan-400">
                        <Layers size={18} />
                        <h3 className="text-white font-medium text-sm font-mono uppercase tracking-wider">
                            Declarative UI (QML)
                        </h3>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-mono">
                        Building bespoke desktop shells, system monitors, and OSDs using Quickshell and Qt6/QML for instantaneous reactivity.
                    </p>
                </div>

                <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3 text-purple-400">
                        <Cpu size={18} />
                        <h3 className="text-white font-medium text-sm font-mono uppercase tracking-wider">
                            Automation & Scripting
                        </h3>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-mono">
                        Bridging system utilities and machine learning workflows with modular Python engines, Neovim (Lua), and Bash daemons.
                    </p>
                </div>
            </div>
        </Section>
    );
};
