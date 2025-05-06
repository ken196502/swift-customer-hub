
import { Button } from "@/components/ui/button";
import { Grid, Rows } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "customer" | "group";
  onToggle: () => void;
}

export function ViewModeToggle({ viewMode, onToggle }: ViewModeToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className="flex items-center gap-1"
    >
      {viewMode === "customer" ? (
        <>
          <Grid className="h-4 w-4" />
          按集团
        </>
      ) : (
        <>
          <Rows className="h-4 w-4" />
          按客户
        </>
      )}
    </Button>
  );
}
