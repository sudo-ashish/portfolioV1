import { Section } from "../UI/Section";
import { ForceGraph } from "../Graph/ForceGraph";
import { SKILLS_DATA } from "../../data/skillsGraph";

export const Skills = () => {
    return (
        <Section id="skills" className="w-full max-w-6xl mx-auto px-6 md:px-12 box-border min-w-0 py-24">
            {/* Asymmetric Editorial Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 mb-8 border-b border-white/[0.07] min-w-0">
                <div>
                    <span className="text-xs font-mono tracking-widest text-amber-400/90 font-medium uppercase">
                        02 // KNOWLEDGE GRAPH
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-zinc-100 tracking-tight mt-2">
                        System & Skill Topology.
                    </h2>
                </div>
                <span className="text-xs font-mono text-zinc-500 mt-2 sm:mt-0 uppercase tracking-wider">
                    Interactive Force Map · Drag & Zoom
                </span>
            </div>

            {/* Machined Force Graph Window */}
            <div className="relative w-full h-[60vh] min-h-[500px] max-h-[720px] bg-[#0e0e11] rounded-xl border border-white/[0.07] border-t-white/[0.15] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_16px_36px_-12px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col min-w-0">
                <ForceGraph data={SKILLS_DATA} />
            </div>
        </Section>
    );
};
