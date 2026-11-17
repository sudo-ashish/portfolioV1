import React from 'react';
import { Terminal, Cpu, Layout, Radio } from 'lucide-react';

export const QuickShellPreview: React.FC = () => {
    return (
        <div className="relative h-[210px] w-full overflow-hidden rounded-xl bg-[#09090d] border border-white/[0.08] p-4 flex flex-col justify-between font-mono select-none">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

            {/* Top Bar: Event Stream Status */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-white/50 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Radio size={12} className="text-cyan-400 animate-pulse" />
                    <span className="text-cyan-400 font-medium">IPC STREAM</span>
                    <span className="text-white/30">|</span>
                    <span className="text-white/60">socket2.sock</span>
                </div>
                <div className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    REACTIVE BUS ACTIVE
                </div>
            </div>

            {/* Signal Flow Visual: Node 1 -> Node 2 -> Node 3 */}
            <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 items-center my-auto">
                {/* Node 1: Hyprland IPC */}
                <div className="flex flex-col items-center text-center p-2.5 rounded-lg bg-black/60 border border-cyan-500/30 shadow-lg group-hover:border-cyan-400/60 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-1.5 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                        <Terminal size={16} />
                    </div>
                    <span className="text-[11px] font-semibold text-white/90 leading-tight">
                        Hyprland IPC
                    </span>
                    <span className="text-[9px] text-cyan-400/80 mt-0.5">
                        event_dispatcher
                    </span>
                </div>

                {/* Node 2: Quickshell Singleton */}
                <div className="flex flex-col items-center text-center p-2.5 rounded-lg bg-black/60 border border-emerald-500/30 shadow-lg group-hover:border-emerald-400/60 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1.5 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                        <Cpu size={16} />
                    </div>
                    <span className="text-[11px] font-semibold text-white/90 leading-tight">
                        Quickshell
                    </span>
                    <span className="text-[9px] text-emerald-400/80 mt-0.5">
                        Singleton State
                    </span>
                </div>

                {/* Node 3: QML Widget Render */}
                <div className="flex flex-col items-center text-center p-2.5 rounded-lg bg-black/60 border border-purple-500/30 shadow-lg group-hover:border-purple-400/60 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 mb-1.5 shadow-[0_0_10px_rgba(192,132,252,0.2)]">
                        <Layout size={16} />
                    </div>
                    <span className="text-[11px] font-semibold text-white/90 leading-tight">
                        QML Render
                    </span>
                    <span className="text-[9px] text-purple-400/80 mt-0.5">
                        Wayland Surface
                    </span>
                </div>

                {/* SVG Animated Connection Pulses overlay between nodes */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-[22%] sm:px-[20%]">
                    {/* Link 1: Cyan Pulse */}
                    <div className="relative w-8 sm:w-12 h-0.5 bg-gradient-to-r from-cyan-500/40 to-emerald-500/40 overflow-hidden">
                        <div className="absolute top-0 bottom-0 w-3 bg-cyan-300 rounded-full blur-[1px] animate-[pulse_1.2s_ease-in-out_infinite]" />
                    </div>
                    {/* Link 2: Emerald Pulse */}
                    <div className="relative w-8 sm:w-12 h-0.5 bg-gradient-to-r from-emerald-500/40 to-purple-500/40 overflow-hidden">
                        <div className="absolute top-0 bottom-0 w-3 bg-emerald-300 rounded-full blur-[1px] animate-[pulse_1.2s_ease-in-out_infinite_0.6s]" />
                    </div>
                </div>
            </div>

            {/* Bottom: Simulated Real-Time IPC Log */}
            <div className="relative z-10 flex items-center justify-between px-2.5 py-1 rounded bg-black/50 border border-white/5 text-[10px] text-white/60">
                <div className="flex items-center gap-1.5 truncate">
                    <span className="text-emerald-400 font-bold">»</span>
                    <span className="text-white/80">workspace:active ➔ 1</span>
                    <span className="text-white/40">➔ render_bar()</span>
                </div>
                <span className="text-emerald-400 font-mono text-[9px] shrink-0 pl-2">
                    0.4ms
                </span>
            </div>
        </div>
    );
};
