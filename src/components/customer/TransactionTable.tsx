
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
  onDeleteTransaction?: (id: number) => void;
  maskedTransactions?: number[];
  onRequestAccess?: (id: number) => void;
}

import { NewServiceRecordDialog } from "./NewServiceRecordDialog";
import { useState } from "react";

export function TransactionTable({ 
  data, 
  onEditTransaction,
  onDeleteTransaction,
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
                      <div className="flex justify-center space-x-1">
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
                          <>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => handleChartEdit(row)}
                              title="编辑触达记录"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('确定要删除这条触达记录吗？') && onDeleteTransaction) {
                                  onDeleteTransaction(row.id);
                                }
                              }}
                              title="删除记录"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"/>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                <line x1="10" x2="10" y1="11" y2="17"/>
                                <line x1="14" x2="14" y1="11" y2="17"/>
                              </svg>
                            </Button>
                          </>
                        )}
                      </div>
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
