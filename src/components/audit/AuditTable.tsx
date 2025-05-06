
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { AuditItem } from "@/pages/Audit";

interface AuditTableProps {
  items: AuditItem[];
  actionColumn?: (id: number) => React.ReactNode;
  showStatus?: boolean;
}

export function AuditTable({ items, actionColumn, showStatus = false }: AuditTableProps) {
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
        return <Badge className="bg-red-500">已驳回</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">待审核</Badge>;
      default:
        return <Badge>未知</Badge>;
    }
  };

  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead>提交时间</TableHead>
            <TableHead>客户</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>变动类型</TableHead>
            <TableHead>变更前</TableHead>
            <TableHead>变更后</TableHead>
            <TableHead>备注</TableHead>
            <TableHead>变更人</TableHead>
            {showStatus && <TableHead>状态</TableHead>}
            {actionColumn && <TableHead className="text-right">操作</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{item.submitTime}</TableCell>
              <TableCell>{item.customer}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getBadgeColor(item.type)}>{item.type}</Badge>
              </TableCell>
              <TableCell className="max-w-[200px] whitespace-pre-wrap">
                {item.before || "—"}
              </TableCell>
              <TableCell className="max-w-[200px] whitespace-pre-wrap">
                {item.after || "—"}
              </TableCell>
              <TableCell>{item.note || "—"}</TableCell>
              <TableCell>{item.submitter}</TableCell>
              {showStatus && (
                <TableCell>{getStatusBadge(item.status)}</TableCell>
              )}
              {actionColumn && (
                <TableCell className="text-right">
                  {actionColumn(item.id)}
                </TableCell>
              )}
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={showStatus ? 10 : 9} className="h-24 text-center">
                暂无数据
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
