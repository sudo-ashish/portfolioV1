import React, { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, Terminal } from 'lucide-react';
import { ASCII_ART } from '../../data/asciiArt';

interface GithubStats {
    repos: number | string;
    stars: number | string;
    followers: number | string;
    following: number | string;
    loading: boolean;
}

const DEFAULT_STATS: GithubStats = {
    repos: 18,
    stars: 25,
    followers: 14,
    following: 12,
    loading: false,
};

const COLOR_PALETTE = [
    { name: 'Black', bg: 'bg-[#1e1e24]' },
    { name: 'Red', bg: 'bg-[#e06c75]' },
    { name: 'Green', bg: 'bg-[#2ee59d]' },
    { name: 'Yellow', bg: 'bg-[#e5c07b]' },
    { name: 'Blue', bg: 'bg-[#61afef]' },
    { name: 'Magenta', bg: 'bg-[#c678dd]' },
    { name: 'Cyan', bg: 'bg-[#56b6c2]' },
    { name: 'White', bg: 'bg-[#abb2bf]' },
];

const BRIGHT_COLOR_PALETTE = [
    { name: 'Bright Black', bg: 'bg-[#5c6370]' },
    { name: 'Bright Red', bg: 'bg-[#f07178]' },
    { name: 'Bright Green', bg: 'bg-[#5bf8b5]' },
    { name: 'Bright Yellow', bg: 'bg-[#ffd580]' },
    { name: 'Bright Blue', bg: 'bg-[#82aaff]' },
    { name: 'Bright Magenta', bg: 'bg-[#c792ea]' },
    { name: 'Bright Cyan', bg: 'bg-[#89ddff]' },
    { name: 'Bright White', bg: 'bg-[#ffffff]' },
];

interface DottedRowProps {
    label: string;
    children: React.ReactNode;
}

const DottedRow: React.FC<DottedRowProps> = ({ label, children }) => {
    return (
        <div className="flex items-baseline gap-2 py-0.5 hover:bg-white/[0.02] rounded px-1 -mx-1 transition-colors group">
            {/* Left Key + Dotted Leader Container with strict fixed width to guarantee perfect column alignment */}
            <div className="w-[185px] sm:w-[260px] shrink-0 flex items-baseline overflow-hidden select-none">
                <span className="font-bold text-[#2ee59d] shrink-0 font-mono">
                    {label}
                </span>
                <span
                    className="text-[rgba(46,229,157,0.25)] flex-1 overflow-hidden whitespace-nowrap select-none font-mono tracking-widest pl-1"
                    aria-hidden="true"
                >
                    ................................................................................
                </span>
            </div>

            {/* Right Value Container */}
            <div className="flex-1 min-w-0 break-words text-[#e4e4e7] font-mono leading-relaxed">
                {children}
            </div>
        </div>
    );
};

interface SectionDividerProps {
    title: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
    return (
        <div className="flex items-center gap-2 overflow-hidden pt-3 pb-1 select-none" aria-hidden="true">
            <span className="font-bold text-[#2ee59d] shrink-0 whitespace-nowrap text-xs sm:text-sm font-mono">
                - {title}
            </span>
            <span className="text-[rgba(46,229,157,0.25)] flex-1 overflow-hidden whitespace-nowrap font-mono tracking-wider">
                ------------------------------------------------------------------------------------------------------------------------
            </span>
        </div>
    );
};

