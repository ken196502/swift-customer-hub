
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/contexts/CustomerContext";
import { getTagColor, getProductColor } from "@/utils/colorUtils";

interface CustomerTableViewProps {
  customers: Customer[];
  onSelectCustomer: (id: number) => void;
}

export function CustomerTableView({ customers, onSelectCustomer }: CustomerTableViewProps) {
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
            <TableHead>触达部门(按触达先后排列)</TableHead>
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
                      className={getProductColor(product)}
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
                      className={getTagColor(tag)}
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
