
import { useState } from "react";
import { AuditItem } from "@/pages/Audit";
import { AuditTable } from "./AuditTable";
import { AuditFilters } from "./AuditFilters";
import { AuditBatchActions } from "./AuditBatchActions";
import { useToast } from "@/hooks/use-toast";

interface AuditContentProps {
  items: AuditItem[];
  isPending?: boolean;
  onCategoryChange?: (category: string | null) => void;
  selectedCategory?: string | null;
}

export function AuditContent({ 
  items, 
  isPending = false,
  onCategoryChange,
  selectedCategory 
}: AuditContentProps) {
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
    toast({
      title: "审批完成",
      description: "已批准所选审核项"
    });
  };

  const handleReject = (ids: number[], reason?: string) => {
    // Pass the action up to the parent component
    window.dispatchEvent(new CustomEvent('audit:reject', { 
      detail: { ids, reason } 
    }));
    setSelectedIds([]);
    toast({
      title: "已拒绝",
      description: "已拒绝所选审核项"
    });
  };

  return (
    <div className="space-y-4">      
      <AuditFilters 
        onCategoryChange={onCategoryChange}
        selectedCategory={selectedCategory}
      />
      
      {isPending && (
        <AuditBatchActions 
          selectedIds={selectedIds} 
          onApprove={handleApprove} 
          onReject={handleReject} 
        />
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
