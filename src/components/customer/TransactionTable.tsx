
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: string;
  purpose: string;
  department: string;
  person: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>日期</TableHead>
          <TableHead>金额 (折合HKD)</TableHead>
          <TableHead>联系类型</TableHead>
          <TableHead>联系描述</TableHead>
          <TableHead>联系部门</TableHead>
          <TableHead>服务人</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell className={transaction.amount < 0 ? "text-red-500" : ""}>
              {transaction.amount.toLocaleString()}
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  transaction.type === "出差费用"
                    ? "bg-blue-100 text-blue-800"
                    : transaction.type === "电话沟通"
                      ? "bg-green-100 text-green-800"
                      : transaction.type === "服务反馈"
                        ? "bg-purple-100 text-purple-800"
                        : transaction.type === "招待客户"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-cyan-100 text-cyan-800"
                }
              >
                {transaction.type}
              </Badge>
            </TableCell>
            <TableCell>{transaction.purpose}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  transaction.department === "销售三部"
                    ? "bg-blue-100 text-blue-800"
                    : transaction.department === "销售部"
                      ? "bg-green-100 text-green-800"
                      : "bg-cyan-100 text-cyan-800"
                }
              >
                {transaction.department}
              </Badge>
            </TableCell>
            <TableCell>{transaction.person}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
