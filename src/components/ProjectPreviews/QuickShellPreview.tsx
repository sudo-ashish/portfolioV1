import React, { useState } from 'react';
import { Cpu, HardDrive, Clock, Terminal } from 'lucide-react';

type ThemeId = 'obsidian' | 'gruvbox' | 'nord';

interface ThemeConfig {
    name: string;
    bg: string;
    accent: string;
    secondary: string;
    text: string;
    border: string;
}

const THEMES: Record<ThemeId, ThemeConfig> = {
    obsidian: {
        name: 'Obsidian',
        bg: '#111116',
        accent: '#e5a93b', // amber
        secondary: '#7dd3fc', // cyan
        text: '#f4f4f5',
        border: 'rgba(229, 169, 59, 0.3)',
    },
    gruvbox: {
        name: 'Gruvbox',
        bg: '#282828',
        accent: '#d79921', // gruvbox yellow
        secondary: '#fe8019', // gruvbox orange
        text: '#ebdbb2',
        border: 'rgba(215, 153, 33, 0.4)',
    },
    nord: {
        name: 'Nord',
        bg: '#2e3440',
        accent: '#88c0d0', // nord frost cyan
        secondary: '#81a1c1', // nord frost blue
        text: '#eceff4',
        border: 'rgba(136, 192, 208, 0.4)',
    },
};

export const QuickShellPreview: React.FC = () => {
    const [selectedTheme, setSelectedTheme] = useState<ThemeId>('obsidian');
    const current = THEMES[selectedTheme];

    return (
        <div className="relative w-full overflow-hidden rounded-lg bg-[#09090c] border border-white/[0.08] p-3.5 sm:p-5 font-mono select-none flex flex-col justify-between gap-3.5">
            {/* Header Hint & Theme Switcher */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.accent }} />
                    <span className="uppercase tracking-wider">QML Theme & Signal Inspector</span>
                </div>

                {/* 3 Clickable Theme Swatches */}
                <div className="flex items-center gap-1.5">
                    {(Object.keys(THEMES) as ThemeId[]).map((themeKey) => {
                        const theme = THEMES[themeKey];
                        const isActive = selectedTheme === themeKey;
                        return (
                            <button
                                key={themeKey}
                                onClick={() => setSelectedTheme(themeKey)}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                                    isActive
                                        ? 'border font-medium shadow-sm'
                                        : 'bg-white/[0.03] text-zinc-500 hover:text-zinc-300 border border-transparent'
                                }`}
                                style={{
                                    backgroundColor: isActive ? `${theme.accent}15` : undefined,
                                    borderColor: isActive ? theme.accent : undefined,
                                    color: isActive ? theme.accent : undefined,
                                }}
                                title={`Switch preview to ${theme.name} palette`}
                            >
                                {theme.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Split Preview: Left = Live Wayland Widget, Right = QML Code Snippet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                {/* 1. Live Wayland Widget Preview (Themeable) */}
                <div
                    className="p-3 rounded-md transition-colors duration-300 border flex flex-col justify-between gap-2.5 shadow-sm"
                    style={{
                        backgroundColor: current.bg,
                        borderColor: current.border,
                        color: current.text,
                    }}
                >
                    {/* Widget Bar Header */}
                    <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-white/[0.06]">
                        <div className="flex items-center gap-1.5 truncate">
                            <Terminal size={11} style={{ color: current.accent }} />
                            <span className="truncate text-[10px] opacity-80">kitty: qdeck/bar.qml</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] opacity-60">
                            <Clock size={10} />
                            <span>14:00</span>
                        </div>
                    </div>

                    {/* Hardware Telemetry Bars */}
                    <div className="space-y-1.5 text-[10px]">
                        <div>
                            <div className="flex justify-between mb-0.5 opacity-70">
                                <span className="flex items-center gap-1">
                                    <Cpu size={10} style={{ color: current.accent }} /> CPU
                                </span>
                                <span>14%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{ width: '14%', backgroundColor: current.accent }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-0.5 opacity-70">
                                <span className="flex items-center gap-1">
                                    <HardDrive size={10} style={{ color: current.secondary }} /> RAM
                                </span>
                                <span>3.8G / 16G</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{ width: '24%', backgroundColor: current.secondary }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Live QML Property Snippet */}
                <div className="p-2.5 rounded-md bg-[#070709] border border-white/[0.06] text-[10px] leading-relaxed overflow-x-auto text-zinc-400">
                    <div className="text-zinc-600 mb-1">// Declarative QML State</div>
                    <div>
                        <span className="text-amber-400/90">Singleton</span> {'{'}
                    </div>
                    <div className="pl-3">
                        <span className="text-cyan-400">property string</span> theme: <span className="text-zinc-200">"{selectedTheme}"</span>
                    </div>
                    <div className="pl-3">
                        <span className="text-cyan-400">property color</span> accent: <span className="text-zinc-200">"{current.accent}"</span>
                    </div>
                    <div className="pl-3">
                        <span className="text-cyan-400">property int</span> activeWorkspace: <span className="text-amber-300">1</span>
                    </div>
                    <div className="pl-3">
                        <span className="text-cyan-400">property bool</span> compositorReady: <span className="text-emerald-400">true</span>
                    </div>
                    <div>{'}'}</div>
                </div>
            </div>
        </div>
    );
};
