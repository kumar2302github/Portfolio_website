import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/lib/projects';

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

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="projects"
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
            {'//'} projects.network
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-display font-bold text-2xl md:text-[2rem] mb-2"
            style={{ color: '#E6EDF3' }}
          >
            What I've Built
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body text-sm"
            style={{ color: '#8B949E' }}
          >
            Each project is a node. Click to expand the full case study.
          </motion.p>
        </div>

        {/* Masonry grid */}
        <motion.div
          variants={itemVariants}
          className="columns-1 sm:columns-2 lg:columns-3 gap-5"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
