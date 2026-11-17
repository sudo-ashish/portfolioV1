import React from 'react';
import { Section } from "../UI/Section";
import { SpotlightCard } from "../UI/SpotlightCard";
import { QDeckPreview } from "../ProjectPreviews/QDeckPreview";
import { QuickShellPreview } from "../ProjectPreviews/QuickShellPreview";
import { WinHelpPreview } from "../ProjectPreviews/WinHelpPreview";

interface Project {
    id: string;
    index: string;
    categoryTag: string;
    title: string;
    repoUrl: string;
    repoDisplay: string;
    description: string;
    isFeatured?: boolean;
    preview: React.ReactNode;
}

const PROJECTS: Project[] = [
    {
        id: "qdeck",
        index: "01",
        categoryTag: "WAYLAND SHELL — QML · QUICKSHELL · HYPRLAND",
        title: "QDeck",
        repoUrl: "https://github.com/sudo-ashish/qdeck",
        repoDisplay: "github.com/sudo-ashish/qdeck",
        description: "Custom desktop shell for Hyprland written in QML and Quickshell on Arch Linux. Combines a reactive status bar, custom OSD overlays, a drag-and-drop staging shelf, and an integrated package manager UI.",
        isFeatured: true,
        preview: <QDeckPreview />,
    },
    {
        id: "quickshell",
        index: "02",
        categoryTag: "SYSTEM UI & DAEMONS — QML · WAYLAND · C++ / QT6",
        title: "Quickshell Modules & Daemons",
        repoUrl: "https://github.com/sudo-ashish/quickshell",
        repoDisplay: "github.com/sudo-ashish/quickshell",
        description: "Modular Wayland widgets, status bars, and QML singletons built for low-overhead desktop customization.",
        preview: <QuickShellPreview />,
    },
    {
        id: "winhelp",
        index: "03",
        categoryTag: "SYSTEM AUTOMATION — BASH · CLI · DIAGNOSTICS",
        title: "WinHelp",
        repoUrl: "https://github.com/sudo-ashish/winhelp",
        repoDisplay: "github.com/sudo-ashish/winhelp",
        description: "CLI troubleshooting and system configuration utility for automating diagnostics and OS maintenance tasks.",
        preview: <WinHelpPreview />,
    },
];

export const Work: React.FC = () => {
    return (
        <Section id="work" className="w-full max-w-6xl mx-auto px-6 md:px-12 box-border min-w-0 py-24">
            {/* Asymmetric Editorial Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 mb-10 border-b border-white/[0.07] min-w-0">
                <div>
                    <span className="text-xs font-mono tracking-widest text-amber-400/90 font-medium uppercase">
                        01 // SELECTED WORK
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-zinc-100 tracking-tight mt-2">
                        Systems & Wayland Tooling.
                    </h2>
                </div>
                <span className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0 uppercase tracking-wider">
                    3 Repositories · Arch / Wayland
                </span>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full min-w-0">
                {PROJECTS.map((project) => (
                    <SpotlightCard
                        key={project.id}
                        className={`p-6 sm:p-7 flex flex-col justify-between ${
                            project.isFeatured ? "md:col-span-2" : "md:col-span-1"
                        }`}
                    >
                        {/* Clean Editorial Header (No pill badges) */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 mb-4 border-b border-white/[0.06]">
                            <div>
                                <div className="text-[11px] font-mono tracking-wider text-amber-400/90 font-medium">
                                    {project.index} / {project.categoryTag}
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-100 mt-1">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Crisp inline text link aligned to header */}
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-amber-300 transition-colors shrink-0 group/link"
                            >
                                <span>{project.repoDisplay}</span>
                                <span className="text-amber-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">↗</span>
                            </a>
                        </div>

                        {/* Concise, Direct Engineering Prose */}
                        <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mb-6">
                            {project.description}
                        </p>

                        {/* Live Interactive Preview Stage */}
                        <div className="w-full">
                            {project.preview}
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </Section>
    );
};
