import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/projects';
import NeuralButton from './NeuralButton';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  const statusColor = project.status === 'complete' ? '#39D353' : '#E8C547';

  return (
    <>
      {/* Card */}
      <motion.article
        className="w-full break-inside-avoid mb-5 rounded-xl p-6 cursor-pointer transition-all duration-200 hover-bioluminescent"
        style={{
          backgroundColor: '#161B22',
          border: '1px solid #21262D',
        }}
        onClick={() => setExpanded(true)}
        layout
      >
        {/* Top row: status + date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColor }}
            />
            <span className="font-mono text-[11px]" style={{ color: '#484F58' }}>
              {project.status}
            </span>
          </div>
          <span className="font-mono text-[11px]" style={{ color: '#484F58' }}>
            {project.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-semibold text-[1.1rem] mb-2"
          style={{ color: '#E6EDF3' }}
        >
          {project.title}
        </h3>

        {/* Summary */}
        <p
          className="font-body text-sm mb-3 line-clamp-2"
          style={{ color: '#8B949E' }}
        >
          {project.summary}
        </p>

        {/* Highlight badge */}
        <div
          className="inline-flex items-center px-2.5 py-1 rounded-full mb-4 border"
          style={{
            backgroundColor: '#39D35315',
            borderColor: '#39D35340',
          }}
        >
          <span className="font-mono text-[11px]" style={{ color: '#39D353' }}>
            {project.highlight}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 rounded"
              style={{
                backgroundColor: '#1C2128',
                border: '1px solid #21262D',
                color: '#8B949E',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand button */}
        <div className="flex justify-end">
          <NeuralButton
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(true)}
          >
            Expand →
          </NeuralButton>
        </div>
      </motion.article>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setExpanded(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Expanded card */}
            <motion.div
              className="relative w-full max-w-[720px] max-h-[80vh] overflow-y-auto custom-scrollbar rounded-xl p-6 md:p-8"
              style={{
                backgroundColor: '#161B22',
                border: '1px solid #21262D',
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: '#161B22',
                  border: '1px solid #21262D',
                  color: '#8B949E',
                }}
                aria-label="Close"
              >
                ✕
              </button>

              {/* Top row */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: statusColor }}
                />
                <span className="font-mono text-xs" style={{ color: '#484F58' }}>
                  {project.status} · {project.date}
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-display font-bold text-2xl mb-2"
                style={{ color: '#E6EDF3' }}
              >
                {project.title}
              </h2>

              {/* Highlight */}
              <div
                className="inline-flex items-center px-3 py-1 rounded-full mb-4 border"
                style={{
                  backgroundColor: '#39D35315',
                  borderColor: '#39D35340',
                }}
              >
                <span className="font-mono text-xs" style={{ color: '#39D353' }}>
                  {project.highlight}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-1 rounded"
                    style={{
                      backgroundColor: '#1C2128',
                      border: '1px solid #21262D',
                      color: '#8B949E',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub link */}
              {project.github && (
                <div className="mb-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm inline-flex items-center gap-2 transition-colors duration-200"
                    style={{ color: '#39D353' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View on GitHub →
                  </a>
                </div>
              )}

              {/* Case study body */}
              <div
                className="prose-mycelium"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(project.body) }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Simple markdown renderer for the case study body
function renderMarkdown(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^\*\*(.+?)\*\*$/gm, '<h3>$1</h3>')
    .replace(/^\* \*\*(.+?)\*\*:?\s*(.+)$/gm, '<li><strong>$1</strong>: $2</li>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/^(?!<[hl]|<li)(.+)$/gm, '<p>$1</p>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
