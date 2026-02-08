import { Section } from "../UI/Section";
import { GlassCard } from "../UI/GlassCard";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
    {
        title: "Liquid Glass",
        category: "System Design",
        year: "2026",
        description: "An interactive physics-based background engine running on Canvas API."
    },
    {
        title: "Neon Nexus",
        category: "Web Application",
        year: "2025",
        description: "Cyberpunk inspired dashboard with real-time data visualization."
    },
    {
        title: "Aero",
        category: "Interface",
        year: "2024",
        description: "Minimalist task management system focusing on flow state."
    }
];

export const Work = () => {
    return (
        <Section id="work">
            <div className="flex items-end justify-between mb-16">
                <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">Selected Work</h2>
                <span className="text-white/40 text-sm font-mono">2024 — 2026</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((project, index) => (
                    <GlassCard
                        key={index}
                        hoverEffect={true}
                        className="group min-h-[300px] flex flex-col justify-between cursor-pointer"
                    >
                        <div className="flex justify-between items-start">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                                {project.category}
                            </span>
                            <ArrowUpRight className="text-white/40 group-hover:text-white transition-colors" />
                        </div>

                        <div>
                            <h3 className="text-3xl text-white font-medium mb-2">{project.title}</h3>
                            <p className="text-white/60 leading-relaxed">{project.description}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
};
