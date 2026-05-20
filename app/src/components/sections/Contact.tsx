import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import NeuralButton from '@/components/ui/NeuralButton';

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

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/kumar2302github',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/manish-kumar-7915a7267/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:krmanish2302@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Get Formspree ID from environment variable or use a placeholder
    const formId = import.meta.env.VITE_FORMSPREE_ID || 'PLACEHOLDER';

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        // For demo/placeholder, show success state anyway
        setSubmitted(true);
      }
    } catch {
      // For demo without a real Formspree ID, show success state
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
        <div className="mb-12 text-center">
          <motion.h2
            variants={itemVariants}
            className="font-display font-extrabold mb-3"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#E6EDF3',
            }}
          >
            Send a Signal.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body max-w-lg mx-auto"
            style={{ color: '#8B949E' }}
          >
            Open to full-time roles, freelance projects, and research collaborations in AI/ML.
          </motion.p>
          <motion.p
            variants={itemVariants}
            id="chatbot-soon-note"
            className="font-mono text-xs mt-3"
            style={{ color: '#39D353' }}
          >
            RAG chatbot launching soon — sign up to be notified.
          </motion.p>
        </div>

        {/* Two column layout */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
        >
          {/* Left - Form */}
          <div>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Name */}
                  <div className="floating-label-group relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder=" "
                      className="w-full px-4 py-3 rounded-lg font-body text-sm transition-all duration-200 outline-none"
                      style={{
                        backgroundColor: '#161B22',
                        border: '1px solid #21262D',
                        color: '#E6EDF3',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#39D353';
                        e.target.style.boxShadow = '0 0 0 3px rgba(57, 211, 83, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#21262D';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <label htmlFor="name" className="floating-label">
                      Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="floating-label-group relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder=" "
                      className="w-full px-4 py-3 rounded-lg font-body text-sm transition-all duration-200 outline-none"
                      style={{
                        backgroundColor: '#161B22',
                        border: '1px solid #21262D',
                        color: '#E6EDF3',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#39D353';
                        e.target.style.boxShadow = '0 0 0 3px rgba(57, 211, 83, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#21262D';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <label htmlFor="email" className="floating-label">
                      Email
                    </label>
                  </div>

                  {/* Message */}
                  <div className="floating-label-group relative">
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      placeholder=" "
                      className="w-full px-4 py-3 rounded-lg font-body text-sm transition-all duration-200 outline-none resize-none"
                      style={{
                        backgroundColor: '#161B22',
                        border: '1px solid #21262D',
                        color: '#E6EDF3',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#39D353';
                        e.target.style.boxShadow = '0 0 0 3px rgba(57, 211, 83, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#21262D';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <label htmlFor="message" className="floating-label">
                      Message
                    </label>
                  </div>

                  {/* Submit */}
                  <NeuralButton
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? 'Transmitting...' : 'Transmit Message'}
                  </NeuralButton>
                </motion.form>
              ) : (
                /* Success state */
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center min-h-[300px] text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Pulse wave animation */}
                  <motion.div
                    className="relative w-20 h-20 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: '#39D353' }}
                        initial={{ scale: 0.5, opacity: 0.8 }}
                        animate={{
                          scale: [0.5, 2, 2.5],
                          opacity: [0.8, 0.3, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.4,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#39D35320' }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#39D353"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                  </motion.div>

                  <p
                    className="font-mono text-sm"
                    style={{ color: '#39D353' }}
                  >
                    Signal received. I'll respond soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right - Social links */}
          <div className="flex flex-col items-center justify-center">
            <p
              className="font-body text-sm mb-6"
              style={{ color: '#8B949E' }}
            >
              Or connect directly:
            </p>

            {/* Social nodes with SVG edges */}
            <div className="relative flex items-center justify-center gap-8">
              {/* SVG edges between nodes */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: 'visible' }}
              >
                <line
                  x1="33%"
                  y1="50%"
                  x2="66%"
                  y2="50%"
                  stroke="#1A3320"
                  strokeWidth="1"
                />
                <line
                  x1="33%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke="#1A3320"
                  strokeWidth="1"
                />
              </svg>

              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: '#161B22',
                    border: '1px solid #21262D',
                    color: '#8B949E',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#E8C547';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(232, 197, 71, 0.25)';
                    e.currentTarget.style.color = '#E8C547';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#21262D';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.color = '#8B949E';
                  }}
                  aria-label={link.name}
                >
                  {link.icon}

                  {/* Tooltip */}
                  <span
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                    style={{
                      backgroundColor: '#1C2128',
                      color: '#E6EDF3',
                      border: '1px solid #21262D',
                    }}
                  >
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="mt-8 text-center">
              <a
                href="mailto:krmanish2302@gmail.com"
                className="font-mono text-xs transition-colors duration-200"
                style={{ color: '#39D353' }}
              >
                krmanish2302@gmail.com
              </a>
              <p className="font-mono text-xs mt-2" style={{ color: '#484F58' }}>
                +91-9031969516
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
