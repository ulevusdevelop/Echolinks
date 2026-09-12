import React, { useEffect, useRef, useState, ReactNode } from 'react';

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** 'up' fades and slides up (default) — matches the edit doc's "fly-in
      from the bottom" / "float up" language used for the Hero and
      Section 2. 'fade' is a plain opacity fade with no movement. */
  variant?: 'up' | 'fade';
  delayMs?: number;
};

// Dependency-free scroll-reveal, used across the edit doc's several
// "add motion" / "fly-in from the bottom" / "float up" requirements
// (Homepage item 1, item 2, Traceability Page item 4). No animation
// library is installed in this project, so this uses a plain
// IntersectionObserver + CSS transition instead of pulling in
// framer-motion for what's a small, repeated need.
export const RevealOnScroll = ({
  children,
  className = '',
  variant = 'up',
  delayMs = 0,
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : variant === 'up'
          ? 'opacity-0 translate-y-8'
          : 'opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
};
