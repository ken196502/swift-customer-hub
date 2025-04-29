
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Customer } from "@/pages/Index";

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customerId: number) => void;
}

export function CustomerList({ customers, onSelectCustomer }: CustomerListProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>客户号</TableHead>
            <TableHead>客户名称</TableHead>
            <TableHead>客户类型</TableHead>
            <TableHead>所属集团</TableHead>
            <TableHead>提供产品</TableHead>
            <TableHead>标签</TableHead>
            <TableHead>录入时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onSelectCustomer(customer.id)}
            >
              <TableCell>{customer.customerNumber}</TableCell>
              <TableCell>
                <div className="font-medium">{customer.shortNameCn}</div>
                <div className="text-sm text-gray-500">{customer.shortNameEn}</div>
              </TableCell>
              <TableCell>{customer.type}</TableCell>
              <TableCell>{customer.groupName}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {customer.products.map((product, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className={
                        product === "股票交易"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : product === "咨询"
                            ? "bg-pink-100 text-pink-800 hover:bg-pink-100"
                            : product === "债券交易"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : product === "IPO"
                                ? "bg-cyan-100 text-cyan-800 hover:bg-cyan-100"
                                : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                      }
                    >
                      {product}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {customer.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className={
                        tag === "零售经纪"
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : tag === "机构经纪"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : tag === "跨资产"
                              ? "bg-cyan-100 text-cyan-800 hover:bg-cyan-100"
                              : tag === "DCM"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{customer.entryDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
