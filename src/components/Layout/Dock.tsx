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
                className="flex items-center gap-1.5 px-3 py-2 rounded-full 
                   bg-[#0e0e11]/90 backdrop-blur-xl border border-white/[0.1] border-t-white/[0.2]
                   shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_36px_-8px_rgba(0,0,0,0.7)]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            >
                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className="relative group p-2.5 rounded-full transition-all duration-200 cursor-pointer"
                            aria-label={item.label}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/[0.08] border border-white/[0.1] rounded-full"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}

                            <item.icon
                                size={18}
                                className={`relative z-10 transition-colors duration-200 ${
                                    isActive ? "text-amber-400" : "text-zinc-400 group-hover:text-zinc-200"
                                }`}
                            />

                            {/* Tooltip */}
                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 
                                     bg-[#121216] border border-white/[0.08] text-[10px] font-mono text-zinc-300 rounded shadow-md opacity-0 
                                     group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </motion.nav>
        </div>
    );
};
