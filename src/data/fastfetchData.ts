/**
 * Fastfetch Configuration & Profile Information
 * 
 * Edit this file to customize any text, keys, values, links,
 * and GitHub fallback stats displayed in the About Me Fastfetch card.
 */

export interface FastfetchItem {
    key: string;
    value: string;
    href?: string;
    isExternal?: boolean;
}

export interface FastfetchSection {
    title: string;
    items: FastfetchItem[];
}

export interface FastfetchConfig {
    // Terminal window chrome & prompt
    windowTitle: string;
    promptCommand: string;
    userHost: string;

    // Block 1: System & Developer Environment
    systemInfo: FastfetchItem[];

    // Block 2: Languages & Technical Stack (Dot-Notation Keys)
    techStack: FastfetchItem[];

    // Section: Approach & Mindset
    approach: FastfetchSection;

    // Section: Contact
    contact: FastfetchSection;

    // Section: GitHub Stats
    githubStats: {
        title: string;
        username: string; // GitHub username for live stats fetching
        fallback: {
            repos: number | string;
            stars: number | string;
            followers: number | string;
            following: number | string;
        };
    };
}

export const fastfetchConfig: FastfetchConfig = {
    // Window header info
    windowTitle: 'sudo-ashish : wayland-session [hyprland]',
    promptCommand: 'fastfetch --profile sudo-ashish',
    userHost: 'sudo-ashish@github',

    // Block 1: System & Developer Environment
    systemInfo: [
        { key: 'OS:', value: 'Arch Linux / Debian (Wayland) · Windows 11' },
        { key: 'WM / Shell:', value: 'Hyprland · Quickshell · Zsh · Powershell' },
        { key: 'Host:', value: 'Systems & Full-Stack Developer' },
        { key: 'Kernel:', value: 'Unix Modularity & Config-Driven Workflow' },
        { key: 'Terminal:', value: 'Kitty / Ghostty' },
        { key: 'Editor:', value: 'Neovim (Lua), Antigravity' },
    ],

    // Block 2: Languages & Technical Stack (Dot-Notation Keys)
    techStack: [
        { key: 'Languages.Core:', value: 'Python, TypeScript, JavaScript, C++, Bash, Lua' },
        { key: 'Languages.UI:', value: 'QML, HTML, CSS, Tailwind' },
        { key: 'Stack.Systems:', value: 'systemd, Filesystem Hierarchy, CLI Piping' },
        { key: 'Stack.Domain:', value: 'Wayland Compositors, Full-Stack APIs, ML' },
    ],

    // Section: Approach & Mindset
    approach: {
        title: 'Approach & Mindset',
        items: [
            { key: 'Environment:', value: 'OS tuned as a transparent tool, not a black box' },
            { key: 'Ownership:', value: 'Package management, config tuning, root-cause fixes' },
            { key: 'Competencies:', value: 'System Config, Workflow Optimization, Automation' },
            { key: 'Philosophy:', value: '"Understand how tools connect; build stable systems from the ground up."' },
        ],
    },

    // Section: Contact
    contact: {
        title: 'Contact',
        items: [
            {
                key: 'GitHub:',
                value: 'https://github.com/sudo-ashish',
                href: 'https://github.com/sudo-ashish',
                isExternal: true,
            },
            {
                key: 'Email:',
                value: 'contact@sudo-ashish.dev',
                href: 'mailto:contact@sudo-ashish.dev',
            },
            {
                key: 'Location:',
                value: 'Earth',
            },
        ],
    },

    // Section: GitHub Stats
    githubStats: {
        title: 'GitHub Stats',
        username: 'sudo-ashish',
        fallback: {
            repos: 18,
            stars: 25,
            followers: 14,
            following: 12,
        },
    },
};

export default fastfetchConfig;
