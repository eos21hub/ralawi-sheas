import { motion } from 'framer-motion';
import { wordReveal, staggerParent } from '@/lib/motion';

type Props = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  stagger?: number;
  delay?: number;
  /** Trigger on viewport (in-view) vs. on mount */
  inView?: boolean;
};

/**
 * Word-by-word reveal — each word sits in a clip-mask and slides up.
 * Preserves whitespace between words.
 */
export default function RevealText({
  text,
  as = 'h1',
  className = '',
  stagger = 0.06,
  delay = 0,
  inView = false,
}: Props) {
  const words = text.split(' ');
  const MotionTag = motion[as] as typeof motion.h1;

  const animateProps = inView
    ? {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.4 },
      }
    : {
        initial: 'hidden' as const,
        animate: 'visible' as const,
      };

  return (
    <MotionTag
      className={className}
      variants={staggerParent(stagger, delay)}
      {...animateProps}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline pb-[0.15em]"
          aria-hidden="true"
        >
          <motion.span className="inline-block" variants={wordReveal}>
            {w}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
