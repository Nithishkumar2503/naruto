import { motion } from "framer-motion";

interface Props {
  imagePath?: string;
  title?: string;
  description?: string;
  actionButton?: string;
  onDispatch?: () => void;
}

const NoDataNotFound = ({
  description = "Try searching for something else or explore our categories.",
  imagePath,
  title = "No results found",
  actionButton,
  onDispatch,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-[75vh] flex-col items-center justify-center"
    >
      <div className="relative">
        {imagePath && (
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            loading="lazy"
            className="w-full max-w-xs mx-auto mb-6 opacity-80"
            src={imagePath}
            alt="No data"
          />
        )}
        
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full blur-sm" />
        <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-accent-secondary/20 rounded-full blur-sm" />
      </div>

      <h1 className="text-center text-xl font-bold text-white mb-2">{title}</h1>
      <p className="text-center text-text-secondary max-w-md mb-6">{description}</p>

      {actionButton && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDispatch}
          className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest bg-accent text-white hover:bg-accent-secondary transition-all duration-300 shadow-lg shadow-accent/20"
        >
          {actionButton}
        </motion.button>
      )}
    </motion.div>
  );
};

export default NoDataNotFound;
