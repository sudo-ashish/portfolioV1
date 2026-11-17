import React from "react";
import { Section } from "../UI/Section";
import { Mail, Github, ExternalLink, Terminal } from "lucide-react";
import { SpotlightCard } from "../UI/SpotlightCard";

export const Contact: React.FC = () => {
    return (
        <Section id="contact" className="w-full max-w-6xl mx-auto px-6 md:px-12 box-border min-w-0 py-24 flex flex-col justify-between">
            {/* Asymmetric Editorial Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 mb-10 border-b border-white/[0.07] min-w-0">
                <div>
                    <span className="text-xs font-mono tracking-widest text-amber-400/90 font-medium uppercase">
                        04 // CONTACT & COLLABORATION
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-zinc-100 tracking-tight mt-2">
                        Let's Build Something.
                    </h2>
                </div>
                <span className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0 uppercase tracking-wider">
                    Open for collaboration
                </span>
            </div>

            <div className="max-w-2xl min-w-0 mb-12">
                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-light">
                    Interested in Wayland desktop tooling, Linux system architecture, or custom UI engineering?
                    Let's collaborate on high-impact software.
                </p>
            </div>

            {/* Machined Contact Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full min-w-0">
                <a
                    href="mailto:contact@sudo-ashish.dev"
                    className="group/link block"
                >
                    <SpotlightCard className="p-5 flex flex-col justify-between h-full hover:border-amber-400/40 transition-colors">
                        <div className="flex items-center justify-between text-zinc-400 group-hover/link:text-amber-400 transition-colors mb-3">
                            <Mail size={18} />
                            <ExternalLink size={13} className="opacity-60 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </div>
                        <div>
                            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Direct Email</div>
                            <div className="text-sm font-mono text-zinc-200 mt-0.5 group-hover/link:text-amber-300 transition-colors">
                                contact@sudo-ashish.dev
                            </div>
                        </div>
                    </SpotlightCard>
                </a>

                <a
                    href="https://github.com/sudo-ashish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link block"
                >
                    <SpotlightCard className="p-5 flex flex-col justify-between h-full hover:border-amber-400/40 transition-colors">
                        <div className="flex items-center justify-between text-zinc-400 group-hover/link:text-cyan-400 transition-colors mb-3">
                            <Github size={18} />
                            <ExternalLink size={13} className="opacity-60 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </div>
                        <div>
                            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">GitHub Profile</div>
                            <div className="text-sm font-mono text-zinc-200 mt-0.5 group-hover/link:text-cyan-300 transition-colors">
                                github.com/sudo-ashish
                            </div>
                        </div>
                    </SpotlightCard>
                </a>

                <a
                    href="https://github.com/sudo-ashish?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link block"
                >
                    <SpotlightCard className="p-5 flex flex-col justify-between h-full hover:border-amber-400/40 transition-colors">
                        <div className="flex items-center justify-between text-zinc-400 group-hover/link:text-zinc-200 transition-colors mb-3">
                            <Terminal size={18} />
                            <ExternalLink size={13} className="opacity-60 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </div>
                        <div>
                            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Repositories</div>
                            <div className="text-sm font-mono text-zinc-200 mt-0.5 group-hover/link:text-zinc-100 transition-colors">
                                View all code ↗
                            </div>
                        </div>
                    </SpotlightCard>
                </a>
            </div>

            {/* Footer with ample padding to guarantee no overlap with the floating dock */}
            <footer className="mt-24 pt-8 pb-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
                <div>
                    © 2026 Ashish (<span className="text-amber-400/90 font-medium">sudo-ashish</span>). Tuned for Wayland compositors.
                </div>
                <div className="flex items-center gap-3 text-zinc-600 text-[11px]">
                    <span>Arch Linux</span>
                    <span>·</span>
                    <span>Hyprland</span>
                    <span>·</span>
                    <span>Quickshell</span>
                </div>
            </footer>
        </Section>
    );
};
