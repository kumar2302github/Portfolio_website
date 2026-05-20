import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillTree from '@/components/ui/SkillTree';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-8"
      style={{ zIndex: 1 }}
    >
      <motion.div
        className="max-w-[1200px] mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section header */}
        <div className="mb-12">
          <motion.span
            variants={itemVariants}
            className="font-mono text-[13px] block mb-3"
            style={{ color: '#39D353' }}
          >
            {'//'} skills.mycelium
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-display font-bold text-2xl md:text-[2rem] mb-2"
            style={{ color: '#E6EDF3' }}
          >
            Technical Skill Tree
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body text-sm"
            style={{ color: '#8B949E' }}
          >
            Manish's technical capabilities represented as a self-organizing knowledge network, branching from foundational engineering to advanced generative intelligence.
          </motion.p>
        </div>

        {/* Tree Component */}
        <motion.div variants={itemVariants}>
          <SkillTree />
        </motion.div>
      </motion.div>
    </section>
  );
}
