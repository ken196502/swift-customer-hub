
import { Badge } from "@/components/ui/badge";
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
import { getTagColor, getProductColor } from "@/utils/colorUtils";

interface CustomerTableViewProps {
  customers: Customer[];
  onSelectCustomer: (id: number) => void;
  selectedCustomers: number[];
  onToggleSelect: (id: number) => void;
  onToggleSelectAll?: () => void;
  allSelected: boolean;
}

export function CustomerTableView({ 
  customers, 
  onSelectCustomer, 
  selectedCustomers,
  onToggleSelect,
  onToggleSelectAll,
  allSelected
}: CustomerTableViewProps) {
  return (
    <div className="border rounded-md">
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
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
              <TableHead>触达记录</TableHead>
              <TableHead>录入部门</TableHead>
              <TableHead>录入时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={(e) => {
                  // Prevent row click when checkbox is clicked
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
                <TableCell className="text-xs">{customer.customerNumber}</TableCell>
                <TableCell className="text-xs">
                  <div className="font-sm">{customer.shortNameCn}</div>
                  <div className="text-xs text-muted-foreground">{customer.groupName}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={customer.progress === "已开户" ? "default" : "outline"}
                    className={customer.progress === "已开户" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                  >
                    {customer.progress || "意向"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">{customer.type}</TableCell>
                <TableCell className="text-xs">
                  <div className="flex flex-wrap gap-1">
                    {customer.sponsorDepartments?.map((dept, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className={getTagColor(dept)}
                      >
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
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
                    {customer.reaches.map((reach, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className={getTagColor(reach)}
                      >
                        {reach}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-xs">{customer.entryDepartment}</TableCell>
                <TableCell className="text-xs">{customer.entryDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="sm:hidden space-y-2">
        {customers.map((customer) => (
          <div 
            key={customer.id}
            className="p-4 border-b cursor-pointer hover:bg-gray-50 space-y-2"
            onClick={() => onSelectCustomer(customer.id)}
          >
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={selectedCustomers.includes(customer.id)}
                onCheckedChange={() => onToggleSelect(customer.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <div>
                <div className="font-medium">{customer.shortNameCn}</div>
                <div className="text-sm text-muted-foreground">{customer.groupName}</div>
              </div>
              <div className="ml-auto">
                <Badge
                  variant={customer.progress === "已开户" ? "default" : "outline"}
                  className={customer.progress === "已开户" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                >
                  {customer.progress || "意向"}
                </Badge>
              </div>
            </div>
            
            <div className="text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">客户号:</span>
                <span>{customer.customerNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">客户类型:</span>
                <span>{customer.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">录入部门:</span>
                <span>{customer.entryDepartment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">主办部门:</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {customer.sponsorDepartments?.map((dept, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className={getTagColor(dept)}
                    >
                      {dept}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">提供产品:</span>
                <div className="flex flex-wrap gap-1 justify-end">
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
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">录入时间:</span>
                <span>{customer.entryDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
