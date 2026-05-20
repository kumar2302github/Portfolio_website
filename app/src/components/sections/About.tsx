import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillGraph from '@/components/ui/SkillGraph';

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

const stats = [
  { number: '1+', label: 'Years', sublabel: 'AI/ML Experience' },
  { number: '5+', label: 'Projects', sublabel: 'Shipped' },
  { number: 'B.Tech CSE', label: '2025', sublabel: 'Graduate' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-8"
      style={{ zIndex: 1 }}
    >
      <motion.div
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Left Column — Bio */}
        <div className="flex flex-col gap-6">
          {/* Section label */}
          <motion.span
            variants={itemVariants}
            className="font-mono text-[13px]"
            style={{ color: '#39D353' }}
          >
            {'//'} about.me
          </motion.span>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-display font-bold text-2xl md:text-[2rem] leading-tight"
            style={{ color: '#E6EDF3' }}
          >
            The Node Behind the Network
          </motion.h2>

          {/* Bio text */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <p className="font-body text-[15px] leading-relaxed" style={{ color: '#8B949E' }}>
              Manish Kumar is a Data Scientist and AI Engineer with 1+ years of experience building
              with machine learning, deep learning, and generative AI. He specializes in RAG
              pipelines, agentic systems, and multimodal transformers — the infrastructure that makes
              AI actually useful in the real world.
            </p>
            <p className="font-body text-[15px] leading-relaxed" style={{ color: '#8B949E' }}>
              Currently pursuing B.Tech in Computer Science at Bhagalpur College of Engineering, he
              builds by doing: from fine-tuned BERT models for privacy-critical legal systems to
              multi-agent LangGraph architectures that route queries across PDFs, databases, and the
              web.
            </p>
            <p className="font-body text-[15px] leading-relaxed" style={{ color: '#8B949E' }}>
              He's also led the ESROS Robotics Club as Head Coordinator — because good engineering
              is always part human.
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-8 mt-4"
          >
            {stats.map((stat) => (
              <div key={stat.number} className="flex flex-col gap-1">
                <span
                  className="font-display font-bold text-xl md:text-2xl"
                  style={{ color: '#E6EDF3' }}
                >
                  {stat.number}
                </span>
                <div className="flex flex-col">
                  <span className="font-body text-xs" style={{ color: '#8B949E' }}>
                    {stat.label}
                  </span>
                  <span className="font-body text-xs" style={{ color: '#484F58' }}>
                    {stat.sublabel}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column — Skill Graph */}
        <motion.div
          variants={itemVariants}
          className="min-h-[400px] md:min-h-[500px] rounded-xl border p-4"
          style={{ borderColor: '#21262D', backgroundColor: 'rgba(13, 17, 23, 0.5)' }}
        >
          <SkillGraph />
        </motion.div>
      </motion.div>
    </section>
  );
}
