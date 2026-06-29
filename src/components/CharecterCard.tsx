import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface CharacterProps {
  name?: string;
  images?: string[];
  id?: string | number;
  item?: number[];
}

function CharacterCard({ id, name, images = [] }: CharacterProps) {
  const location = useLocation();

  const isClanPage =
    location.pathname === "/clans" ||
    location.pathname === "/villages" ||
    location.pathname === "/teams" ||
    location.pathname === "/kekkei-genkai";
  const redirectPath = isClanPage ? "#" : `/characters/${id}`;

  const firstImage = images?.[0] || "/no-image.png";

  return (
    <Link to={redirectPath} className="block group">
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-card border border-white/10 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-white/20 w-full max-w-[224px]"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="h-44 w-full overflow-hidden">
          <img
            src={firstImage}
            alt={name || "Character"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          <motion.div
            className="absolute top-3 right-3 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent border border-accent/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {location.pathname.split("/")[1] || "Character"}
          </motion.div>
        </div>

        <div className="h-20 flex items-center justify-center p-2">
          <h1 className="text-center font-semibold tracking-wide text-white text-sm sm:text-base truncate px-2">
            {name}
          </h1>
        </div>
        
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/30 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </Link>
  );
}

export default CharacterCard;
