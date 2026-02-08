import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail, Network } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "work", icon: Briefcase, label: "Work" },
    { id: "skills", icon: Network, label: "Graph" },
    { id: "about", icon: User, label: "About" },
    { id: "contact", icon: Mail, label: "Contact" },
];

export const Dock = () => {
    const [activeSection, setActiveSection] = useState("hero");

    // Simple scroll spy
    useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
            const scrollPos = window.scrollY + window.innerHeight * 0.4;

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.nav
                className="flex items-center gap-2 px-3 py-3 rounded-full 
                   bg-white/10 backdrop-blur-xl border border-white/20 
                   shadow-2xl shadow-black/50"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            >
                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className="relative group p-3 rounded-full transition-all duration-300"
                            aria-label={item.label}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/20 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            <item.icon
                                size={20}
                                className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-white/60 group-hover:text-white/90"}`}
                            />

                            {/* Tooltip */}
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 
                                     bg-black/80 backdrop-blur text-xs text-white rounded opacity-0 
                                     group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </motion.nav>
        </div>
    );
};
