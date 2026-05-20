import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Brain, Cpu, Database, ChevronRight, Terminal, Award, Layers } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: 'root' | 'branch' | 'leaf';
  x: number;
  y: number;
  parentId?: string;
  proficiency?: string;
  tools?: string[];
  description?: string;
}

const skillNodes: SkillNode[] = [
  {
    id: 'root',
    name: 'Core',
    category: 'root',
    x: 80,
    y: 300,
    description: "Manish Kumar's foundational data engineering and computer science background, branching into AI domains.",
  },
  // BRANCHES
  {
    id: 'gen_ai',
    name: 'Generative AI',
    category: 'branch',
    parentId: 'root',
    x: 340,
    y: 140,
    proficiency: 'Advanced',
    tools: ['Llama 3', 'Gemini API', 'Claude API', 'GPT-4o', 'DeepSeek-R1', 'Groq LPU'],
    description: 'Expertise in Retrieval-Augmented Generation (RAG), LangGraph multi-agent systems, parameter-efficient fine-tuning, and prompt architectures.',
  },
  {
    id: 'deep_learning',
    name: 'Deep Learning',
    category: 'branch',
    parentId: 'root',
    x: 340,
    y: 300,
    proficiency: 'Advanced',
    tools: ['PyTorch', 'Hugging Face', 'BERT', 'LayoutLMv3', 'CNN / LSTM'],
    description: 'Building, fine-tuning, and deploying deep neural networks for computer vision, optical character recognition, and sequence classification.',
  },
  {
    id: 'ml_core',
    name: 'ML & Core Tech',
    category: 'branch',
    parentId: 'root',
    x: 340,
    y: 460,
    proficiency: 'Advanced',
    tools: ['Python', 'SQL', 'Scikit-Learn', 'FastAPI', 'Docker', 'Git'],
    description: 'Strong foundations in data analytics, database schemas, classical statistical learning, REST API services, and clean software engineering.',
  },
  // GEN AI LEAVES
  {
    id: 'rag',
    name: 'RAG Systems',
    category: 'leaf',
    parentId: 'gen_ai',
    x: 660,
    y: 50,
    proficiency: 'Advanced',
    tools: ['LangChain', 'Vector Databases', 'Hybrid Retrieval', 'Advanced Chunking'],
    description: 'Engineered robust vector search architectures, including high-scale YouTube transcript question-answering engines and local offline documentation groundings.',
  },
  {
    id: 'agentic',
    name: 'Agentic Workflows',
    category: 'leaf',
    parentId: 'gen_ai',
    x: 660,
    y: 110,
    proficiency: 'Advanced',
    tools: ['LangGraph', 'State Graphs', 'Tool Calling', 'SQL Agents'],
    description: 'Designed context-aware multi-agent conditional routers and a drag-and-drop workflow visualizer for IoT code generation.',
  },
  {
    id: 'finetuning',
    name: 'LLM Fine-tuning',
    category: 'leaf',
    parentId: 'gen_ai',
    x: 660,
    y: 170,
    proficiency: 'Advanced',
    tools: ['PEFT / LoRA', 'BERT Adaptation', 'LayoutLMv3 Training'],
    description: 'Experienced in domain adaptation, fine-tuning LayoutLMv3 for invoice intelligence and BERT for highly-accurate sequence categorization.',
  },
  {
    id: 'prompt',
    name: 'Prompt Engineering',
    category: 'leaf',
    parentId: 'gen_ai',
    x: 660,
    y: 230,
    proficiency: 'Advanced',
    tools: ['Few-Shot Learning', 'Chain-of-Thought', 'Prompt Evaluation'],
    description: 'Certified in Prompt Engineering by DeepLearning.ai. Focuses on minimizing model hallucination and standardizing parser outputs.',
  },
  // DEEP LEARNING LEAVES
  {
    id: 'pytorch',
    name: 'PyTorch & Transformers',
    category: 'leaf',
    parentId: 'deep_learning',
    x: 660,
    y: 290,
    proficiency: 'Advanced',
    tools: ['PyTorch', 'HF Transformers', 'TensorBoard', 'Transfer Learning'],
    description: 'Primary deep learning frame. Proficient in custom model building, attention mechanisms, weight checkpoints, and validation splits.',
  },
  {
    id: 'nlp',
    name: 'NLP Systems',
    category: 'leaf',
    parentId: 'deep_learning',
    x: 660,
    y: 350,
    proficiency: 'Advanced',
    tools: ['NER', 'Semantic Search', 'Text Classification', 'Word Embeddings'],
    description: 'Built privacy-first PII masking models and document classifiers utilizing embeddings and custom transformer pipelines (~99% classification accuracy).',
  },
  {
    id: 'cv',
    name: 'Computer Vision',
    category: 'leaf',
    parentId: 'deep_learning',
    x: 660,
    y: 410,
    proficiency: 'Intermediate-Advanced',
    tools: ['OpenCV', 'Tesseract OCR', 'LayoutLMv3', 'Image Processing'],
    description: 'Multimodal document layouts (LayoutLMv3 structured invoice extractor at ~90% accuracy), OCR processing pipelines, and facial expression classification.',
  },
  // ML CORE LEAVES
  {
    id: 'classic_ml',
    name: 'Classical ML',
    category: 'leaf',
    parentId: 'ml_core',
    x: 660,
    y: 470,
    proficiency: 'Advanced',
    tools: ['Scikit-Learn', 'Ensemble Models', 'Feature Selection', 'Clustering'],
    description: 'Expertise in statistical analysis, model fitting (Random Forests, Gradient Boosting), cross-validation, and performance curves.',
  },
  {
    id: 'coding_sql',
    name: 'Python & SQL Core',
    category: 'leaf',
    parentId: 'ml_core',
    x: 660,
    y: 530,
    proficiency: 'Advanced',
    tools: ['Python', 'MySQL', 'C++', 'Data Normalization'],
    description: 'Production scripting, database design, query optimization, and memory-efficient data preprocessing structures.',
  },
  {
    id: 'api_deploy',
    name: 'APIs & Docker',
    category: 'leaf',
    parentId: 'ml_core',
    x: 660,
    y: 590,
    proficiency: 'Intermediate',
    tools: ['FastAPI', 'Docker', 'Streamlit', 'Git Versioning'],
    description: 'Wrapping machine learning models in robust endpoints, building configuration files, containerization, and Streamlit dashboard prototyping.',
  },
];

