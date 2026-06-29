import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/naruto.png"
          alt="Naruto Background"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <FloatingParticles count={30} />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/naruto-title.png"
            alt="Naruto Title"
            className="mx-auto w-64 sm:w-80 md:w-96 lg:w-[500px] mb-8"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-white mb-4"
        >
          NARUTO <span className="text-accent">EXPLORER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Explore every shinobi, village, clan, tailed beast, jutsu, and legendary character
          in the hidden leaf universe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/characters"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold uppercase tracking-widest bg-accent text-white hover:bg-accent-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25"
          >
            Explore Now
          </Link>
          <Link
            to="/characters"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold uppercase tracking-widest border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105"
          >
            Random Character
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export default HeroSection;
