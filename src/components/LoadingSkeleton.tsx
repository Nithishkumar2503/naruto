import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  delay?: number;
}

function Skeleton({ className = "", delay = 0 }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={`shimmer-bg rounded-lg ${className}`}
    />
  );
}

interface CharacterSkeletonProps {
  count?: number;
  view?: "flex" | "grid";
}

function CharacterSkeleton({ count = 1, view = "flex" }: CharacterSkeletonProps) {
  return (
    <div className={`${view === "flex" ? "flex flex-wrap gap-4 justify-center" : "grid gap-4"}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="lg:w-56 w-[97vw] lg:px-0 px-6 bg-card h-72 rounded-2xl overflow-hidden"
        >
          <Skeleton className="h-44 w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-5 w-3/4 mx-auto" />
            <Skeleton className="h-3 w-1/2 mx-auto" />
            <Skeleton className="h-3 w-2/3 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface HeroSkeletonProps {
  lines?: number;
}

function TextSkeleton({ lines = 3, className = "" }: HeroSkeletonProps & { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={`text-skeleton-${i}`}
          className="h-4 w-full"
          delay={i * 0.1}
        />
      ))}
    </div>
  );
}

function HeroSectionSkeleton() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <Skeleton className="h-20 w-80 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
        <div className="flex gap-4 justify-center pt-6">
          <Skeleton className="h-12 w-36 rounded-xl" />
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton, CharacterSkeleton, TextSkeleton, HeroSectionSkeleton };
