import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { AuditItem } from "@/pages/Audit";

interface AuditTableProps {
  items: AuditItem[];
  actionColumn?: (id: number) => React.ReactNode;
  showStatus?: boolean;
  selectedIds?: number[];
  onItemSelect?: (id: number, isSelected: boolean) => void;
  onSelectAll?: (isSelected: boolean, items: AuditItem[]) => void;
}

export function AuditTable({ 
  items, 
  actionColumn, 
  showStatus = false, 
  selectedIds = [],
  onItemSelect,
  onSelectAll
}: AuditTableProps) {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "新增":
        return "bg-green-500";
      case "修改":
        return "bg-blue-500";
      case "删除":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">已通过</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">已拒绝</Badge>;
      default:
        return <Badge className="bg-gray-500">待审核</Badge>;
    }
  };

  const isSelectable = onItemSelect !== undefined && onSelectAll !== undefined;

  return (
    <div className="border rounded-md">
      {/* Desktop view */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              {isSelectable && (
                <TableHead className="w-12 audit-table">
                  <Checkbox 
                    checked={items.length > 0 && selectedIds.length === items.length}
onCheckedChange={(checked) => {
  if (typeof checked === 'boolean') {
    onSelectAll?.(checked, items);
  }
}}
                    className="checkbox-header"
                  />
                </TableHead>
              )}
              <TableHead>类型</TableHead>
              <TableHead>客户</TableHead>
              <TableHead>变动类型</TableHead>
              <TableHead>变更前</TableHead>
              <TableHead>变更后</TableHead>
              <TableHead>备注</TableHead>
              <TableHead>变更人</TableHead>
              {actionColumn && <TableHead className="text-right">操作</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                {isSelectable && (
                <TableCell>
                  <Checkbox 
                    checked={selectedIds.includes(item.id)}
onCheckedChange={(checked) => {
  if (typeof checked === 'boolean') {
    onItemSelect?.(item.id, checked);
  }
}}
                  />
                </TableCell>
              )}
              <TableCell>
                <Badge variant="outline">{item.category}</Badge>
              </TableCell>
              <TableCell>{item.customer}</TableCell>
              <TableCell>
                <Badge className={getBadgeColor(item.type)}>{item.type}</Badge>
              </TableCell>
              <TableCell className="text-left">
                {item.before || "—"}
              </TableCell>
              <TableCell className="text-left">
                {item.after || "—"}
              </TableCell>
              <TableCell>{item.note}</TableCell>
              <TableCell>{item.submitter}</TableCell>
                {actionColumn && (
                  <TableCell className="text-right">
                    {actionColumn(item.id)}
                  </TableCell>
                )}
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={showStatus ? (isSelectable ? 10 : 9) : (isSelectable ? 9 : 8)} className="h-24 text-center">
                  暂无数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="sm:hidden space-y-2">
        {items.map((item) => (
          <div key={item.id} className="p-4 border-b cursor-pointer hover:bg-gray-50">
            <div className="space-y-4 text-left">
              {isSelectable && ( // 添加移动端复选框
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={selectedIds.includes(item.id)}
onCheckedChange={(checked) => {
  if (typeof checked === 'boolean') {
    onItemSelect?.(item.id, checked);
  }
}}
                  />
                  <span className="font-medium">{item.customer}</span>
                </div>
              )}
              <div className="space-y-2">
                {!isSelectable && ( // 非选择模式保持原有布局
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <span className="font-medium">{item.customer}</span>
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  <span className="mr-2">
                    <Badge className={getBadgeColor(item.type)}>{item.type}</Badge>
                  </span>
                  <div>变更前: {item.before || "—"}</div>
                  <div>变更后: {item.after || "—"}</div>
                  <div>变更人: {item.submitter}</div>
                </div>
              </div>
              
              {actionColumn && (
                <div className="flex flex-col space-y-2 text-left"> {/* 添加 text-left 类 */}
                  {actionColumn(item.id)}
                </div>
              )}
            </div>
            {item.note && (
              <div className="mt-2 text-sm text-muted-foreground text-left"> {/* 添加 text-left 类 */}
                备注: {item.note}
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            暂无数据
          </div>
        )}
      </div>
    </div>
  );
}
