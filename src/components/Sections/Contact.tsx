import { Section } from "../UI/Section";
import { GlassCard } from "../UI/GlassCard";
import { Mail, Github, Linkedin } from "lucide-react";

export const Contact = () => {
    return (
        <Section id="contact" className="min-h-[70vh]">
            <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-8">
                    Let's Build <br />
                    <span className="text-white/40">Something.</span>
                </h2>

                <p className="text-xl text-white/60 mb-12">
                    Currently open for new opportunities and interesting collaborations.
                </p>

                <div className="flex gap-4">
                    <GlassCard
                        hoverEffect
                        className="flex items-center gap-3 px-6 py-4 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                    >
                        <Mail className="text-white" size={20} />
                        <span className="text-white">Email Me</span>
                    </GlassCard>

                    <GlassCard
                        hoverEffect
                        className="flex items-center gap-3 px-6 py-4 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        onClick={() => window.open('https://github.com', '_blank')}
                    >
                        <Github className="text-white" size={20} />
                        <span className="text-white">GitHub</span>
                    </GlassCard>

                    <GlassCard
                        hoverEffect
                        className="flex items-center gap-3 px-6 py-4 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                    >
                        <Linkedin className="text-white" size={20} />
                        <span className="text-white">LinkedIn</span>
                    </GlassCard>
                </div>
            </div>

            <footer className="absolute bottom-8 left-0 w-full text-center text-white/20 text-sm">
                © 2026 Ashish. Designed & Engineered.
            </footer>
        </Section>
    );
};
