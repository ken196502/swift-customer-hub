
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { AuditItem } from "@/pages/Audit";
import { Badge } from "@/components/ui/badge";

interface AuditTableProps {
  items: AuditItem[];
  actionColumn?: (id: number) => React.ReactNode;
  showStatus?: boolean;
}

export function AuditTable({ items, actionColumn, showStatus = false }: AuditTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map(item => item.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const renderStatusBadge = (status: string) => {
    if (status === "approved") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">已通过</Badge>;
    } else if (status === "rejected") {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">已驳回</Badge>;
    }
    return null;
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox 
                checked={selectedIds.length === items.length && items.length > 0}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>提交时间</TableHead>
            <TableHead>客户</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>变更前</TableHead>
            <TableHead>变更后</TableHead>
            <TableHead>备注</TableHead>
            <TableHead>变更人</TableHead>
            {showStatus && <TableHead>状态</TableHead>}
            {actionColumn && <TableHead>操作</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showStatus ? 9 : 8} className="text-center py-10 text-muted-foreground">
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={() => toggleSelect(item.id)}
                  />
                </TableCell>
                <TableCell>{item.submitTime}</TableCell>
                <TableCell>{item.customer}</TableCell>
                <TableCell>
                  <Badge 
                    className={
                      item.type === "新增" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                      item.type === "修改" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                      "bg-red-100 text-red-800 hover:bg-red-200"
                    }
                  >
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <div className="whitespace-pre-line text-sm">{item.before}</div>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <div className="whitespace-pre-line text-sm">{item.after}</div>
                </TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell>{item.submitter}</TableCell>
                {showStatus && (
                  <TableCell>{renderStatusBadge(item.status)}</TableCell>
                )}
                {actionColumn && (
                  <TableCell>{actionColumn(item.id)}</TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
