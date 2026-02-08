import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/5 data-[theme='gruvbox']:bg-black/5 hover:scale-110 transition-all duration-300 border border-white/10 data-[theme='gruvbox']:border-black/10 backdrop-blur-md group"
            data-theme={theme}
            aria-label="Toggle Theme"
        >
            <div className="relative w-5 h-5 overflow-hidden">
                <Sun
                    className={`absolute inset-0 w-full h-full text-amber-500 transition-all duration-500 ${theme === 'gruvbox' ? 'translate-y-0 rotate-0' : 'translate-y-8 rotate-90'}`}
                />
                <Moon
                    className={`absolute inset-0 w-full h-full text-indigo-300 transition-all duration-500 ${theme === 'dark' ? 'translate-y-0 rotate-0' : '-translate-y-8 -rotate-90'}`}
                />
            </div>
        </button>
    );
};
