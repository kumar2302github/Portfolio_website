import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 50);

    // Determine active section
    const sections = navLinks.map((link) => link.href.slice(1));
    let current = '';
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          current = section;
        }
      }
    }
    if (scrollY < 100) current = '';
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPropagationIntensity = (index: number): number => {
    if (hoveredIndex === null) return 0;
    const dist = Math.abs(index - hoveredIndex);
    if (dist === 0) return 1;
    if (dist === 1) return 0.3;
    if (dist === 2) return 0.15;
    return 0;
  };

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-bg-surface focus:text-text-primary focus:px-4 focus:py-2 focus:rounded-lg"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Skip to content
      </a>

      <nav
        className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 md:px-8 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(13, 17, 23, 0.6)' : 'rgba(13, 17, 23, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #21262D',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="font-display font-extrabold text-xl tracking-tight"
          style={{ color: '#39D353' }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          MK
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.slice(1);
            const propagation = getPropagationIntensity(index);

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative font-body text-sm transition-colors duration-200 py-1"
                style={{
                  color: isActive
                    ? '#E6EDF3'
                    : propagation > 0
                      ? `rgba(230, 237, 243, ${0.55 + propagation * 0.45})`
                      : '#8B949E',
                }}
              >
                {/* Active dot */}
                {isActive && (
                  <motion.span
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#39D353' }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {link.label}

                {/* Hover underline */}
                <motion.span
                  className="absolute bottom-0 left-0 h-px"
                  style={{ backgroundColor: '#E8C547' }}
                  initial={{ width: '0%' }}
                  animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                  transition={{ duration: 0.2 }}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative w-6 h-5 flex flex-col justify-between"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="block w-full h-0.5 bg-text-primary origin-center"
            animate={mobileOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-full h-0.5 bg-text-primary"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-full h-0.5 bg-text-primary origin-center"
            animate={mobileOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: 'rgba(13, 17, 23, 0.95)' }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                className="font-display text-2xl font-bold"
                style={{ color: '#E6EDF3' }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
