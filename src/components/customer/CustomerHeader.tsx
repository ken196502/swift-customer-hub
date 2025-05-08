
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CustomerHeaderProps {
  onShowNewCustomerDialog: () => void;
  viewMode: "customer" | "group";
  onToggleViewMode: () => void;
}

export function CustomerHeader({ 
  onShowNewCustomerDialog, 
  viewMode,
  onToggleViewMode
}: CustomerHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">客户关系管理</h1>
      <div className="flex gap-2">
        <Button 
          variant="default" 
          size="sm"
          onClick={onShowNewCustomerDialog}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          新建
        </Button>
      </div>
    </div>
  );
}
