import React from "react";
import { Section } from "../UI/Section";
import { Mail, Github, ExternalLink, Terminal } from "lucide-react";
import { SpotlightCard } from "../UI/SpotlightCard";

export const Contact: React.FC = () => {
    return (
        <Section id="contact" className="w-full max-w-6xl mx-auto px-6 md:px-12 box-border min-w-0 min-h-[60vh] flex flex-col justify-between">
            <div className="max-w-3xl min-w-0">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/90">
                        Get In Touch
                    </span>
                </div>

                <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-6">
                    Let's Build <br />
                    <span className="text-white/40">Something.</span>
                </h2>

                <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-light">
                    Interested in Wayland desktop tooling, Linux system architecture, or custom UI engineering?
                    Let's collaborate on high-impact software.
                </p>

                {/* Contact Cards */}
                <div className="flex flex-wrap gap-4 items-center">
                    <a
                        href="mailto:contact@sudo-ashish.dev"
                        className="inline-flex"
                    >
                        <SpotlightCard
                            spotlightColor="rgba(52, 211, 153, 0.15)"
                            borderColor="rgba(52, 211, 153, 0.4)"
                            className="flex items-center gap-3 px-6 py-3.5 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        >
                            <Mail className="text-emerald-400" size={18} />
                            <span className="text-white font-mono text-sm">Email Me</span>
                        </SpotlightCard>
                    </a>

                    <a
                        href="https://github.com/sudo-ashish"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                    >
                        <SpotlightCard
                            spotlightColor="rgba(56, 189, 248, 0.15)"
                            borderColor="rgba(56, 189, 248, 0.4)"
                            className="flex items-center gap-3 px-6 py-3.5 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        >
                            <Github className="text-cyan-400" size={18} />
                            <span className="text-white font-mono text-sm">GitHub (sudo-ashish)</span>
                            <ExternalLink size={13} className="text-white/40" />
                        </SpotlightCard>
                    </a>

                    <a
                        href="https://github.com/sudo-ashish?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                    >
                        <SpotlightCard
                            spotlightColor="rgba(192, 132, 252, 0.15)"
                            borderColor="rgba(192, 132, 252, 0.4)"
                            className="flex items-center gap-3 px-6 py-3.5 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        >
                            <Terminal className="text-purple-400" size={18} />
                            <span className="text-white font-mono text-sm">All Repositories</span>
                            <ExternalLink size={13} className="text-white/40" />
                        </SpotlightCard>
                    </a>
                </div>
            </div>

            {/* Footer with ample padding to guarantee no overlap with the floating dock */}
            <footer className="mt-24 pt-8 pb-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 font-mono gap-4">
                <div>
                    © 2026 Ashish (<span className="text-emerald-400/80">sudo-ashish</span>). Built with React & Wayland sensibilities.
                </div>
                <div className="flex items-center gap-4 text-white/30 text-[11px]">
                    <span>Arch Linux</span>
                    <span>•</span>
                    <span>Hyprland</span>
                    <span>•</span>
                    <span>Quickshell</span>
                </div>
            </footer>
        </Section>
    );
};
