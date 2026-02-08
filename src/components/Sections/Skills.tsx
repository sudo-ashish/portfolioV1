import { Section } from "../UI/Section";
import { ForceGraph } from "../Graph/ForceGraph";
import { SKILLS_DATA } from "../../data/skillsGraph";

export const Skills = () => {
    return (
        <Section id="skills" className="py-24 max-w-7xl mx-auto px-6">
            {/* Header outside the box */}
            <div className="w-full text-center mb-8">
                <h2 className="text-2xl font-light text-white/50 tracking-widest uppercase">Knowledge Graph</h2>
                <p className="text-white/20 text-sm mt-2">Interactive Connection Map</p>
            </div>

            <div className="relative w-full h-[60vh] min-h-[500px] max-h-[800px] bg-black/20 rounded-3xl overflow-hidden flex flex-col border border-white/5 shadow-2xl">
                <ForceGraph data={SKILLS_DATA} />
            </div>
        </Section>
    );
};
