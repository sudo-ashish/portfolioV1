import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2 } from 'lucide-react';

type TabId = 'net-check' | 'services' | 'cleanup';

interface DiagnosticLog {
    command: string;
    lines: { tag: string; text: string; status: 'info' | 'pass' | 'warn' | 'active' | 'done' }[];
    exitCode: number;
}

const DIAGNOSTICS: Record<TabId, DiagnosticLog> = {
    'net-check': {
        command: 'winhelp net-check --interface wlan0',
        lines: [
            { tag: 'INFO', text: 'Probing interface: wlan0 (MTU 1500)', status: 'info' },
            { tag: 'PASS', text: 'Link detected: 802.11ax (signal: -52 dBm)', status: 'pass' },
            { tag: 'PASS', text: 'Gateway ping 192.168.1.1: 1.4ms', status: 'pass' },
            { tag: 'PASS', text: 'DNS resolution (1.1.1.1): resolved in 12ms', status: 'pass' },
            { tag: 'DONE', text: 'Network route verified. 0 packet loss.', status: 'done' },
        ],
        exitCode: 0,
    },
    'services': {
        command: 'winhelp services --status',
        lines: [
            { tag: 'INIT', text: 'Querying systemd user & system units...', status: 'info' },
            { tag: 'ACTIVE', text: 'pipewire.service (audio routing nominal)', status: 'active' },
            { tag: 'ACTIVE', text: 'hyprland-ipc.socket (listener active)', status: 'active' },
            { tag: 'LOADED', text: 'seatd.service (seat management ok)', status: 'pass' },
            { tag: 'IDLE', text: 'bluetooth.service (power-save mode)', status: 'warn' },
            { tag: 'DONE', text: '3/4 units active, 0 failed units.', status: 'done' },
        ],
        exitCode: 0,
    },
    'cleanup': {
        command: 'winhelp cleanup --dry-run',
        lines: [
            { tag: 'SCAN', text: 'Inspecting local caches and package journal...', status: 'info' },
            { tag: 'CACHE', text: '~/.cache/yay (1.4 GB reclaimable)', status: 'warn' },
            { tag: 'LOGS', text: 'journalctl logs > 50M (180 MB vacuum target)', status: 'warn' },
            { tag: 'CHECK', text: 'Orphaned pacman packages: 0 detected', status: 'pass' },
            { tag: 'READY', text: "Run 'winhelp cleanup --apply' to purge 1.58 GB.", status: 'done' },
        ],
        exitCode: 0,
    },
};

export const WinHelpPreview: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('net-check');
    const [running, setRunning] = useState(false);

    const log = DIAGNOSTICS[activeTab];

    const handleSwitchTab = (tab: TabId) => {
        setActiveTab(tab);
        setRunning(true);
        setTimeout(() => setRunning(false), 200);
    };

    const handleRerun = () => {
        setRunning(true);
        setTimeout(() => setRunning(false), 300);
    };

    const getTagClass = (status: string) => {
        switch (status) {
            case 'pass':
            case 'done':
                return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'active':
                return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
            case 'warn':
                return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            default:
                return 'text-zinc-400 bg-white/[0.04] border-white/10';
        }
    };

    return (
        <div className="relative w-full overflow-hidden rounded-lg bg-[#09090c] border border-white/[0.08] p-3.5 sm:p-5 font-mono select-none flex flex-col justify-between gap-3">
            {/* Top Bar: Clickable Command Tabs */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                    {(['net-check', 'services', 'cleanup'] as TabId[]).map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => handleSwitchTab(tab)}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                                    isActive
                                        ? 'bg-amber-400/15 border border-amber-400/50 text-amber-200'
                                        : 'bg-white/[0.03] border border-transparent text-zinc-500 hover:text-zinc-300'
                                }`}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={handleRerun}
                    className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    title="Re-run active check"
                >
                    <RotateCcw size={10} className={running ? 'animate-spin text-amber-400' : ''} />
                    <span className="hidden sm:inline">Rerun</span>
                </button>
            </div>

            {/* Terminal Window with realistic output */}
            <div className="rounded-md bg-[#070709] border border-white/[0.06] p-2.5 text-[11px] space-y-1.5">
                {/* Prompt Line */}
                <div className="flex items-center gap-2 text-zinc-300 pb-1.5 border-b border-white/[0.04]">
                    <span className="text-amber-400 font-bold select-none">❯</span>
                    <span className="text-zinc-200 font-medium">{log.command}</span>
                </div>

                {/* Simulated Step-by-Step Checks */}
                <div className="space-y-1 pt-1 min-h-[96px]">
                    {running ? (
                        <div className="flex items-center gap-2 text-zinc-500 text-[10px] py-4">
                            <Play size={10} className="animate-spin text-amber-400" />
                            <span>Executing diagnostic probe...</span>
                        </div>
                    ) : (
                        log.lines.map((line, i) => (
                            <div key={i} className="flex items-baseline gap-2 text-[10px] sm:text-[11px]">
                                <span
                                    className={`px-1.5 py-0.2 rounded border text-[9px] font-bold shrink-0 ${getTagClass(
                                        line.status
                                    )}`}
                                >
                                    {line.tag}
                                </span>
                                <span className="text-zinc-300 truncate">{line.text}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Bottom Status Banner */}
            <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                <div className="flex items-center gap-1.5 text-zinc-400">
                    <CheckCircle2 size={11} className="text-emerald-400" />
                    <span>status: exit code 0 (success)</span>
                </div>
                <span className="text-zinc-600 font-sans">Click tabs to test diagnostics</span>
            </div>
        </div>
    );
};
