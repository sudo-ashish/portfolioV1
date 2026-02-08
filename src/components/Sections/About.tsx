import { Section } from "../UI/Section";

export const About = () => {
    return (
        <Section id="about">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight sticky top-32">
                        System <br />
                        <span className="text-white/40">Architecture.</span>
                    </h2>
                </div>

                <div className="md:col-span-8 space-y-12">
                    {/* Intro */}
                    <div className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                        <p>
                            I’m a developer who prefers understanding a system over just using its interface.
                            For me, <span className="text-white font-medium">Linux</span> isn't a hobby; it’s my primary environment.
                            I’ve moved past surface-level usage into a workflow defined by the terminal, configuration-driven tools,
                            and a deep respect for the Unix philosophy of modularity.
                        </p>
                    </div>

                    {/* Technical Approach */}
                    <div className="space-y-8">
                        <h3 className="text-lg text-white font-medium uppercase tracking-widest border-b border-white/10 pb-4">
                            Technical Approach
                        </h3>

                        <div className="grid gap-8">
                            <div className="group">
                                <h4 className="text-white text-lg font-medium mb-2 group-hover:text-cyan-400 transition-colors">The Environment</h4>
                                <p className="text-white/60 leading-relaxed">
                                    I treat my OS as a tool to be tuned, not a black box. I’m comfortable navigating the filesystem hierarchy,
                                    managing permissions, and maintaining system services. I favor lightweight, composable utilities and rely on
                                    <span className="text-white/80"> Neovim</span> for a modal, keyboard-driven workflow that prioritizes speed and focus.
                                </p>
                            </div>

                            <div className="group">
                                <h4 className="text-white text-lg font-medium mb-2 group-hover:text-purple-400 transition-colors">System Ownership</h4>
                                <p className="text-white/60 leading-relaxed">
                                    My experience comes from breaking things and fixing them. Whether it’s managing packages, editing configuration files
                                    to optimize a workflow, or piping utilities together to solve a specific problem, I value the transparency
                                    and control that Linux provides.
                                </p>
                            </div>

                            <div className="group">
                                <h4 className="text-white text-lg font-medium mb-2 group-hover:text-blue-400 transition-colors">The Full Stack</h4>
                                <p className="text-white/60 leading-relaxed">
                                    Beyond the OS, I apply this same "under-the-hood" curiosity to building applications with JavaScript
                                    and exploring data patterns with Python/ML. I’m interested in how high-level code interacts with the underlying system,
                                    from API handling to background processes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mindset */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-lg text-white font-medium uppercase tracking-widest mb-4">
                            Mindset
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed italic">
                            "I’m building a career on strong foundations. I don’t claim to be a kernel developer, but I am someone who understands
                            how tools connect, why configuration matters, and how to build stable, efficient systems from the ground up."
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                        <div>
                            <h4 className="text-white text-sm font-medium mb-3 uppercase tracking-widest">Core Stack</h4>
                            <ul className="space-y-2 text-white/50 font-mono text-sm">
                                <li>Linux / Arch / Debian</li>
                                <li>Neovim / Lua</li>
                                <li>JavaScript / TypeScript</li>
                                <li>Python / ML / Bash</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-sm font-medium mb-3 uppercase tracking-widest">Competencies</h4>
                            <ul className="space-y-2 text-white/50 font-mono text-sm">
                                <li>System Configuration</li>
                                <li>Workflow Optimization</li>
                                <li>Full Stack Development</li>
                                <li>Scripting & Automation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};
