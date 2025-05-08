
import { Button } from "@/components/ui/button";
import { Search, File, RotateCcw } from "lucide-react";

interface SearchControlsProps {
  onReset: () => void;
  onSearch?: () => void;
  onExport?: () => void;
}

export function SearchControls({ onReset, onSearch, onExport }: SearchControlsProps) {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gray-100 hover:bg-gray-200"
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        重置
      </Button>
      <Button 
        variant="default" 
        size="sm" 
        className="bg-blue-500 hover:bg-blue-600"
        onClick={onSearch}
      >
        <Search className="h-4 w-4 mr-2" />
        查询
      </Button>
      <Button 
        variant="default" 
        size="sm" 
        className="bg-orange-500 hover:bg-orange-600"
        onClick={onExport}
      >
      <File className="h-4 w-4 mr-2" />
        导出
      </Button>
    </div>
  );
}
