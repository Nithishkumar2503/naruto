import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import swipeImage from "./SwipeImage";

interface CharacterProps {
  name?: string;
  images?: string[];
  id?: string | number;
  clan?: string;
  village?: string;
  rank?: string;
  natureType?: string[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -10, scale: 1.03 },
};

function CharacterCardPremium({ id, name, images = [], clan, village, rank, natureType = [] }: CharacterProps) {
  const location = useLocation();

  const isClanPage =
    location.pathname === "/clans" ||
    location.pathname === "/villages" ||
    location.pathname === "/teams" ||
    location.pathname === "/kekkei-genkai";
  const redirectPath = isClanPage ? "#" : `/characters/${id}`;

  const primaryNature = natureType[0] || "Unknown";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={redirectPath} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-card border border-white/10 shadow-xl transition-all duration-500">
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
            >
              {swipeImage(images)}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            <div className="absolute top-3 right-3">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent border border-accent/30">
                {primaryNature}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-white text-center truncate mb-2">{name}</h3>
            {clan && (
              <p className="text-xs text-text-secondary text-center capitalize mb-1">
                Clan: {clan}
              </p>
            )}
            {village && (
              <p className="text-xs text-text-secondary text-center capitalize mb-2">
                Village: {village}
              </p>
            )}
            {rank && (
              <div className="flex justify-center">
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-accent-secondary border border-accent-secondary/20">
                  {rank}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default CharacterCardPremium;
