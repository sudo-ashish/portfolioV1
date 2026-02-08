import { BackgroundSystem } from './components/Background/BackgroundSystem';
import { Dock } from './components/Layout/Dock';
import { Hero } from './components/Sections/Hero';
import { Work } from './components/Sections/Work';
import { Skills } from './components/Sections/Skills';
import { About } from './components/Sections/About';
import { Contact } from './components/Sections/Contact';

import { ThemeProvider } from './context/ThemeContext';
import { ThemeSwitcher } from './components/UI/ThemeSwitcher';

function App() {
  return (
    <ThemeProvider>
      <main className="relative w-full min-h-screen transition-colors duration-500">
        <BackgroundSystem />
        <ThemeSwitcher />

        {/* Content Layer */}
        <div className="relative z-10 select-none md:select-auto">
          <Hero />
          <Work />
          <Skills />
          <About />
          <Contact />
        </div>

        <Dock />
      </main>
    </ThemeProvider>
  );
}

export default App;
