import React, { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, Terminal } from 'lucide-react';
import { ASCII_ART } from '../../data/asciiArt';
import { fastfetchConfig, type FastfetchItem } from '../../data/fastfetchData';

interface GithubStats {
    repos: number | string;
    stars: number | string;
    followers: number | string;
    following: number | string;
    loading: boolean;
}

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
        <div className="flex items-baseline gap-2 py-[1.5px] hover:bg-white/[0.02] rounded px-1 -mx-1 transition-colors group">
            {/* Left Key + Dotted Leader Container with strict fixed width to guarantee perfect column alignment */}
            <div className="w-[170px] sm:w-[230px] md:w-[240px] shrink-0 flex items-baseline overflow-hidden select-none">
                <span className="font-bold text-[#2ee59d] shrink-0 font-mono text-xs sm:text-[13px]">
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
            <div className="flex-1 min-w-0 break-words text-[#e4e4e7] font-mono text-xs sm:text-[13px] leading-snug">
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
        <div className="flex items-center gap-2 overflow-hidden pt-1.5 pb-0.5 select-none" aria-hidden="true">
            <span className="font-bold text-[#2ee59d] shrink-0 whitespace-nowrap text-xs sm:text-[13px] font-mono">
                - {title}
            </span>
            <span className="text-[rgba(46,229,157,0.25)] flex-1 overflow-hidden whitespace-nowrap font-mono tracking-wider text-xs">
                ------------------------------------------------------------------------------------------------------------------------
            </span>
        </div>
    );
};

