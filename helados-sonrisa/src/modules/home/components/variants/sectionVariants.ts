import type { Variants } from "framer-motion";

export const sectionVariants: Variants = {
  hidden: { opacity: 0.2, y: 40, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      type: "spring", 
      stiffness: 40, 
      damping: 20,
      duration: 0.8 
    }
  }
};