
import { Button } from "@/components/ui/button";
import { Search, File, PlusCircle, Tags, List } from "lucide-react";

interface CustomerHeaderProps {
  onShowNewCustomerDialog: () => void;
  onShowTagManagement: () => void;
  onShowContactTypeManagement: () => void;
}

export function CustomerHeader({ 
  onShowNewCustomerDialog, 
  onShowTagManagement,
  onShowContactTypeManagement 
}: CustomerHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">客户关系管理系统</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={onShowTagManagement}
          >
            <Tags className="h-4 w-4" />
            管理标签
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={onShowContactTypeManagement}
          >
            <List className="h-4 w-4" />
            管理联系类型
          </Button>
          <Button 
          variant="default" 
          size="sm" 
          className="bg-green-500 hover:bg-green-600"
          onClick={onShowNewCustomerDialog}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          新建
        </Button>
        </div>
      </div>
    </>
  );
}