export const FastfetchTerminal: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState<GithubStats>({
        repos: fastfetchConfig.githubStats.fallback.repos,
        stars: fastfetchConfig.githubStats.fallback.stars,
        followers: fastfetchConfig.githubStats.fallback.followers,
        following: fastfetchConfig.githubStats.fallback.following,
        loading: false,
    });

    // Fetch live GitHub stats on mount from username in fastfetchData
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const username = fastfetchConfig.githubStats.username;

        const fetchGithubStats = async () => {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`, {
                        signal: controller.signal,
                    }),
                    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
                        signal: controller.signal,
                    }),
                ]);

                if (!userRes.ok) return;

                const userData = await userRes.json();
                let totalStars = fastfetchConfig.githubStats.fallback.stars;

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
                        repos: userData.public_repos ?? fastfetchConfig.githubStats.fallback.repos,
                        stars: totalStars,
                        followers: userData.followers ?? fastfetchConfig.githubStats.fallback.followers,
                        following: userData.following ?? fastfetchConfig.githubStats.fallback.following,
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
            fastfetchConfig.userHost,
            '------------------------',
            ...fastfetchConfig.systemInfo.map((i: FastfetchItem) => `${i.key.padEnd(24, '.')} ${i.value}`),
            '',
            ...fastfetchConfig.techStack.map((i: FastfetchItem) => `${i.key.padEnd(24, '.')} ${i.value}`),
            '',
            `- ${fastfetchConfig.approach.title} --------------------------------`,
            ...fastfetchConfig.approach.items.map((i: FastfetchItem) => `${i.key.padEnd(24, '.')} ${i.value}`),
            '',
            `- ${fastfetchConfig.contact.title} ---------------------------------`,
            ...fastfetchConfig.contact.items.map((i: FastfetchItem) => `${i.key.padEnd(24, '.')} ${i.value}`),
            '',
            `- ${fastfetchConfig.githubStats.title} ------------------------------`,
            `${'Repos:'.padEnd(24, '.')} ${stats.repos} | Stars: ${stats.stars}`,
            `${'Followers:'.padEnd(24, '.')} ${stats.followers} | Following: ${stats.following}`,
        ].join('\n');

        navigator.clipboard.writeText(specsText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className="w-full rounded-xl p-3.5 sm:p-5 md:p-6 font-mono text-xs sm:text-[13px] leading-snug shadow-[0_16px_36px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(46,229,157,0.12)] relative overflow-hidden transition-all duration-300"
            style={{
                backgroundColor: '#060707',
                backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(46, 229, 157, 0.055), transparent 70%)',
                border: '1px solid rgba(46, 229, 157, 0.14)',
            }}
        >
            {/* Terminal Window Header / Chrome */}
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[rgba(46,229,157,0.14)] select-none">
                {/* Traffic Lights & Session info */}
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 transition-transform duration-200 hover:scale-125" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 transition-transform duration-200 hover:scale-125" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2ee59d]/90 transition-transform duration-200 hover:scale-125" />
                    <span className="ml-2.5 hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                        <Terminal size={12} className="text-[#2ee59d]" />
                        {fastfetchConfig.windowTitle}
                    </span>
                </div>

                {/* Right-Side Actions */}
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#2ee59d]/[0.08] hover:bg-[#2ee59d]/[0.15] border border-[#2ee59d]/20 text-[11px] text-zinc-300 hover:text-white transition-all cursor-pointer"
                        title="Copy fastfetch specs"
                        aria-label="Copy fastfetch specs"
                    >
                        {copied ? (
                            <>
                                <Check size={11} className="text-[#2ee59d]" />
                                <span className="text-[#2ee59d] font-semibold">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={11} className="text-zinc-400" />
                                <span>Copy Specs</span>
                            </>
                        )}
                    </button>
                    <span className="text-[11px] text-zinc-500 hidden md:inline font-mono">
                        UTF-8
                    </span>
                </div>
            </div>

            {/* Prompt Line */}
            <div className="flex items-center gap-2 mb-3 text-xs sm:text-[13px] text-zinc-300 select-none">
                <span className="text-[#2ee59d] font-bold">❯</span>
                <span className="text-zinc-200 font-medium">{fastfetchConfig.promptCommand}</span>
                <span className="inline-block w-1.5 h-3.5 bg-[#2ee59d] animate-pulse ml-0.5" />
            </div>

            {/* Two-Column Fastfetch Layout - Side-by-side on md and up */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 lg:gap-8 items-start min-w-0">
                {/* Left Column: Monospace ASCII Art Logo */}
                <div className="flex justify-center md:justify-start overflow-x-auto min-w-0 py-1 md:sticky md:top-4 select-none">
                    <pre className="text-[#2ee59d]/85 leading-[8.5px] sm:leading-[10px] md:leading-[11.5px] select-none font-mono text-[8px] sm:text-[9.5px] md:text-[11px] tracking-tighter sm:tracking-normal drop-shadow-[0_0_12px_rgba(46,229,157,0.2)]">
                        {ASCII_ART}
                    </pre>
                </div>

                {/* Right Column: Fastfetch Specs Table */}
                <div className="space-y-0.5 min-w-0">
                    {/* Header: User & Host */}
                    <div className="mb-2 select-none">
                        <div className="text-sm sm:text-base font-bold tracking-wide text-[#2ee59d]">
                            {fastfetchConfig.userHost}
                        </div>
                        <div className="text-[#2ee59d]/30 text-xs sm:text-[13px] font-mono overflow-hidden whitespace-nowrap">
                            ------------------------
                        </div>
                    </div>

                    {/* Block 1: System & Developer Environment */}
                    {fastfetchConfig.systemInfo.map((item) => (
                        <DottedRow key={item.key} label={item.key}>
                            {item.value}
                        </DottedRow>
                    ))}

                    {/* Block 2: Languages & Technical Stack */}
                    <div className="pt-1">
                        {fastfetchConfig.techStack.map((item) => (
                            <DottedRow key={item.key} label={item.key}>
                                {item.value}
                            </DottedRow>
                        ))}
                    </div>

                    {/* Section: Approach & Mindset */}
                    <SectionDivider title={fastfetchConfig.approach.title} />
                    {fastfetchConfig.approach.items.map((item) => (
                        <DottedRow key={item.key} label={item.key}>
                            {item.value}
                        </DottedRow>
                    ))}

                    {/* Section: Contact */}
                    <SectionDivider title={fastfetchConfig.contact.title} />
                    {fastfetchConfig.contact.items.map((item) => (
                        <DottedRow key={item.key} label={item.key}>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    target={item.isExternal ? '_blank' : undefined}
                                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                    className="text-[#e4e4e7] hover:text-[#2ee59d] hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1"
                                >
                                    <span>{item.value}</span>
                                    {item.isExternal && <ExternalLink size={11} className="inline opacity-70" />}
                                </a>
                            ) : (
                                item.value
                            )}
                        </DottedRow>
                    ))}

                    {/* Section: GitHub Stats */}
                    <SectionDivider title={fastfetchConfig.githubStats.title} />
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

                    {/* Compact Single-Line ANSI Palette */}
                    <div className="pt-2 mt-2 border-t border-[rgba(46,229,157,0.12)] flex items-center justify-between select-none">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            {COLOR_PALETTE.map((color) => (
                                <div
                                    key={color.name}
                                    className={`w-3.5 sm:w-4 h-2 rounded-[2px] ${color.bg} shadow-sm transition-transform hover:scale-125 cursor-help`}
                                    title={color.name}
                                />
                            ))}
                            <span className="w-1" />
                            {BRIGHT_COLOR_PALETTE.map((color) => (
                                <div
                                    key={color.name}
                                    className={`w-3.5 sm:w-4 h-2 rounded-[2px] ${color.bg} shadow-sm transition-transform hover:scale-125 cursor-help`}
                                    title={color.name}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
                            fastfetch v2.30
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
