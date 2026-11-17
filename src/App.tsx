import { BackgroundSystem } from './components/Background/BackgroundSystem';
import { Dock } from './components/Layout/Dock';
import { Hero } from './components/Sections/Hero';
import { Work } from './components/Sections/Work';
import { About } from './components/Sections/About';
import { Contact } from './components/Sections/Contact';

import { ThemeProvider } from './context/ThemeContext';
import { ThemeSwitcher } from './components/UI/ThemeSwitcher';

function App() {
  return (
    <ThemeProvider>
      <main className="relative w-full min-h-screen transition-colors duration-500 overflow-x-hidden bg-[#09090b]">
        <BackgroundSystem />
        <ThemeSwitcher />

        {/* Root content container with pb-32 so content never hides behind the floating dock */}
        <div className="relative z-10 select-none md:select-auto pb-32 w-full min-w-0 box-border">
          <Hero />
          <Work />
          <About />
          <Contact />
        </div>

        <Dock />
      </main>
    </ThemeProvider>
  );
}

export default App;
