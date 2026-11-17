import React from 'react';
import { CheckCircle2, Zap, ShieldCheck } from 'lucide-react';

export const WinHelpPreview: React.FC = () => {
    return (
        <div className="relative h-[210px] w-full overflow-hidden rounded-xl bg-[#08080c] border border-white/[0.08] p-3.5 sm:p-4 font-mono select-none flex flex-col justify-between">
            {/* Scanline Effect Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-20 opacity-30"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) 1px, transparent 1px, transparent 3px)',
                }}
            />

            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-950/15 via-transparent to-transparent pointer-events-none" />

            {/* Top Command Prompt Bar */}
            <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">❯</span>
                    <span className="text-white font-medium">winhelp --diagnose --auto-fix</span>
                </div>
                <span className="text-[10px] text-white/40 hidden sm:inline">
                    v2.4.0
                </span>
            </div>

            {/* Live Diagnostic Checks List */}
            <div className="relative z-10 space-y-2 my-auto text-xs">
                {/* Check 1 */}
                <div className="flex items-center justify-between px-2.5 py-1 rounded bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span className="text-white/80">Network Stack</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono">
                        [✓] Online (0ms)
                    </span>
                </div>

                {/* Check 2 */}
                <div className="flex items-center justify-between px-2.5 py-1 rounded bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span className="text-white/80">Service Daemon</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono">
                        [✓] Active (PID 2049)
                    </span>
                </div>

                {/* Check 3 */}
                <div className="flex items-center justify-between px-2.5 py-1 rounded bg-black/40 border border-amber-500/20 group-hover:border-amber-400/40 transition-colors">
                    <div className="flex items-center gap-2">
                        <Zap size={13} className="text-amber-400 shrink-0 animate-pulse" />
                        <span className="text-white/80">Optimizing Config</span>
                    </div>
                    <span className="text-[11px] text-amber-300 font-mono">
                        [⚡] 14 rules applied
                    </span>
                </div>
            </div>

            {/* Bottom Status Banner */}
            <div className="relative z-10 flex items-center justify-between px-2.5 py-1 rounded bg-emerald-950/30 border border-emerald-500/20 text-[10px] text-emerald-400">
                <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400" />
                    <span className="font-semibold uppercase tracking-wider">Status: Healthy</span>
                </div>
                <span className="text-white/50 font-mono">
                    Diagnostic pass: 100%
                </span>
            </div>
        </div>
    );
};
