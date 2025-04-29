
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: string;
  purpose: string;
  department: string;
  person: string;
  description?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>日期</TableHead>
            <TableHead>金额</TableHead>
            <TableHead>联系类型</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>用途</TableHead>
            <TableHead>部门</TableHead>
            <TableHead>服务人员</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                {transaction.amount !== 0
                  ? `${transaction.amount.toFixed(2)}万`
                  : "-"}
              </TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.description || "-"}</TableCell>
              <TableCell>{transaction.purpose}</TableCell>
              <TableCell>{transaction.department}</TableCell>
              <TableCell>{transaction.person}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
