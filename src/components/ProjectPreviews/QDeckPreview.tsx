import React, { useState, useRef } from 'react';
import { Volume2, Volume1, VolumeX, Battery, Wifi, Clock, FileCode, Layers, Sun } from 'lucide-react';

interface FileItem {
    id: string;
    name: string;
    staged: boolean;
}

const WORKSPACE_WINDOWS: Record<number, string> = {
    1: 'kitty — ~/qdeck',
    2: 'nvim — osd.qml',
    3: 'btop',
    4: 'zen-browser',
};

export const QDeckPreview: React.FC = () => {
    // 1. Live Workspace State
    const [activeWorkspace, setActiveWorkspace] = useState<number>(1);

    // 2. Interactive OSD State
    const [osdMode, setOsdMode] = useState<'volume' | 'brightness'>('volume');
    const [volume, setVolume] = useState<number>(68);
    const [brightness, setBrightness] = useState<number>(85);
    const sliderRef = useRef<HTMLDivElement>(null);

    // 3. Interactive qshelf Staging State
    const [files, setFiles] = useState<FileItem[]>([
        { id: '1', name: 'bar.qml', staged: true },
        { id: '2', name: 'config.json', staged: true },
        { id: '3', name: 'Theme.qml', staged: false },
    ]);

    // Handle OSD slider click/drag
    const handleSliderInteract = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = Math.round(Math.max(0, Math.min(100, (clickX / rect.width) * 100)));

        if (osdMode === 'volume') {
            setVolume(percentage);
        } else {
            setBrightness(percentage);
        }
    };

    // Toggle file staging
    const toggleFileStaging = (id: string) => {
        setFiles(prev =>
            prev.map(f => (f.id === id ? { ...f, staged: !f.staged } : f))
        );
    };

    const currentValue = osdMode === 'volume' ? volume : brightness;
    const stagedCount = files.filter(f => f.staged).length;

    // Get appropriate volume icon based on value
    const getVolumeIcon = () => {
        if (osdMode === 'brightness') {
            return <Sun size={14} className="text-amber-400 shrink-0" />;
        }
        if (volume === 0) {
            return <VolumeX size={14} className="text-zinc-500 shrink-0" />;
        }
        if (volume <= 50) {
            return <Volume1 size={14} className="text-cyan-400 shrink-0" />;
        }
        return <Volume2 size={14} className="text-cyan-400 shrink-0" />;
    };

    return (
        <div className="relative w-full overflow-hidden rounded-lg bg-[#09090c] border border-white/[0.08] p-3.5 sm:p-5 font-mono select-none flex flex-col justify-between gap-4">
            {/* Top Helper Hint */}
            <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
                    <span className="text-zinc-400 uppercase tracking-wider">Interactive Hyprland Stage</span>
                </div>
                <span className="text-zinc-600">Click workspaces · Slide OSD · Toggle staging</span>
            </div>

            {/* 1. Live Wayland Top Status Bar */}
            <div className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-[#121216] border border-white/[0.08] shadow-sm text-xs">
                {/* Workspaces Clickable Switcher */}
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((ws) => {
                        const isActive = activeWorkspace === ws;
                        return (
                            <button
                                key={ws}
                                onClick={() => setActiveWorkspace(ws)}
                                className={`flex items-center justify-center w-6 h-6 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                                    isActive
                                        ? 'bg-amber-400/20 border border-amber-400/60 text-amber-300 shadow-[0_0_10px_rgba(229,169,59,0.25)]'
                                        : 'bg-white/[0.03] border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
                                }`}
                                title={`Switch to Workspace ${ws}`}
                            >
                                {ws}
                            </button>
                        );
                    })}
                </div>

                {/* Live Active Window Title */}
                <div className="hidden sm:flex items-center gap-2 text-zinc-300 text-[11px] truncate max-w-[260px] px-2 py-0.5 rounded bg-black/40 border border-white/[0.05]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="truncate">{WORKSPACE_WINDOWS[activeWorkspace]}</span>
                </div>

                {/* System Tray Indicators */}
                <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                    <span className="flex items-center gap-1">
                        <Wifi size={12} className="text-cyan-400" />
                        <span className="hidden md:inline">wlan0</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <Battery size={13} className="text-amber-400" />
                        <span>98%</span>
                    </span>
                    <span className="flex items-center gap-1 text-zinc-300">
                        <Clock size={11} className="text-zinc-500" />
                        <span>14:00</span>
                    </span>
                </div>
            </div>

            {/* 2. Centered Interactive OSD Pill & Slider */}
            <div className="self-center w-full max-w-sm px-4 py-2.5 rounded-lg bg-[#141419] border border-white/[0.1] shadow-lg">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
                    <button
                        onClick={() => setOsdMode(m => (m === 'volume' ? 'brightness' : 'volume'))}
                        className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors cursor-pointer group/mode"
                        title="Click to toggle Volume / Brightness mode"
                    >
                        {getVolumeIcon()}
                        <span className="font-mono text-zinc-300 capitalize group-hover/mode:text-amber-300 transition-colors">
                            {osdMode}
                        </span>
                        <span className="text-[9px] text-zinc-600 font-sans">(switch)</span>
                    </button>
                    <span className="font-mono font-medium text-zinc-200 text-xs">
                        {currentValue}%
                    </span>
                </div>

                {/* Interactive Slider Track (Clickable & Draggable) */}
                <div
                    ref={sliderRef}
                    onClick={handleSliderInteract}
                    onMouseMove={(e) => {
                        if (e.buttons === 1) handleSliderInteract(e);
                    }}
                    className="relative w-full h-2 rounded-full bg-black/60 border border-white/[0.08] cursor-pointer overflow-hidden transition-all hover:h-2.5"
                    title="Click or drag to adjust level"
                >
                    <div
                        className={`h-full rounded-full transition-all duration-150 ease-out ${
                            osdMode === 'volume'
                                ? 'bg-gradient-to-r from-cyan-500 to-amber-400'
                                : 'bg-gradient-to-r from-amber-500 to-amber-300'
                        }`}
                        style={{ width: `${currentValue}%` }}
                    />
                </div>
            </div>

            {/* 3. Interactive qshelf Staging Dock (Bottom) */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3 py-2 rounded-md bg-[#121216] border border-white/[0.08] text-xs">
                <div className="flex items-center gap-2 text-zinc-400 shrink-0">
                    <Layers size={13} className="text-amber-400" />
                    <span className="text-[11px] text-zinc-300">qshelf</span>
                    <span className="text-[10px] text-zinc-500">
                        ({stagedCount}/{files.length} staged)
                    </span>
                </div>

                {/* Clickable File Chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                    {files.map((file) => (
                        <button
                            key={file.id}
                            onClick={() => toggleFileStaging(file.id)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                                file.staged
                                    ? 'bg-amber-400/15 border border-amber-400/50 text-amber-200 shadow-sm'
                                    : 'bg-white/[0.03] border border-dashed border-white/20 text-zinc-500 hover:text-zinc-300 hover:border-white/40'
                            }`}
                            title={`Click to ${file.staged ? 'unstage' : 'stage'} ${file.name}`}
                        >
                            <FileCode size={11} className={file.staged ? 'text-amber-400' : 'text-zinc-600'} />
                            <span>{file.name}</span>
                            <span className="text-[9px] opacity-70">
                                {file.staged ? '✓' : '+'}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
