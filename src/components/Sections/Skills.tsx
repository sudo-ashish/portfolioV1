import { Section } from "../UI/Section";
import { ForceGraph } from "../Graph/ForceGraph";
import { SKILLS_DATA } from "../../data/skillsGraph";

export const Skills = () => {
    return (
        <Section id="skills" className="w-full max-w-6xl mx-auto px-6 md:px-12 box-border">
            {/* Header outside the box */}
            <div className="w-full text-center mb-8 min-w-0">
                <h2 className="text-2xl font-light text-white/50 tracking-widest uppercase">Knowledge Graph</h2>
                <p className="text-white/30 text-sm mt-2 font-mono">Interactive Connection Map</p>
            </div>

            <div className="relative w-full h-[60vh] min-h-[500px] max-h-[800px] bg-black/40 rounded-3xl overflow-hidden flex flex-col border border-white/10 shadow-2xl backdrop-blur-sm min-w-0">
                <ForceGraph data={SKILLS_DATA} />
            </div>
        </Section>
    );
};
