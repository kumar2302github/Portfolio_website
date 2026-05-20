import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NeuralButton from '@/components/ui/NeuralButton';

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function Hero() {
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollIndicatorVisible(window.scrollY <= 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTalkToAI = () => {
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  const handleExploreWork = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 max-w-[1200px] mx-auto gap-12"
      style={{ zIndex: 1 }}
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:max-w-xl">
        {/* Pre-label */}
        <motion.div
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          <span
            className="inline-block w-0.5 h-5"
            style={{ backgroundColor: '#39D353' }}
          />
          <span
            className="font-mono text-[13px] tracking-wide"
            style={{ color: '#39D353' }}
          >
            Data Scientist & AI Engineer
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="font-display font-extrabold leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: '#E6EDF3' }}
        >
          Manish Kumar
        </motion.h1>

        {/* Descriptor */}
        <motion.p
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="font-body font-normal max-w-xl"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#8B949E' }}
        >
          Building intelligence — from raw data to reasoning systems.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          custom={0.8}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center sm:justify-start gap-4 mt-4"
        >
          {/* Primary CTA - Talk to My AI */}
          <div className="relative">
            {/* Pulsing ring around dominant CTA */}
            <motion.div
              className="absolute inset-0 rounded-lg border"
              style={{
                borderColor: 'rgba(232, 197, 71, 0.35)',
                borderRadius: '8px',
              }}
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <NeuralButton
              variant="primary"
              size="lg"
              onClick={handleTalkToAI}
              className="shadow-glow-amber-dominant relative z-10"
            >
              Talk to My AI
            </NeuralButton>
          </div>

          {/* Secondary CTA - Explore My Work */}
          <NeuralButton
            variant="secondary"
            size="lg"
            onClick={handleExploreWork}
          >
            Explore My Work
          </NeuralButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollIndicatorVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: 'none' }}
      >
        <div className="relative w-0.5 h-10 overflow-hidden" style={{ backgroundColor: 'rgba(57, 211, 83, 0.2)' }}>
          <motion.div
            className="absolute w-full h-2 rounded-full"
            style={{ backgroundColor: '#39D353' }}
            animate={{ y: [0, 32, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