export const FastfetchTerminal: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState<GithubStats>(DEFAULT_STATS);

    // Fetch live GitHub stats on mount
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchGithubStats = async () => {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch('https://api.github.com/users/sudo-ashish', {
                        signal: controller.signal,
                    }),
                    fetch('https://api.github.com/users/sudo-ashish/repos?per_page=100', {
                        signal: controller.signal,
                    }),
                ]);

                if (!userRes.ok) {
                    return;
                }

                const userData = await userRes.json();
                let totalStars = DEFAULT_STATS.stars;

                if (reposRes.ok) {
                    const reposData = await reposRes.json();
                    if (Array.isArray(reposData)) {
                        totalStars = reposData.reduce(
                            (acc: number, repo: { stargazers_count?: number }) =>
                                acc + (repo.stargazers_count || 0),
                            0
                        );
                    }
                }

                if (isMounted) {
                    setStats({
                        repos: userData.public_repos ?? DEFAULT_STATS.repos,
                        stars: totalStars,
                        followers: userData.followers ?? DEFAULT_STATS.followers,
                        following: userData.following ?? DEFAULT_STATS.following,
                        loading: false,
                    });
                }
            } catch {
                // Silently fallback so UI remains intact offline or on rate-limit
            }
        };

        fetchGithubStats();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const handleCopy = () => {
        const specsText = [
            'sudo-ashish@github',
            '------------------------',
            'OS: .................... Arch Linux / Debian (Wayland)',
            'WM / Shell: ............ Hyprland · Quickshell · Zsh',
            'Host: .................. Systems & Full-Stack Developer',
            'Kernel: ................ Unix Modularity & Config-Driven Workflow',
            'Terminal: .............. Kitty / Ghostty',
            'Editor: ................ Neovim (Lua), Antigravity',
            '',
            'Languages.Core: ........ Python, TypeScript, JavaScript, C++, Bash',
            'Languages.UI: .......... QML, HTML, CSS, Tailwind',
            'Stack.Systems: ......... systemd, Filesystem Hierarchy, CLI Piping',
            'Stack.Domain: .......... Wayland Compositors, Full-Stack APIs, ML',
            '',
            '- Approach & Mindset -----------------------------------',
            'Environment: ........... OS tuned as a transparent tool, not a black box',
            'Ownership: ............. Package management, config tuning, root-cause fixes',
            'Competencies: .......... System Config, Workflow Optimization, Automation',
            'Philosophy: ............ "Understand how tools connect; build stable systems from the ground up."',
            '',
            '- Contact ----------------------------------------------',
            'GitHub: ................ https://github.com/sudo-ashish',
            'Email: ................. contact@sudo-ashish.dev',
            'Location: .............. India',
            '',
            '- GitHub Stats -----------------------------------------',
            `Repos: ................. ${stats.repos} | Stars: ${stats.stars}`,
            `Followers: ............. ${stats.followers} | Following: ${stats.following}`,
        ].join('\n');

        navigator.clipboard.writeText(specsText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className="w-full rounded-xl p-5 sm:p-7 md:p-8 font-mono text-xs sm:text-sm md:text-[14px] leading-relaxed shadow-[0_16px_36px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(46,229,157,0.12)] relative overflow-hidden transition-all duration-300"
            style={{
                backgroundColor: '#060707',
                backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(46, 229, 157, 0.055), transparent 70%)',
                border: '1px solid rgba(46, 229, 157, 0.14)',
            }}
        >
            {/* Terminal Window Header / Chrome */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[rgba(46,229,157,0.14)] select-none">
                {/* Wayland / Window Traffic Lights */}
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 transition-transform duration-200 hover:scale-125" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 transition-transform duration-200 hover:scale-125" />
                    <span className="w-3 h-3 rounded-full bg-[#2ee59d]/90 transition-transform duration-200 hover:scale-125" />
                    <span className="ml-3 hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                        <Terminal size={13} className="text-[#2ee59d]" />
                        sudo-ashish : wayland-session [hyprland]
                    </span>
                </div>

                {/* Right-Side Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2ee59d]/[0.08] hover:bg-[#2ee59d]/[0.15] border border-[#2ee59d]/20 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
                        title="Copy fastfetch specs"
                        aria-label="Copy fastfetch specs"
                    >
                        {copied ? (
                            <>
                                <Check size={12} className="text-[#2ee59d]" />
                                <span className="text-[#2ee59d] font-semibold">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={12} className="text-zinc-400" />
                                <span>Copy Specs</span>
                            </>
                        )}
                    </button>
                    <span className="text-xs text-zinc-500 hidden md:inline font-mono">
                        UTF-8
                    </span>
                </div>
            </div>

            {/* Prompt Line */}
            <div className="flex items-center gap-2 mb-6 text-xs sm:text-sm text-zinc-300 select-none">
                <span className="text-[#2ee59d] font-bold">❯</span>
                <span className="text-zinc-200 font-medium">fastfetch --profile sudo-ashish</span>
                <span className="inline-block w-2 h-4 bg-[#2ee59d] animate-pulse ml-0.5" />
            </div>

            {/* Two-Column Fastfetch Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 xl:gap-12 items-start min-w-0">
                {/* Left Column: Monospace ASCII Art Logo */}
                <div className="flex justify-center lg:justify-start overflow-x-auto min-w-0 py-2 lg:sticky lg:top-6 select-none">
                    <pre className="text-[#2ee59d]/85 leading-tight select-none font-mono text-[10px] sm:text-xs md:text-[13px] tracking-tighter sm:tracking-normal drop-shadow-[0_0_16px_rgba(46,229,157,0.22)]">
                        {ASCII_ART}
                    </pre>
                </div>

                {/* Right Column: Fastfetch Specs Table */}
                <div className="space-y-1 min-w-0">
                    {/* Header: User & Host */}
                    <div className="mb-4 select-none">
                        <div className="text-base sm:text-lg font-bold tracking-wide text-[#2ee59d]">
                            sudo-ashish@github
                        </div>
                        <div className="text-[#2ee59d]/30 text-xs sm:text-sm font-mono overflow-hidden whitespace-nowrap">
                            ------------------------
                        </div>
                    </div>

                    {/* Block 1: System & Developer Environment */}
                    <DottedRow label="OS:">
                        Arch Linux / Debian (Wayland)
                    </DottedRow>
                    <DottedRow label="WM / Shell:">
                        Hyprland · Quickshell · Zsh
                    </DottedRow>
                    <DottedRow label="Host:">
                        Systems & Full-Stack Developer
                    </DottedRow>
                    <DottedRow label="Kernel:">
                        Unix Modularity & Config-Driven Workflow
                    </DottedRow>
                    <DottedRow label="Terminal:">
                        Kitty / Ghostty
                    </DottedRow>
                    <DottedRow label="Editor:">
                        Neovim (Lua), Antigravity
                    </DottedRow>

                    {/* Block 2: Languages & Technical Stack (Dot-Notation Keys) */}
                    <div className="pt-2">
                        <DottedRow label="Languages.Core:">
                            Python, TypeScript, JavaScript, C++, Bash
                        </DottedRow>
                        <DottedRow label="Languages.UI:">
                            QML, HTML, CSS, Tailwind
                        </DottedRow>
                        <DottedRow label="Stack.Systems:">
                            systemd, Filesystem Hierarchy, CLI Piping
                        </DottedRow>
                        <DottedRow label="Stack.Domain:">
                            Wayland Compositors, Full-Stack APIs, ML
                        </DottedRow>
                    </div>

                    {/* Section: Approach & Mindset */}
                    <SectionDivider title="Approach & Mindset" />
                    <DottedRow label="Environment:">
                        OS tuned as a transparent tool, not a black box
                    </DottedRow>
                    <DottedRow label="Ownership:">
                        Package management, config tuning, root-cause fixes
                    </DottedRow>
                    <DottedRow label="Competencies:">
                        System Config, Workflow Optimization, Automation
                    </DottedRow>
                    <DottedRow label="Philosophy:">
                        "Understand how tools connect; build stable systems from the ground up."
                    </DottedRow>

                    {/* Section: Contact */}
                    <SectionDivider title="Contact" />
                    <DottedRow label="GitHub:">
                        <a
                            href="https://github.com/sudo-ashish"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e4e4e7] hover:text-[#2ee59d] hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1.5"
                        >
                            <span>https://github.com/sudo-ashish</span>
                            <ExternalLink size={12} className="inline opacity-70" />
                        </a>
                    </DottedRow>
                    <DottedRow label="Email:">
                        <a
                            href="mailto:contact@sudo-ashish.dev"
                            className="text-[#e4e4e7] hover:text-[#2ee59d] hover:underline underline-offset-4 transition-colors"
                        >
                            contact@sudo-ashish.dev
                        </a>
                    </DottedRow>
                    <DottedRow label="Location:">
                        India
                    </DottedRow>

                    {/* Section: GitHub Stats */}
                    <SectionDivider title="GitHub Stats" />
                    <DottedRow label="Repos:">
                        <span>{stats.repos}</span>
                        <span className="text-[#2ee59d]/40 mx-2">|</span>
                        <span className="text-[#2ee59d] font-semibold">Stars:</span>
                        <span className="ml-1.5">{stats.stars}</span>
                    </DottedRow>
                    <DottedRow label="Followers:">
                        <span>{stats.followers}</span>
                        <span className="text-[#2ee59d]/40 mx-2">|</span>
                        <span className="text-[#2ee59d] font-semibold">Following:</span>
                        <span className="ml-1.5">{stats.following}</span>
                    </DottedRow>

                    {/* Classic 8-Block Terminal ANSI Palette */}
                    <div className="pt-5 border-t border-[rgba(46,229,157,0.12)] mt-5">
                        <div className="text-[11px] text-zinc-500 mb-2 select-none uppercase tracking-wider font-mono">
                            Terminal Palette
                        </div>
                        <div className="space-y-1.5">
                            {/* Standard ANSI Palette */}
                            <div className="flex flex-wrap gap-2">
                                {COLOR_PALETTE.map((color) => (
                                    <div
                                        key={color.name}
                                        className={`w-5 h-3 rounded-sm ${color.bg} shadow-sm transition-transform hover:scale-125 cursor-help`}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                            {/* Bright ANSI Palette */}
                            <div className="flex flex-wrap gap-2">
                                {BRIGHT_COLOR_PALETTE.map((color) => (
                                    <div
                                        key={color.name}
                                        className={`w-5 h-3 rounded-sm ${color.bg} shadow-sm transition-transform hover:scale-125 cursor-help`}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