export default function SkillTree() {
  const isMobile = useIsMobile();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMobileBranch, setSelectedMobileBranch] = useState<string>('gen_ai');

  const activeNode = skillNodes.find((n) => n.id === (hoveredId || 'root')) || skillNodes[0];

  const isNodeActive = (nodeId: string) => {
    if (!hoveredId) return false;
    if (hoveredId === nodeId) return true;

    const hoveredNode = skillNodes.find((n) => n.id === hoveredId);
    const node = skillNodes.find((n) => n.id === nodeId);

    if (!hoveredNode || !node) return false;

    if (hoveredNode.category === 'leaf') {
      if (nodeId === 'root') return true;
      if (nodeId === hoveredNode.parentId) return true;
    }

    if (hoveredNode.category === 'branch') {
      if (nodeId === 'root') return true;
      if (node.parentId === hoveredId) return true;
    }

    if (hoveredId === 'root') return true;

    return false;
  };

  const isLinkActive = (sourceId: string, targetId: string) => {
    if (!hoveredId) return false;
    if (hoveredId === 'root') return true;

    if (hoveredId === sourceId || hoveredId === targetId) return true;

    const hoveredNode = skillNodes.find((n) => n.id === hoveredId);
    if (!hoveredNode) return false;

    if (hoveredNode.category === 'leaf') {
      if (sourceId === 'root' && targetId === hoveredNode.parentId) return true;
      if (sourceId === hoveredNode.parentId && targetId === hoveredId) return true;
    }

    return false;
  };

  // Helper to draw curvy Bezier links
  const drawBezier = (x1: number, y1: number, x2: number, y2: number) => {
    const cpX1 = (x1 + x2) / 2;
    const cpY1 = y1;
    const cpX2 = (x1 + x2) / 2;
    const cpY2 = y2;
    return `M ${x1} ${y1} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`;
  };

  // Render Desktop Layout (SVG Interactive Tree)
  const renderDesktop = () => {
    return (
      <div className="grid grid-cols-[1.5fr_1fr] gap-8 items-stretch h-[650px]">
        {/* SVG Visualization Column */}
        <div
          className="relative rounded-xl border overflow-hidden flex items-center justify-center p-2"
          style={{ borderColor: '#21262D', backgroundColor: 'rgba(13, 17, 23, 0.4)' }}
        >
          {/* Bioluminescent canvas particles/grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#161b22_1px,transparent_1px),linear-gradient(to_bottom,#161b22_1px,transparent_1px)] bg-[size:40px_40px] opacity-15" />

          <svg
            className="w-full h-full relative"
            viewBox="0 0 850 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Filters for Glow */}
            <defs>
              <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connecting Lines */}
            {skillNodes.map((node) => {
              if (!node.parentId) return null;
              const parent = skillNodes.find((n) => n.id === node.parentId);
              if (!parent) return null;

              const active = isLinkActive(parent.id, node.id);

              return (
                <g key={`link-${node.id}`}>
                  {/* Background link path */}
                  <path
                    d={drawBezier(parent.x, parent.y, node.x, node.y)}
                    stroke={active ? '#2EA043' : '#1A3320'}
                    strokeWidth={active ? 2.5 : 1.5}
                    className="transition-colors duration-300"
                    style={{
                      opacity: active ? 0.9 : 0.4,
                      filter: active ? 'url(#glow-green)' : 'none',
                    }}
                  />
                  {/* Glowing dynamic pulse running on active path */}
                  {active && (
                    <path
                      d={drawBezier(parent.x, parent.y, node.x, node.y)}
                      stroke="#39D353"
                      strokeWidth={3}
                      strokeDasharray="15 60"
                      className="animate-pulse"
                      style={{
                        animation: 'dash 2.5s linear infinite',
                      }}
                    />
                  )}
                </g>
              );
            })}

            {/* SVG Nodes */}
            {skillNodes.map((node) => {
              const active = isNodeActive(node.id) || hoveredId === node.id;
              const isRoot = node.category === 'root';
              const isBranch = node.category === 'branch';

              let r = 8;
              let fill = '#161B22';
              let stroke = '#21262D';
              let hoverStroke = '#39D353';

              if (isRoot) {
                r = 18;
                fill = '#0D1117';
                stroke = '#30363D';
                hoverStroke = '#39D353';
              } else if (isBranch) {
                r = 12;
                fill = '#161B22';
                stroke = '#30363D';
                hoverStroke = '#E8C547';
              }

              return (
                <motion.g
                  key={`node-${node.id}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {/* Glow circle overlay */}
                  {active && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r + 6}
                      fill="transparent"
                      stroke={isBranch ? '#E8C547' : '#39D353'}
                      strokeWidth={1.5}
                      className="opacity-40 animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                  )}

                  {/* Base Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r}
                    fill={active ? (isBranch ? '#282F30' : '#1F2E23') : fill}
                    stroke={active ? hoverStroke : stroke}
                    strokeWidth={active ? 2.5 : 1.5}
                    className="transition-all duration-300"
                    style={{
                      filter: active ? (isBranch ? 'url(#glow-gold)' : 'url(#glow-green)') : 'none',
                    }}
                  />

                  {/* Labels */}
                  <text
                    x={isRoot ? node.x : node.x + (isBranch ? -18 : 16)}
                    y={node.y + 4}
                    textAnchor={isRoot ? 'middle' : isBranch ? 'end' : 'start'}
                    className="font-mono font-medium tracking-wide pointer-events-none select-none transition-colors duration-300"
                    style={{
                      fontSize: isRoot ? '12px' : isBranch ? '11px' : '10px',
                      fill: active ? '#F0F6FC' : '#8B949E',
                    }}
                  >
                    {node.name}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Detailed Inspector Panel Column */}
        <div
          className="rounded-xl border p-6 flex flex-col justify-between"
          style={{ borderColor: '#21262D', backgroundColor: 'rgba(13, 17, 23, 0.3)', backdropFilter: 'blur(8px)' }}
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 border-b pb-4" style={{ borderColor: '#21262D' }}>
              <Terminal size={16} className="text-gray-500" />
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                Node Inspector v2.0
              </span>
            </div>

            {/* Content Body */}
            <div className="mt-6 flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl tracking-tight text-white">
                    {activeNode.name}
                  </h3>
                  <span className="font-mono text-xs text-gray-400 capitalize">
                    Category: {activeNode.category === 'root' ? 'Core Hub' : activeNode.category === 'branch' ? 'Skill Branch' : 'Domain Skill'}
                  </span>
                </div>

                {activeNode.proficiency && (
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono tracking-wider"
                    style={{
                      borderColor: activeNode.id === 'gen_ai' || activeNode.parentId === 'gen_ai' ? 'rgba(232, 197, 71, 0.2)' : 'rgba(57, 211, 83, 0.2)',
                      color: activeNode.id === 'gen_ai' || activeNode.parentId === 'gen_ai' ? '#E8C547' : '#39D353',
                      backgroundColor: activeNode.id === 'gen_ai' || activeNode.parentId === 'gen_ai' ? 'rgba(232, 197, 71, 0.05)' : 'rgba(57, 211, 83, 0.05)',
                    }}
                  >
                    <Award size={12} />
                    {activeNode.proficiency}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="font-body text-[14px] leading-relaxed text-gray-400">
                {activeNode.description}
              </p>

              {/* Tools & Frameworks */}
              {activeNode.tools && activeNode.tools.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                  <span className="font-mono text-[11px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Cpu size={12} />
                    Compiled Toolstack
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {activeNode.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-xs px-2.5 py-1 rounded border text-gray-300"
                        style={{
                          borderColor: '#21262D',
                          backgroundColor: 'rgba(22, 27, 34, 0.4)',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div
            className="pt-4 border-t border-dashed"
            style={{ borderColor: '#21262D' }}
          >
            <p className="font-mono text-[10px] text-gray-500 leading-normal">
              {hoveredId
                ? `Active Node: ${hoveredId.toUpperCase()} // Hover root to reset inspector.`
                : "💡 Hover over any node in the left neural tree to trace links and pull technical specifics."}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render Mobile Layout (Collapsible list tree)
  const renderMobile = () => {
    const branches = skillNodes.filter((n) => n.category === 'branch');
    const leafNodes = skillNodes.filter((n) => n.parentId === selectedMobileBranch);
    const selectedBranchNode = skillNodes.find((n) => n.id === selectedMobileBranch);

    return (
      <div className="flex flex-col gap-6">
        {/* Branch selectors (Generative AI, Deep Learning, ML Core) */}
        <div className="grid grid-cols-3 gap-2">
          {branches.map((branch) => {
            const isSelected = selectedMobileBranch === branch.id;
            let themeColor = '#39D353';
            let bgGlow = 'rgba(57, 211, 83, 0.05)';
            if (branch.id === 'gen_ai') {
              themeColor = '#E8C547';
              bgGlow = 'rgba(232, 197, 71, 0.05)';
            }

            return (
              <button
                key={branch.id}
                onClick={() => setSelectedMobileBranch(branch.id)}
                className="font-mono text-[10px] py-2.5 px-2 rounded-lg border text-center transition-all duration-300 font-bold tracking-wider flex flex-col items-center gap-1"
                style={{
                  borderColor: isSelected ? themeColor : '#21262D',
                  color: isSelected ? '#F0F6FC' : '#8B949E',
                  backgroundColor: isSelected ? bgGlow : 'rgba(22, 27, 34, 0.2)',
                }}
              >
                {branch.id === 'gen_ai' ? <Brain size={14} style={{ color: themeColor }} /> : branch.id === 'deep_learning' ? <Layers size={14} style={{ color: themeColor }} /> : <Database size={14} style={{ color: themeColor }} />}
                {branch.name}
              </button>
            );
          })}
        </div>

        {/* Selected Branch Overview */}
        {selectedBranchNode && (
          <div
            className="rounded-lg border p-4"
            style={{ borderColor: '#21262D', backgroundColor: 'rgba(22, 27, 34, 0.3)' }}
          >
            <h3 className="font-display font-bold text-[16px] text-white flex items-center gap-2">
              <ChevronRight size={14} className="text-gray-500" />
              {selectedBranchNode.name}
            </h3>
            <p className="font-body text-xs text-gray-400 mt-2 leading-relaxed">
              {selectedBranchNode.description}
            </p>
          </div>
        )}

        {/* Leaves (Detailed items list) */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            Branch nodes & tools
          </span>
          <div className="flex flex-col gap-3">
            {leafNodes.map((leaf) => (
              <motion.div
                key={leaf.id}
                className="rounded-lg border p-4 flex flex-col gap-2.5"
                style={{ borderColor: '#21262D', backgroundColor: 'rgba(13, 17, 23, 0.4)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-white tracking-wide">
                    {leaf.name}
                  </span>
                  {leaf.proficiency && (
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 rounded-full border tracking-wide font-bold"
                      style={{
                        borderColor: selectedMobileBranch === 'gen_ai' ? 'rgba(232, 197, 71, 0.3)' : 'rgba(57, 211, 83, 0.3)',
                        color: selectedMobileBranch === 'gen_ai' ? '#E8C547' : '#39D353',
                        backgroundColor: selectedMobileBranch === 'gen_ai' ? 'rgba(232, 197, 71, 0.05)' : 'rgba(57, 211, 83, 0.05)',
                      }}
                    >
                      {leaf.proficiency}
                    </span>
                  )}
                </div>

                <p className="font-body text-xs text-gray-400 leading-relaxed">
                  {leaf.description}
                </p>

                {leaf.tools && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {leaf.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-[9px] px-2 py-0.5 rounded border text-gray-400"
                        style={{
                          borderColor: '#21262D',
                          backgroundColor: 'rgba(22, 27, 34, 0.4)',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full relative">
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -75;
          }
        }
      `}</style>
      {isMobile ? renderMobile() : renderDesktop()}
    </div>
  );
}
