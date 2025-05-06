
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface FilterButtonProps {
  variant?: "default" | "outline";
  bgColor?: string;
  icon?: ReactNode;
  onClick?: () => void;
  children: ReactNode;
}

export function FilterButton({
  variant = "outline",
  bgColor,
  icon,
  onClick,
  children
}: FilterButtonProps) {
  return (
    <Button 
      variant={variant} 
      size="sm" 
      className={bgColor ? `${bgColor} hover:${bgColor.replace('bg-', 'hover:bg-')}` : ""}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  );
}
