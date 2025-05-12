
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
import { MoreHorizontal, Lock } from "lucide-react";
import type { TransactionData } from "@/components/CustomerDetail";
import "./TransactionTable.css";

interface TransactionTableProps {
  data: TransactionData[];
  onEditTransaction?: (id: number) => void;
  maskedTransactions?: number[];
  onRequestAccess?: (id: number) => void;
}

export function TransactionTable({ 
  data, 
  onEditTransaction,
  maskedTransactions = [],
  onRequestAccess
}: TransactionTableProps) {
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
                <TableHead>日期</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>目的</TableHead>
                <TableHead>部门</TableHead>
                <TableHead>人员</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    暂无记录
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} className={isTransactionMasked(row.id) ? "masked-row" : ""}>
                    <TableCell>
                      {isTransactionMasked(row.id) ? (
                        <div className="flex items-center gap-2">
                          <span>{maskContent(row.date)}</span>
                          <Lock 
                            className="h-4 w-4 text-gray-500 cursor-pointer" 
                            onClick={() => onRequestAccess && onRequestAccess(row.id)}
                          />
                        </div>
                      ) : row.date}
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
                      {isTransactionMasked(row.id) ? maskContent(row.type) : row.type}
                    </TableCell>
                    <TableCell>
                      {isTransactionMasked(row.id) ? maskContent(row.purpose) : row.purpose}
                    </TableCell>
                    <TableCell>
                      {isTransactionMasked(row.id) ? maskContent(row.department) : row.department}
                    </TableCell>
                    <TableCell>
                      {isTransactionMasked(row.id) ? maskContent(row.person) : row.person}
                    </TableCell>
                    <TableCell>
                      {!isTransactionMasked(row.id) && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onEditTransaction && onEditTransaction(row.id)}
                              className="cursor-pointer"
                            >
                              编辑
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
