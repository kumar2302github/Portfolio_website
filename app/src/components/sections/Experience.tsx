import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
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

interface TimelineEntry {
  title: string;
  subtitle?: string;
  role: string;
  duration: string;
  type: string;
  location?: string;
  institution?: string;
  achievements: string[];
  cgpa?: string;
  notable?: string;
}

const entries: TimelineEntry[] = [
  {
    title: 'Arishna IOT Solutions',
    role: 'Generative AI Intern',
    duration: 'Jun 2025 – Dec 2025',
    type: 'Full-time Internship',
    location: 'Remote',
    achievements: [
      'Built RAG system grounded on official hardware documentation to fix LLM code generation inaccuracies for specialized microcontrollers',
      'Developed drag-and-drop conversational interface with LangGraph + FastAPI + Gemini API → ~50% programming time reduction',
      'Performed EDA to optimize document ingestion pipeline',
    ],
  },
  {
    title: 'Freelance',
    subtitle: 'Junior AI Developer',
    role: 'Junior AI Developer',
    duration: 'Jun 2024 – Present',
    type: 'Freelance',
    location: 'Remote',
    achievements: [
      'Privacy-centric legal document analysis platform: PII anonymization (fine-tuned BERT) + RAG → 60%+ reduction in manual review time',
      'Schema-driven key information extraction using Large Multimodal Models (LMMs) for structured data from diverse document types',
      'Invoice processing automation with fine-tuned LayoutLMv3 → ~90% extraction accuracy, 40% less manual data entry',
    ],
  },
  {
    title: 'ESROS Robotics Club',
    role: 'Head Coordinator → Assistant Coordinator',
    duration: 'Oct 2023 – Jun 2025',
    type: 'Leadership',
    institution: 'Bhagalpur College of Engineering',
    achievements: [
      'Led robotics club as Head Coordinator (Sep 2024 – Jun 2025)',
      'Served as Assistant Coordinator (Oct 2023 – Aug 2024)',
      '2nd position, Smart India (Internal) Hackathon',
      '2nd position, Inter-College Robotics Competition',
    ],
  },
  {
    title: 'Bhagalpur College of Engineering',
    role: 'B.Tech, Computer Science & Engineering',
    duration: '2021 – 2025',
    type: 'Education',
    cgpa: '7.74 / 10.0',
    notable: 'Top 25 Startup Idea, Startup Bihar Innovation Challenge',
    achievements: [
      'B.Tech in Computer Science & Engineering',
      'CGPA: 7.74 / 10.0',
      'Top 25 Startup Idea, Startup Bihar Innovation Challenge',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="experience"
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
            {'//'} experience.timeline
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-display font-bold text-2xl md:text-[2rem]"
            style={{ color: '#E6EDF3' }}
          >
            Where I've Worked
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central spine - desktop: center, mobile: left 20px */}
          <div
            className="absolute top-0 bottom-0 w-0.5 md:left-1/2 md:-translate-x-1/2 left-5"
            style={{ backgroundColor: '#1A3320' }}
          />

          {/* Timeline entries */}
          <div className="flex flex-col gap-12 md:gap-16">
            {entries.map((entry, index) => (
              <TimelineNode
                key={entry.title}
                entry={entry}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TimelineNode({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const nodeInView = useInView(nodeRef, { once: true, amount: 0.5 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={nodeRef}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content card - desktop: 45% width, mobile: full width with left margin */}
      <motion.div
        className={`md:w-[45%] pl-14 md:pl-0 ${
          isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
        }`}
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        animate={nodeInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        <div
          className="rounded-xl p-5 border"
          style={{
            backgroundColor: '#161B22',
            borderColor: '#21262D',
          }}
        >
          {/* Role / Title */}
          <h3
            className="font-display font-semibold text-lg mb-1"
            style={{ color: '#E6EDF3' }}
          >
            {entry.title}
          </h3>

          {/* Subtitle / Institution */}
          {entry.institution && (
            <p className="font-body text-xs mb-1" style={{ color: '#8B949E' }}>
              {entry.institution}
            </p>
          )}

          {/* Role */}
          <p className="font-body text-sm mb-1" style={{ color: '#E6EDF3' }}>
            {entry.role}
          </p>

          {/* Duration + Type */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="font-mono text-[11px]" style={{ color: '#39D353' }}>
              {entry.duration}
            </span>
            <span className="font-mono text-[11px]" style={{ color: '#484F58' }}>
              ·
            </span>
            <span className="font-mono text-[11px]" style={{ color: '#484F58' }}>
              {entry.type}
            </span>
            {entry.location && (
              <>
                <span className="font-mono text-[11px]" style={{ color: '#484F58' }}>
                  ·
                </span>
                <span className="font-mono text-[11px]" style={{ color: '#484F58' }}>
                  {entry.location}
                </span>
              </>
            )}
          </div>

          {/* Achievements */}
          <ul className="flex flex-col gap-2">
            {entry.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#39D353' }}
                />
                <span className="font-body text-sm" style={{ color: '#8B949E' }}>
                  {achievement}
                </span>
              </li>
            ))}
          </ul>

          {/* CGPA / Notable */}
          {entry.cgpa && (
            <div
              className="mt-3 pt-3 border-t"
              style={{ borderColor: '#21262D' }}
            >
              <span className="font-mono text-xs" style={{ color: '#8B949E' }}>
                CGPA: {entry.cgpa}
              </span>
              {entry.notable && (
                <p className="font-body text-xs mt-1" style={{ color: '#39D353' }}>
                  🏆 {entry.notable}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Center node */}
      <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2">
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={nodeInView ? { scale: 1 } : {}}
          transition={{
            duration: 0.3,
            delay: index * 0.15,
            type: 'spring',
            stiffness: 300,
          }}
        >
          {/* Glowing thread connecting node to card */}
          <motion.div
            className="absolute top-2 h-0.5 hidden md:block"
            style={{
              backgroundColor: '#39D353',
              width: '48px',
              left: isEven ? '8px' : 'auto',
              right: isEven ? 'auto' : '8px',
              opacity: 0.4,
            }}
            initial={{ scaleX: 0 }}
            animate={nodeInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
          />

          {/* Node circle */}
          <motion.div
            className="w-4 h-4 rounded-full border-2"
            style={{
              backgroundColor: '#161B22',
              borderColor: '#39D353',
            }}
            animate={
              nodeInView
                ? {
                    boxShadow: [
                      '0 0 0 0 rgba(57, 211, 83, 0)',
                      '0 0 0 8px rgba(57, 211, 83, 0.3)',
                      '0 0 0 0 rgba(57, 211, 83, 0)',
                    ],
                  }
                : {}
            }
            transition={{
              duration: 1,
              delay: index * 0.15 + 0.3,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
