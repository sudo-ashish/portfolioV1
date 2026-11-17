import React from 'react';
import { Section } from "../UI/Section";
import { SpotlightCard } from "../UI/SpotlightCard";
import { QDeckPreview } from "../ProjectPreviews/QDeckPreview";
import { QuickShellPreview } from "../ProjectPreviews/QuickShellPreview";
import { WinHelpPreview } from "../ProjectPreviews/WinHelpPreview";
import { Github, ArrowUpRight, Star } from "lucide-react";

interface Project {
    id: string;
    title: string;
    category: string;
    repoUrl: string;
    description: string;
    tags: string[];
    isFeatured?: boolean;
    preview: React.ReactNode;
}

const PROJECTS: Project[] = [
    {
        id: "qdeck",
        title: "QDeck",
        category: "Wayland Desktop Shell",
        repoUrl: "https://github.com/sudo-ashish/qdeck",
        description: "All-in-one custom desktop shell for Hyprland built with Quickshell and QML on Arch Linux. Features custom OSDs, a dynamic power menu, a drag-and-drop staging shelf (qshelf), and an integrated package manager UI.",
        tags: ["QML", "Quickshell", "Hyprland", "Arch Linux", "Shell"],
        isFeatured: true,
        preview: <QDeckPreview />,
    },
    {
        id: "quickshell",
        title: "Quickshell Configs & Modules",
        category: "System UI & Widgets",
        repoUrl: "https://github.com/sudo-ashish/quickshell",
        description: "Modular, event-driven desktop widgets, status bars, and system daemons crafted in QML for Wayland compositors with zero-bloat performance and reactive state management.",
        tags: ["QML", "Wayland", "C++ / Qt6", "Linux Desktop"],
        preview: <QuickShellPreview />,
    },
    {
        id: "winhelp",
        title: "WinHelp",
        category: "System Utility & Automation",
        repoUrl: "https://github.com/sudo-ashish/winhelp",
        description: "Streamlined system troubleshooting, configuration, and diagnostic automation utility designed to strip away OS friction and execute system-level fixes fast.",
        tags: ["System Automation", "CLI / Scripting", "Diagnostics"],
        preview: <WinHelpPreview />,
    },
];

export const Work: React.FC = () => {
    return (
        <Section id="work" className="w-full max-w-6xl mx-auto px-6 md:px-12 box-border min-w-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 min-w-0">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/90">
                            Production Repositories & Tooling
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                        Selected <span className="text-white/40">Work.</span>
                    </h2>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-3">
                    <span className="text-white/40 text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">
                        github.com/sudo-ashish
                    </span>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full min-w-0">
                {PROJECTS.map((project) => (
                    <SpotlightCard
                        key={project.id}
                        spotlightColor={project.isFeatured ? "rgba(52, 211, 153, 0.1)" : "rgba(56, 189, 248, 0.08)"}
                        borderColor={project.isFeatured ? "rgba(52, 211, 153, 0.35)" : "rgba(56, 189, 248, 0.25)"}
                        className={`p-6 flex flex-col justify-between ${
                            project.isFeatured ? "md:col-span-2" : "md:col-span-1"
                        }`}
                    >
                        {/* Top: 180px–220px Graphic Preview Header */}
                        <div className="w-full mb-6">
                            {project.preview}
                        </div>

                        {/* Middle: Details */}
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 font-mono">
                                            {project.category}
                                        </span>
                                        {project.isFeatured && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono">
                                                <Star size={11} className="fill-emerald-400" /> Featured
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-2xl md:text-3xl text-white font-medium mb-3 tracking-tight group-hover:text-emerald-300 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6 font-light">
                                    {project.description}
                                </p>
                            </div>

                            {/* Bottom: Tech Stack Pills & Direct GitHub Button */}
                            <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-white/70"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* GitHub View Source Button */}
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-400/40 text-xs font-mono text-white/90 hover:text-emerald-300 transition-all shrink-0 cursor-pointer shadow-sm group/btn"
                                >
                                    <Github size={14} className="text-white/60 group-hover/btn:text-emerald-400 transition-colors" />
                                    <span>View Source</span>
                                    <ArrowUpRight size={13} className="text-white/40 group-hover/btn:text-emerald-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </Section>
    );
};
