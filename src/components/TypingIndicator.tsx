import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <motion.div className="flex gap-2 text-xl p-4">
      {[1, 2, 3].map((i) => (
        <motion.span
          className="w-1 h-1 rounded-full bg-black dark:bg-white"
          key={i}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [1, 2, 1],
            translateY: [0, -5, 0],
          }}
          transition={{
            times: [0, 0.5, 1],
            repeat: Infinity,
            delay: 0.3 * i,
            repeatDelay: 1,
            duration: 1,
          }}
        ></motion.span>
      ))}
    </motion.div>
  );
};

export default TypingIndicator;
