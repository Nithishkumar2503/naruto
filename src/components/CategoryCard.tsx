import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string | number;
  title: string;
  img: string;
}

function CategoryCard({ title, img }: CategoryCardProps) {
  const categoryKey = title.toLowerCase().replace(/\s+/g, "-");

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    hover: { y: -8, scale: 1.02 },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={`/${categoryKey}`} className="block group">
        <div className="relative overflow-hidden rounded-2xl bg-card border border-white/10 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-white/20 w-full">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={img}
              alt={title}
              loading="lazy"
              className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            
            <motion.div
              className="absolute top-3 right-3 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent border border-accent/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Explore
            </motion.div>
          </div>

          <div className="relative p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold tracking-wide text-white group-hover:text-accent transition-colors duration-300">
                {title}
              </h3>
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 group-hover:bg-accent transition-all duration-300"
                whileHover={{ rotate: 45 }}
              >
                <svg className="h-4 w-4 text-text-secondary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/30 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default CategoryCard;
