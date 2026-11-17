export interface SkillNode {
    id: string;
    name: string;
    category: 'system' | 'language' | 'tool' | 'framework' | 'concept';
    val: number; // proficiency/weight (for node size)
    description?: string;
    // d3-force specific (will be populated by simulation)
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
}

export interface SkillLink {
    source: string | SkillNode;
    target: string | SkillNode;
    type: 'builds-on' | 'related' | 'tool-for';
}

export interface GraphData {
    nodes: SkillNode[];
    links: SkillLink[];
}

export const SKILLS_DATA: GraphData = {
    nodes: [
        // System
        { id: 'arch', name: 'Arch Linux', category: 'system', val: 10, description: 'Primary OS environment with custom kernel tuning.' },
        { id: 'hyprland', name: 'Hyprland', category: 'system', val: 9, description: 'Dynamic tiling Wayland compositor.' },
        { id: 'bash', name: 'Bash', category: 'system', val: 8, description: 'Shell automation and system administration scripting.' },

        // Tools
        { id: 'quickshell', name: 'Quickshell', category: 'tool', val: 9, description: 'C++/Qt6 Wayland shell framework for QML desktop widgets.' },
        { id: 'neovim', name: 'Neovim', category: 'tool', val: 9, description: 'Modal editor with Lua configuration and LSP integration.' },
        { id: 'git', name: 'Git', category: 'tool', val: 9, description: 'Version control and dotfiles management.' },

        // Languages
        { id: 'qml', name: 'QML', category: 'language', val: 9, description: 'Declarative UI markup for Qt & Quickshell.' },
        { id: 'ts', name: 'TypeScript', category: 'language', val: 9, description: 'Strict typing for high-reliability web and CLI applications.' },
        { id: 'js', name: 'JavaScript', category: 'language', val: 8, description: 'ECMAScript runtime and event loop architecture.' },
        { id: 'python', name: 'Python', category: 'language', val: 8, description: 'Automation, ML workflows, and scripting.' },
        { id: 'cpp', name: 'C++', category: 'language', val: 7, description: 'Systems programming and Qt6 backend bindings.' },
        { id: 'lua', name: 'Lua', category: 'language', val: 7, description: 'Neovim configuration scripting and fast embedded logic.' },

        // Frameworks
        { id: 'react', name: 'React', category: 'framework', val: 10, description: 'Component-driven reactive frontend architectures.' },
        { id: 'tailwind', name: 'Tailwind CSS', category: 'framework', val: 9, description: 'Utility-first design and machined dark aesthetics.' },
        { id: 'qt6', name: 'Qt6', category: 'framework', val: 8, description: 'Cross-platform GUI toolkit powering Wayland shells.' },

        // Concepts
        { id: 'sys_arch', name: 'System Arch', category: 'concept', val: 8, description: 'Unix modularity, IPC sockets, and process management.' },
        { id: 'wayland_ipc', name: 'Wayland IPC', category: 'concept', val: 9, description: 'Event loops, socket2 protocols, and compositor state.' },
        { id: 'perf', name: 'Performance', category: 'concept', val: 8, description: 'Frame pacing, memory footprint, and low-latency rendering.' },
    ],
    links: [
        { source: 'arch', target: 'hyprland', type: 'related' },
        { source: 'hyprland', target: 'wayland_ipc', type: 'related' },
        { source: 'hyprland', target: 'quickshell', type: 'tool-for' },
        { source: 'quickshell', target: 'qml', type: 'builds-on' },
        { source: 'quickshell', target: 'qt6', type: 'builds-on' },
        { source: 'qt6', target: 'cpp', type: 'builds-on' },

        { source: 'arch', target: 'bash', type: 'related' },
        { source: 'arch', target: 'neovim', type: 'tool-for' },
        { source: 'neovim', target: 'lua', type: 'builds-on' },
        { source: 'git', target: 'arch', type: 'related' },

        { source: 'js', target: 'ts', type: 'builds-on' },
        { source: 'ts', target: 'react', type: 'builds-on' },
        { source: 'react', target: 'tailwind', type: 'tool-for' },

        { source: 'python', target: 'arch', type: 'related' },
        { source: 'wayland_ipc', target: 'sys_arch', type: 'related' },
        { source: 'sys_arch', target: 'perf', type: 'related' },
        { source: 'qml', target: 'wayland_ipc', type: 'related' },
    ]
};
