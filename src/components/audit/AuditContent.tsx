
import { useState } from "react";
import { AuditItem } from "@/pages/Audit";
import { AuditTable } from "./AuditTable";
import { AuditFilters } from "./AuditFilters";
import { AuditBatchActions } from "./AuditBatchActions";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuditContentProps {
  items: AuditItem[];
  isPending?: boolean;
}

export function AuditContent({ items, isPending = false }: AuditContentProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { toast } = useToast();

  const handleItemSelect = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    }
  };

  const handleSelectAll = (isSelected: boolean, items: AuditItem[]) => {
    if (isSelected) {
      setSelectedIds(items.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleApprove = (ids: number[], reason?: string) => {
    // Pass the action up to the parent component
    window.dispatchEvent(new CustomEvent('audit:approve', { 
      detail: { ids, reason } 
    }));
    setSelectedIds([]);
  };

  const handleReject = (ids: number[], reason?: string) => {
    // Pass the action up to the parent component
    window.dispatchEvent(new CustomEvent('audit:reject', { 
      detail: { ids, reason } 
    }));
    setSelectedIds([]);
  };

  const handleExport = () => {
    toast({
      title: "导出成功",
      description: "审核数据已导出",
    });
  };

  return (
    <div className="space-y-4">
      <AuditFilters />
      
      {isPending ? (
        <AuditBatchActions 
          selectedIds={selectedIds} 
          onApprove={handleApprove} 
          onReject={handleReject} 
        />
      ) : (
        <div className="flex justify-end mb-4">
          <Button 
            variant="default" 
            size="sm" 
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
        </div>
      )}
      
      <AuditTable 
        items={items}
        selectedIds={isPending ? selectedIds : undefined}
        onItemSelect={isPending ? handleItemSelect : undefined}
        onSelectAll={isPending ? handleSelectAll : undefined}
        showStatus={!isPending}
      />
    </div>
  );
}
