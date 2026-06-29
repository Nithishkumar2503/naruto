import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="inset-0 z-50 w-screen h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <img
          loading="lazy"
          className="w-16 h-16"
          src="./rasengan.png"
          alt="Loading Rasengan"
        />
        <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </motion.div>
    </div>
  );
}

export default Loading;
