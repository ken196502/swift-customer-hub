
import { useState } from "react";
import { AuditItem } from "@/pages/Audit";
import { AuditTable } from "./AuditTable";
import { AuditFilters } from "./AuditFilters";
import { AuditBatchActions } from "./AuditBatchActions";
import { useToast } from "@/hooks/use-toast";

interface AuditContentProps {
  items: AuditItem[];
  isPending?: boolean;
}

export function AuditContent({ items, isPending = false }: AuditContentProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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

  return (
    <div className="space-y-4">      
      <AuditFilters />
      
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
