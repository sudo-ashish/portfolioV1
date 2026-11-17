import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Terminal } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { ASCII_ART } from '../../data/asciiArt';

interface SpecItem {
    label: string;
    value: string;
    isLink?: boolean;
    href?: string;
    highlight?: string;
}

const SYSTEM_SPECS: SpecItem[] = [
    { label: 'OS', value: 'Arch Linux x86_64', highlight: 'text-cyan-400' },
    { label: 'Kernel', value: 'Linux (Tuned / Modular Workflow)' },
    { label: 'WM', value: 'Hyprland (Wayland)', highlight: 'text-amber-400' },
    { label: 'Shell', value: 'Quickshell (QML) / Zsh' },
    { label: 'DE / Suite', value: 'QDeck (Custom Desktop Shell)', highlight: 'text-zinc-200' },
    { label: 'Terminal', value: 'Kitty / Ghostty' },
    { label: 'Editor', value: 'Neovim (Lua)', highlight: 'text-amber-300' },
    { label: 'Languages', value: 'QML, Python, TypeScript, C++, Bash', highlight: 'text-cyan-300' },
    { label: 'Focus', value: 'System Architecture, Wayland UI, ML & Automation' },
    {
        label: 'GitHub',
        value: 'https://github.com/sudo-ashish',
        isLink: true,
        href: 'https://github.com/sudo-ashish',
        highlight: 'text-amber-400 hover:text-amber-300 underline underline-offset-4',
    },
];

const COLOR_PALETTE = [
    { name: 'Black', bg: 'bg-[#282c34]' },
    { name: 'Red', bg: 'bg-[#e06c75]' },
    { name: 'Green', bg: 'bg-[#98c379]' },
    { name: 'Yellow', bg: 'bg-[#e5c07b]' },
    { name: 'Blue', bg: 'bg-[#61afef]' },
    { name: 'Magenta', bg: 'bg-[#c678dd]' },
    { name: 'Cyan', bg: 'bg-[#56b6c2]' },
    { name: 'White', bg: 'bg-[#abb2bf]' },
];

const BRIGHT_COLOR_PALETTE = [
    { name: 'Bright Black', bg: 'bg-[#5c6370]' },
    { name: 'Bright Red', bg: 'bg-[#f07178]' },
    { name: 'Bright Green', bg: 'bg-[#b4d896]' },
    { name: 'Bright Yellow', bg: 'bg-[#ffd580]' },
    { name: 'Bright Blue', bg: 'bg-[#82aaff]' },
    { name: 'Bright Magenta', bg: 'bg-[#c792ea]' },
    { name: 'Bright Cyan', bg: 'bg-[#89ddff]' },
    { name: 'Bright White', bg: 'bg-[#ffffff]' },
];

export const FastfetchTerminal: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const specsText = `sudo-ashish@archlinux\n---------------------\n` +
            SYSTEM_SPECS.map(s => `${s.label}: ${s.value}`).join('\n');
        navigator.clipboard.writeText(specsText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <SpotlightCard
            spotlightColor="rgba(229, 169, 59, 0.04)"
            borderColor="rgba(229, 169, 59, 0.25)"
            className="w-full bg-[#0e0e11] border border-white/[0.07] border-t-white/[0.15] rounded-xl p-5 sm:p-7 md:p-8 font-mono text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_16px_36px_-12px_rgba(0,0,0,0.6)]"
        >
            {/* Terminal Window Chrome / Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.07]">
                {/* Wayland / Hyprland Window Buttons */}
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 transition-transform duration-200 hover:scale-125" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 transition-transform duration-200 hover:scale-125" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 transition-transform duration-200 hover:scale-125" />
                    <span className="ml-3 hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                        <Terminal size={13} className="text-amber-400/80" />
                        archlinux : wayland-session [hyprland]
                    </span>
                </div>

                {/* Right side terminal actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
                        title="Copy fastfetch specs"
                        aria-label="Copy fastfetch specs"
                    >
                        {copied ? (
                            <>
                                <Check size={12} className="text-amber-400" />
                                <span className="text-amber-400">Copied!</span>
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
            <div className="flex items-center gap-2 mb-6 text-sm text-zinc-300">
                <span className="text-amber-400 font-bold select-none">❯</span>
                <span className="text-zinc-100 font-medium">fastfetch --logo arch</span>
                <span className="inline-block w-2 h-4 bg-amber-400 animate-pulse ml-0.5" />
            </div>

            {/* Two-Column Fastfetch Layout */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center min-w-0">
                {/* Left Column: Glowing Arch ASCII Logo */}
                <div className="flex justify-center md:justify-start overflow-x-auto min-w-0 py-2">
                    <pre className="text-cyan-400/90 leading-tight select-none font-mono text-[11px] sm:text-xs md:text-sm tracking-tighter sm:tracking-normal drop-shadow-[0_0_14px_rgba(125,211,252,0.25)]">
                        {ASCII_ART}
                    </pre>
                </div>

                {/* Right Column: System & Developer Specs */}
                <div className="space-y-2 min-w-0">
                    {/* Header: User & Host */}
                    <div>
                        <div className="text-base sm:text-lg font-semibold tracking-wide text-amber-400">
                            sudo-ashish<span className="text-zinc-500">@</span>archlinux
                        </div>
                        <div className="text-zinc-700 select-none text-xs sm:text-sm font-mono overflow-hidden">
                            -----------------------------------------
                        </div>
                    </div>

                    {/* Specs Table */}
                    <div className="space-y-1.5 text-xs sm:text-sm">
                        {SYSTEM_SPECS.map((spec) => (
                            <div
                                key={spec.label}
                                className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2 items-baseline py-0.5 hover:bg-white/[0.03] rounded px-1 transition-colors group/row"
                            >
                                <span className="text-zinc-400 font-medium select-none flex items-center justify-between pr-2 font-mono">
                                    <span>{spec.label}</span>
                                    <span className="text-zinc-600">:</span>
                                </span>

                                <span className="min-w-0 break-words text-zinc-200">
                                    {spec.isLink && spec.href ? (
                                        <a
                                            href={spec.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-1.5 ${spec.highlight || 'text-amber-400'}`}
                                        >
                                            <span>{spec.value}</span>
                                            <ExternalLink size={12} className="inline opacity-80" />
                                        </a>
                                    ) : (
                                        <span className={spec.highlight || 'text-zinc-200'}>
                                            {spec.value}
                                        </span>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Classic 8-Block Color Palettes */}
                    <div className="pt-4 border-t border-white/[0.07]">
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
        </SpotlightCard>
    );
};
