
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ManagementChangeRecord } from "@/hooks/use-management-audit";

interface ManagementChangeRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  changeRecords: ManagementChangeRecord[];
}

export function ManagementChangeRecordsDialog({
  open,
  onOpenChange,
  title,
  changeRecords
}: ManagementChangeRecordsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}变动记录</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {changeRecords.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日期</TableHead>
                  <TableHead>变动前</TableHead>
                  <TableHead>变动后</TableHead>
                  <TableHead>修改人</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {changeRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <div className="max-h-24 overflow-y-auto">
                        {record.before.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-h-24 overflow-y-auto">
                        {record.after.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell>{record.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              暂无变动记录
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>关闭</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
