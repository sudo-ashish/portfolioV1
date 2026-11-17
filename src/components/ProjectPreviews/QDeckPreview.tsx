import React from 'react';
import { Volume2, Battery, Wifi, Clock, FileCode, Layers, Sun } from 'lucide-react';

export const QDeckPreview: React.FC = () => {
    return (
        <div className="relative h-[210px] w-full overflow-hidden rounded-xl bg-[#09090d] border border-white/[0.08] p-3 sm:p-4 flex flex-col justify-between font-mono select-none">
            {/* Background Desktop Wallpaper Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent pointer-events-none" />

            {/* 1. Wayland Top Status Bar */}
            <div className="relative z-10 w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-[11px]">
                {/* Workspaces */}
                <div className="flex items-center gap-1.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded bg-emerald-500/25 border border-emerald-400/50 text-emerald-400 font-bold shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                        1
                    </span>
                    <span className="flex items-center justify-center w-5 h-5 rounded bg-white/5 text-white/40 hover:text-white/70 transition-colors">
                        2
                    </span>
                    <span className="flex items-center justify-center w-5 h-5 rounded bg-white/5 text-white/40 hover:text-white/70 transition-colors">
                        3
                    </span>
                    <span className="flex items-center justify-center w-5 h-5 rounded bg-white/5 text-white/40 hover:text-white/70 transition-colors">
                        4
                    </span>
                </div>

                {/* Active Window Title */}
                <div className="hidden sm:flex items-center gap-2 text-white/70 text-xs truncate max-w-[200px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="truncate">kitty : ~/qdeck/osd.qml</span>
                </div>

                {/* System Tray Indicators */}
                <div className="flex items-center gap-3 text-white/70 text-[11px]">
                    <span className="flex items-center gap-1 text-white/60">
                        <Wifi size={12} className="text-cyan-400" />
                        <span className="hidden xs:inline">ArchNet</span>
                    </span>
                    <span className="flex items-center gap-1 text-white/60">
                        <Battery size={13} className="text-emerald-400" />
                        <span>98%</span>
                    </span>
                    <span className="flex items-center gap-1 text-white/80">
                        <Clock size={12} className="text-white/40" />
                        <span>11:53</span>
                    </span>
                </div>
            </div>

            {/* 2. Floating Volume / Brightness OSD Pill (Center) */}
            <div className="relative z-10 self-center w-full max-w-sm px-4 py-2.5 rounded-full bg-black/75 border border-white/15 backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-emerald-400">
                        <Volume2 size={15} />
                        <Sun size={12} className="text-amber-400 hidden sm:inline" />
                    </div>

                    {/* Progress Bar Track */}
                    <div className="relative flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                            className="absolute top-0 left-0 bottom-0 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500 ease-out group-hover:w-[78%] w-[68%]"
                        />
                    </div>

                    <span className="text-xs font-semibold text-white/90 min-w-[32px] text-right">
                        <span className="group-hover:hidden">68%</span>
                        <span className="hidden group-hover:inline text-emerald-300">78%</span>
                    </span>
                </div>
            </div>

            {/* 3. Floating qshelf Drop Zone (Bottom) */}
            <div className="relative z-10 w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-dashed border-white/20 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-400/60 group-hover:bg-emerald-950/20 text-xs">
                <div className="flex items-center gap-2 text-white/70 group-hover:text-emerald-300 transition-colors">
                    <Layers size={13} className="text-emerald-400" />
                    <span className="font-medium text-[11px]">qshelf :: staging zone</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/60">
                        <FileCode size={10} /> bar.qml
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/60">
                        <FileCode size={10} /> config.json
                    </span>
                    <span className="text-[10px] text-emerald-400/90 font-medium group-hover:text-emerald-300 transition-colors">
                        [Ready to Drop]
                    </span>
                </div>
            </div>
        </div>
    );
};
