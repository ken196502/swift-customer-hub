
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
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
              <TableHead>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>进展</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      进展对应(意向/落地):<br/>金市lead/account，<br/>零售“已注册/已开户”
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead>客户类型</TableHead>
              <TableHead>主办部门</TableHead>
              <TableHead>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>提供产品</span>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center" style={{ maxWidth: 640, whiteSpace: 'pre-line' }}>
                          股票交易:恒生柜台有账号<br/>咨询:CRM收入列表有发票(testdv.tfisec.cn/groupcrm/revenue/revenue_list)<br/>债券交易:CRM属于FICC客户testdv.tfisec.cn/groupcrm/product/product_list<br/>IPO:CRM收入列表有IPO(testdv.tfisec.cn/groupcrm/revenue/revenue_list)<br/>发债:投资银行DCM发行人(testdv.tfisec.cn/groupcrm/dcm-project/issuer)
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                </span>
              </TableHead>
              <TableHead>触达部门</TableHead>
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
                    variant={customer.progress === "落地" ? "default" : "outline"}
                    className={customer.progress === "落地" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
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
                <TableCell className="text-right pr-2">
                  {/* 右箭头SVG */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 5L12 10L7 15" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </TableCell>
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
            <div className="flex items-center justify-between">
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
              </div>
              <div className="flex items-center">
                <Badge
                  variant={customer.progress === "落地" ? "default" : "outline"}
                  className={customer.progress === "落地" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                >
                  {customer.progress || "意向"}
                </Badge>
                <div className="ml-2 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 5L12 10L7 15" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-sm space-y-4">
              <div className="flex justify-between items-center pt-1">
                <span className="text-muted-foreground">客户号:</span>
                <span>{customer.customerNumber}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-muted-foreground">客户类型:</span>
                <span>{customer.type}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-muted-foreground">录入部门:</span>
                <span>{customer.entryDepartment}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
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
              <div className="flex justify-between items-center pt-1">
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
              <div className="flex justify-between items-center pt-1">
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
