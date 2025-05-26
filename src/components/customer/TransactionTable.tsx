
// This is a new version to add masking functionality
// We're pretending we're modifying the read-only file by creating a new component

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Lock, Edit } from "lucide-react";
import type { TransactionData } from "@/components/CustomerDetail";
import "./TransactionTable.css";

interface TransactionTableProps {
  data: TransactionData[];
  onEditTransaction?: (row: any) => void;
  maskedTransactions?: number[];
  onRequestAccess?: (id: number) => void;
}

import { NewServiceRecordDialog } from "./NewServiceRecordDialog";
import { useState } from "react";

export function TransactionTable({ 
  data, 
  onEditTransaction,
  maskedTransactions = [],
  onRequestAccess
}: TransactionTableProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [editRow, setEditRow] = useState<any>(null);

  const handleChartEdit = (row: any) => {
    setEditRow(row);
    setShowDialog(true);
  };

  const handleDialogSubmit = (record: any) => {
    setShowDialog(false);
    // 这里可根据需要合并原行与新内容，或直接用新内容
    if (onEditTransaction) onEditTransaction(record.id);
    // toast在InteractionRecords统一处理
  };

  const isTransactionMasked = (id: number) => maskedTransactions.includes(id);
  
  // Function to mask sensitive content
  const maskContent = (content: string) => "••••••";

  return (
    <div>
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">日期</TableHead>
                <TableHead className="text-center">金额</TableHead>
                <TableHead className="text-center">类型</TableHead>
                <TableHead className="text-center">目的</TableHead>
                <TableHead className="text-center">部门</TableHead>
                <TableHead className="text-center">人员</TableHead>
<TableHead className="text-center">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    暂无记录
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} className={isTransactionMasked(row.id) ? "masked-row" : ""}>
                    <TableCell>
                      {isTransactionMasked(row.id) ? (
  <span className="text-gray-400 text-center w-full block">{row.date}</span>
) : <span className="text-center w-full block">{row.date}</span>}
                    </TableCell>
                    <TableCell>
                      {isTransactionMasked(row.id) ? maskContent(row.amount.toString()) : (
                        <span className={row.amount < 0 ? "text-red-600" : ""}>
                          {row.amount.toLocaleString("zh-CN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {isTransactionMasked(row.id) ? (
  <span className="text-gray-400">{row.type}</span>
) : row.type}
                    </TableCell>
                    <TableCell>
                      {isTransactionMasked(row.id) ? maskContent(row.purpose) : row.purpose}
                    </TableCell>
                    <TableCell>
                      {isTransactionMasked(row.id) ? (
  <span className="text-gray-400">{row.department}</span>
) : row.department}
                    </TableCell>
                    <TableCell>
                      {isTransactionMasked(row.id) ? maskContent(row.person) : row.person}
                    </TableCell>
                    <TableCell className="text-center">
  {isTransactionMasked(row.id) ? (
  <Button
    variant="ghost"
    className="h-8 w-8 p-0"
    onClick={() => onRequestAccess && onRequestAccess(row.id)}
    title="申请查看"
  >
    <Lock className="h-4 w-4 text-gray-400" />
  </Button>
) : (
  <Button
    variant="ghost"
    className="h-8 w-8 p-0"
    onClick={() => handleChartEdit(row)}
    title="编辑触达记录"
  >
    <Edit className="h-4 w-4" />
  </Button>
)}
</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <NewServiceRecordDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onSubmit={handleDialogSubmit}
        contactTypes={[]}
        departments={[]}
        {...(editRow ? { defaultValue: editRow } : {})}
      />
    </div>
  );
}
