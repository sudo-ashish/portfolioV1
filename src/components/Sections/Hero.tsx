import { motion } from "framer-motion";
import { Section } from "../UI/Section";

export const Hero = () => {
    return (
        <Section id="hero" className="min-h-screen">
            <div className="flex flex-col gap-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-xl md:text-2xl font-light text-white/60 tracking-wide mb-2">
                        ASHISH
                    </h2>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white mb-8">
                        Creative <br />
                        <span className="text-white/40">Developer.</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="max-w-xl"
                >
                    <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed">
                        Crafting digital experiences that feel <span className="text-white font-medium">physical</span>.
                        Focusing on motion, depth, and the subtle details that turn software into craftsmanship.
                    </p>
                </motion.div>
            </div>
        </Section>
    );
};
