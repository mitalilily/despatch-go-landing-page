import { motion as Motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, className = "", delay = 0, amount = 0.2 }) {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      transition={reduceMotion ? undefined : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </Motion.div>
  );
}
