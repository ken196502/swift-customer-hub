import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { formatSubmitTime } from "./formatDate";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { AuditItem } from "@/pages/Audit";
import { CustomTooltip } from "@/components/ui/CustomTooltip";

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
              {isSelectable && (
                <TableHead className="w-24 min-w-[90px] max-w-[120px] text-center whitespace-nowrap audit-table">
                  提交时间
                </TableHead>
              )}
              <TableHead>客户</TableHead>
              <TableHead>变动类型</TableHead>
              <TableHead>
                <CustomTooltip content="合并时变动前是两个客户号，变动后一个客户号">
                  <span>变更前</span>
                </CustomTooltip>
              </TableHead>
              <TableHead>变更后</TableHead>
              <TableHead>申请人</TableHead>
              {showStatus && (
                <TableHead>状态</TableHead>
              )}
              {showStatus && items.some(item => item.status === "approved") && (
                <TableHead>审核时间</TableHead>
              )}
              {showStatus && items.some(item => item.status === "approved") && (
                <TableHead>审核人</TableHead>
              )}
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
              {isSelectable && (
                <TableCell className="text-center whitespace-nowrap align-middle">
  {(() => {
    const val = formatSubmitTime(item.submitTime);
    if (!val) return null;
    const [date, time] = val.split('\n');
    return (
      <>
        <span>{date}</span><br />
        <span>{time}</span>
      </>
    );
  })()}
</TableCell>
              )}
              <TableCell>{item.customer}</TableCell>
              <TableCell>
                <Badge className={getBadgeColor(item.type)}>{item.type}</Badge>
              </TableCell>
              <TableCell className="text-left max-w-[200px]">
                {item.before ? (
                  <CustomTooltip 
                    content={
                      <div className="p-1">
                        {item.before.split("\n").map((line, index) => (
                          <p key={index} className="whitespace-pre-wrap">{line}</p>
                        ))}
                      </div>
                    }
                  >
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                      {item.before.split("\n").map((line, index) => (
                        <p key={index} className="truncate">{line}</p>
                      ))}
                    </div>
                  </CustomTooltip>
                ) : "- -"}
              </TableCell>
              <TableCell className="text-left max-w-[200px]">
                {item.after ? (
                  <CustomTooltip 
                    content={
                      <div className="p-1">
                        {item.after.split("\n").map((line, index) => (
                          <p key={index} className="whitespace-pre-wrap">{line}</p>
                        ))}
                      </div>
                    }
                  >
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                      {item.after.split("\n").map((line, index) => (
                        <p key={index} className="truncate">{line}</p>
                      ))}
                    </div>
                  </CustomTooltip>
                ) : "- -"}
              </TableCell>
              <TableCell>{item.submitter}</TableCell>
              {showStatus && (
                <TableCell>
                  {getStatusBadge(item.status)}
                </TableCell>
              )}
              {item.status === "approved" && (
                <TableCell>{item.approvalTime}</TableCell>
              )}
              {item.status === "approved" && (
                <TableCell>{item.approver}</TableCell>
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
                <TableCell colSpan={showStatus ? (isSelectable ? 14 : 13) : (isSelectable ? 13 : 12)} className="h-24 text-center">
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
                  <div>变更前: {item.before || "- -"}</div>
                  <div>变更后: {item.after || "— -"}</div>
                  <div>申请人: {item.submitter}</div>
                  {isSelectable && (
                   <div className="whitespace-nowrap">提交时间: {(() => {
  const val = formatSubmitTime(item.submitTime);
  if (!val) return null;
  const [date, time] = val.split('\n');
  return (
    <>
      <span>{date}</span><br />
      <span>{time}</span>
    </>
  );
})()}</div>
                  )}
                  {showStatus && (
                    <div>状态: {getStatusBadge(item.status)}</div>
                  )}
                {item.status === "approved" && (
                    <div>审核时间: {item.approvalTime}</div>
                  )}
                {item.status === "approved" && (
                    <div>审核人: {item.approver}</div>
                  )}
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
