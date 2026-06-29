import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}: AnimatedButtonProps) {
  const baseClasses = "font-bold uppercase tracking-widest rounded-xl transition-all duration-300 relative overflow-hidden";

  const variantClasses = {
    primary: "bg-accent text-white hover:bg-accent-secondary",
    secondary: "border border-accent text-accent hover:bg-accent hover:text-white",
    accent: "bg-card text-white hover:bg-white/10 border border-white/10",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  } ${className}`;

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classes}
    >
      <span className="relative z-10">{children}</span>
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-white/20 opacity-0"
          whileHover={{ opacity: 1 }}
          initial={{ x: "-100%" }}
          whileTap={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

export default AnimatedButton;
