
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import type { TransactionData } from "@/components/CustomerDetail";

interface TransactionTableProps {
  data: TransactionData[];
  onEditTransaction?: (transactionId: number) => void;
}

export function TransactionTable({ data, onEditTransaction }: TransactionTableProps) {
  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>日期</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>部门</TableHead>
            <TableHead>人员</TableHead>
            <TableHead>金额</TableHead>
            <TableHead>用途</TableHead>
            <TableHead>描述</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.department}</TableCell>
              <TableCell>{transaction.person}</TableCell>
              <TableCell>
                {transaction.amount ? (
                  <span className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
                    {transaction.amount.toLocaleString("zh-CN")}
                  </span>
                ) : "-"}
              </TableCell>
              <TableCell>{transaction.purpose}</TableCell>
              <TableCell>{transaction.description || "-"}</TableCell>
              <TableCell className="text-right">
                {onEditTransaction && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditTransaction(transaction.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                暂无数据
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
