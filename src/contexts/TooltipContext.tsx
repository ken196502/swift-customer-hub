
import React, { createContext, useContext, useState } from "react";

type TooltipContextType = {
  alwaysShowTooltips: boolean;
  setAlwaysShowTooltips: (show: boolean) => void;
};

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const [alwaysShowTooltips, setAlwaysShowTooltips] = useState(true);

  return (
    <TooltipContext.Provider value={{ alwaysShowTooltips, setAlwaysShowTooltips }}>
      {children}
    </TooltipContext.Provider>
  );
}

export function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (context === undefined) {
    throw new Error("useTooltipContext must be used within a TooltipProvider");
  }
  return context;
}
