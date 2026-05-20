import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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

const TerminalView = () => {
  const [activeTab, setActiveTab] = useState<'identity' | 'philosophy' | 'interests'>('identity');

  return (
    <div className="w-full h-full flex flex-col font-mono text-xs rounded-xl overflow-hidden border" style={{ borderColor: '#21262D', backgroundColor: 'rgba(13, 17, 23, 0.4)' }}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b" style={{ borderColor: '#21262D' }}>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-[11px] text-gray-500 font-mono">manish_profile.sh</span>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: '#21262D', backgroundColor: 'rgba(9, 13, 19, 0.6)' }}>
        {[
          { id: 'identity', label: 'identity.json' },
          { id: 'philosophy', label: 'philosophy.sh' },
          { id: 'interests', label: 'interests.py' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="px-4 py-2.5 border-r text-[11px] font-mono transition-colors"
            style={{
              borderColor: '#21262D',
              backgroundColor: activeTab === tab.id ? '#0D1117' : 'transparent',
              color: activeTab === tab.id ? '#E6EDF3' : '#8B949E'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 overflow-y-auto leading-relaxed text-left text-gray-300 min-h-[300px]">
        {activeTab === 'identity' && (
          <div>
            <p className="text-gray-500"># Query user profile details</p>
            <p className="text-[#39D353]">manish@mycelium:~$ <span className="text-white">cat identity.json</span></p>
            <pre className="mt-2 text-[#7EE787] font-mono text-[11px]">
{`{
  "name": "Manish Kumar",
  "role": "AI Engineer & Data Scientist",
  "education": "B.Tech CSE, BCE Bhagalpur",
  "grad_year": 2025,
  "cgpa": "7.74/10",
  "location": "Bihar, India",
  "email": "krmanish2302@gmail.com"
}`}
            </pre>
          </div>
        )}

        {activeTab === 'philosophy' && (
          <div>
            <p className="text-gray-500"># Execute personal motto script</p>
            <p className="text-[#39D353]">manish@mycelium:~$ <span className="text-white">./philosophy.sh</span></p>
            <p className="mt-2 text-[#E8C547] font-bold">
              "Learning by building. Building by solving."
            </p>
            <p className="mt-4 text-gray-400 font-body text-xs leading-relaxed">
              I believe that theory is grounded through code. True understanding lies in building robust pipelines that solve real, messy domain problems—not just clean academic ones.
            </p>
          </div>
        )}

        {activeTab === 'interests' && (
          <div>
            <p className="text-gray-500"># Inspect secondary clusters</p>
            <p className="text-[#39D353]">manish@mycelium:~$ <span className="text-white">python interests.py</span></p>
            <pre className="mt-2 text-[#79C0FF] font-mono text-[11px]">
{`class ManishKumar:
    def __init__(self):
        self.leadership = "Head Coordinator @ ESROS"
        self.achievements = "Top 25 Startup Bihar Idea"
        self.passions = [
            "Hardware-Software integration",
            "Bioluminescent networks",
            "Open-source GenAI tooling"
        ]`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

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

        {/* Right Column — Terminal View */}
        <motion.div
          variants={itemVariants}
          className="min-h-[400px] md:min-h-[500px] rounded-xl overflow-hidden"
        >
          <TerminalView />
        </motion.div>
      </motion.div>
    </section>
  );
}
