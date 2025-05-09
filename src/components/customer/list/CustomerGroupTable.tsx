
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/contexts/CustomerContext";
import { DepartmentBadges, ProductBadges, ProgressBadge } from "./CustomerGroupBadges";

interface CustomerGroupTableProps {
  groupCustomers: Customer[];
  onSelectCustomer: (id: number) => void;
  selectedCustomers: number[];
  onToggleSelect: (id: number) => void;
  onToggleSelectAll?: () => void;
  allSelected: boolean;
}

export function CustomerGroupTable({
  groupCustomers,
  onSelectCustomer,
  selectedCustomers,
  onToggleSelect,
  onToggleSelectAll,
  allSelected
}: CustomerGroupTableProps) {
  return (
    <div className="hidden sm:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={allSelected}
                onCheckedChange={onToggleSelectAll}
                className="checkbox-header"
              />
            </TableHead>
            <TableHead>客户号</TableHead>
            <TableHead>客户名称</TableHead>
            <TableHead>进展</TableHead>
            <TableHead>客户类型</TableHead>
            <TableHead>主办部门</TableHead>
            <TableHead>提供产品</TableHead>
            <TableHead>录入部门</TableHead>
            <TableHead>录入时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupCustomers.map((customer) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('.checkbox-cell')) return;
                onSelectCustomer(customer.id);
              }}
            >
              <TableCell className="checkbox-cell">
                <Checkbox 
                  checked={selectedCustomers.includes(customer.id)}
                  onCheckedChange={() => onToggleSelect(customer.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell>{customer.customerNumber}</TableCell>
              <TableCell>
                <div className="font-medium">{customer.shortNameCn}</div>
              </TableCell>
              <TableCell>
                <ProgressBadge progress={customer.progress} />
              </TableCell>
              <TableCell>{customer.type}</TableCell>
              <TableCell>
                <DepartmentBadges departments={customer.sponsorDepartments} />
              </TableCell>
              <TableCell>
                <ProductBadges products={customer.products} />
              </TableCell>
              <TableCell>{customer.entryDepartment}</TableCell>
              <TableCell>{customer.entryDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
