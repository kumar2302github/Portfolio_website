import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NeuralButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export default function NeuralButton({
  children,
  variant = 'primary',
  onClick,
  href,
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}: NeuralButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [focused, setFocused] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const rippleIdRef = useRef(0);

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  const accentColor = isPrimary ? '#E8C547' : isSecondary ? '#39D353' : '#39D353';
  const dimColor = isPrimary ? '#8B6914' : isSecondary ? '#1A3320' : '#484F58';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleMouseEnter = () => {
    if (!disabled) setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setActive(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setActive(true);

    // Create ripple from click point
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++rippleIdRef.current;
    setRipples((prev) => [...prev, { id, x, y }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  const handleMouseUp = () => {
    setActive(false);
  };

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    font-body font-medium rounded-lg
    transition-all duration-300 ease-out
    overflow-hidden
    ${!disabled && isPrimary ? 'hover-neural' : (!disabled ? 'hover-bioluminescent' : '')}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const getBackgroundColor = () => {
    if (isGhost) return 'transparent';
    if (hovered) return '#1C2128';
    return '#161B22';
  };

  const getBorderColor = () => {
    if (isGhost) return '#21262D';
    if (hovered) return accentColor;
    return '#21262D';
  };

  const getBoxShadow = () => {
    if (disabled) return 'none';
    if (active) {
      return isPrimary
        ? '0 0 20px #E8C54760'
        : isSecondary
          ? '0 0 20px #39D35360'
          : 'none';
    }
    // Hover box shadows are now handled by CSS animations
    return 'none';
  };

  const getTextColor = () => {
    if (hovered) return accentColor;
    return '#E6EDF3';
  };

  const microNodes = [
    { x: -8, y: -8 },
    { x: 'calc(100% + 4px)', y: -8 },
    { x: -8, y: 'calc(100% + 4px)' },
    { x: 'calc(100% + 4px)', y: 'calc(100% + 4px)' },
  ];

  const content = (
    <>
      {/* Micro-nodes */}
      {!disabled && microNodes.map((pos, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full transition-colors duration-300"
          style={{
            left: typeof pos.x === 'string' ? pos.x : `${pos.x + 8}px`,
            top: typeof pos.y === 'string' ? pos.y : `${pos.y + 8}px`,
            backgroundColor: hovered ? accentColor : dimColor,
          }}
        />
      ))}

      {/* SVG edge lines to micro-nodes */}
      {!disabled && hovered && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: 'visible' }}
        >
          {microNodes.map((pos, i) => (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={typeof pos.x === 'string' ? '100%' : '0%'}
              y2={typeof pos.y === 'string' ? '0%' : '100%'}
              stroke={accentColor}
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity={0.5}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="8"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          ))}
        </svg>
      )}

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <div key={ripple.id}>
            <motion.span
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                backgroundColor: isPrimary ? '#E8C547' : '#39D353',
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ width: 0, height: 0, opacity: 0.4 }}
              animate={{ width: 160, height: 160, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            {isPrimary && (
              <span 
                className="hit-neural-fire"
                style={{ left: ripple.x, top: ripple.y }}
              />
            )}
          </div>
        ))}
      </AnimatePresence>

      {/* Button text */}
      <span className="relative z-10">{children}</span>
    </>
  );

  const style: React.CSSProperties = {
    backgroundColor: getBackgroundColor(),
    border: `1px solid ${getBorderColor()}`,
    boxShadow: getBoxShadow(),
    color: getTextColor(),
    transform: active ? 'scale(1.04)' : 'scale(1)',
    outline: focused ? '2px solid #39D353' : 'none',
    outlineOffset: focused ? '3px' : '0',
  };

  if (href && !disabled) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={(e) => {
          if (href.startsWith('#')) {
            e.preventDefault();
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      className={baseClasses}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {content}
    </button>
  );
}
