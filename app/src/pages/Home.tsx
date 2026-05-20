import FungalNetwork from '@/components/FungalNetwork';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import ChatBot from '@/components/ui/ChatBot';

export default function Home() {
  return (
    <>
      {/* World Layer — Fungal Network Canvas */}
      <FungalNetwork />

      {/* Navigation */}
      <Navigation />

      {/* Content Layer */}
      <main id="main-content" className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />

        {/* RAG Chatbot */}
        <ChatBot />

        {/* Footer */}
        <footer className="relative py-8 px-6 text-center" style={{ zIndex: 1 }}>
          <div
            className="max-w-[1200px] mx-auto pt-6 border-t"
            style={{ borderColor: '#21262D' }}
          >
            <p className="font-mono text-[11px]" style={{ color: '#484F58' }}>
              Built with React + p5.js + D3.js + Framer Motion · Mycelium Mind v2.0
            </p>
            <p className="font-mono text-[11px] mt-1" style={{ color: '#484F58' }}>
              © {new Date().getFullYear()} Manish Kumar. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
