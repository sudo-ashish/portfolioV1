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
        { id: 'linux', name: 'Linux', category: 'system', val: 10, description: 'Primary environment. Arch/Debian.' },
        { id: 'bash', name: 'Bash', category: 'system', val: 8 },
        { id: 'git', name: 'Git', category: 'tool', val: 9 },
        { id: 'neovim', name: 'Neovim', category: 'tool', val: 9, description: 'PDE configuration & Lua' },

        // Languages
        { id: 'js', name: 'JavaScript', category: 'language', val: 9 },
        { id: 'ts', name: 'TypeScript', category: 'language', val: 9 },
        { id: 'python', name: 'Python', category: 'language', val: 7 },
        { id: 'lua', name: 'Lua', category: 'language', val: 6 },

        // Frameworks
        { id: 'react', name: 'React', category: 'framework', val: 10 },
        { id: 'next', name: 'Next.js', category: 'framework', val: 8 },
        { id: 'tailwind', name: 'Tailwind', category: 'framework', val: 8 },
        { id: 'framer', name: 'Framer Motion', category: 'framework', val: 8 },

        // Concepts
        { id: 'sys_arch', name: 'System Arch', category: 'concept', val: 8 },
        { id: 'perf', name: 'Performance', category: 'concept', val: 7 },
        { id: 'api', name: 'API Design', category: 'concept', val: 7 },
    ],
    links: [
        { source: 'linux', target: 'bash', type: 'related' },
        { source: 'linux', target: 'neovim', type: 'tool-for' },
        { source: 'linux', target: 'sys_arch', type: 'related' },
        { source: 'neovim', target: 'lua', type: 'builds-on' },

        { source: 'js', target: 'ts', type: 'builds-on' },
        { source: 'ts', target: 'react', type: 'builds-on' },
        { source: 'react', target: 'next', type: 'builds-on' },

        { source: 'react', target: 'framer', type: 'tool-for' },
        { source: 'react', target: 'tailwind', type: 'tool-for' },

        { source: 'python', target: 'linux', type: 'related' },
        { source: 'git', target: 'linux', type: 'related' },

        { source: 'sys_arch', target: 'perf', type: 'related' },
        { source: 'sys_arch', target: 'api', type: 'related' },
    ]
};
