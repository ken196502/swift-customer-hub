
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Customer } from "@/contexts/CustomerContext";
import { DepartmentBadges, ProductBadges, ProgressBadge } from "./CustomerGroupBadges";

interface CustomerGroupViewProps {
  customers: Customer[];
  onSelectCustomer: (id: number) => void;
  selectedCustomers: number[];
  onToggleSelect: (id: number) => void;
  onToggleSelectAll?: () => void;
  allSelected: boolean;
}

export function CustomerGroupView({ 
  customers, 
  onSelectCustomer,
  selectedCustomers,
  onToggleSelect,
  onToggleSelectAll,
  allSelected
}: CustomerGroupViewProps) {
  // Group customers by groupName
  const groupedCustomers: Record<string, Customer[]> = {};
  
  customers.forEach(customer => {
    if (!groupedCustomers[customer.groupName]) {
      groupedCustomers[customer.groupName] = [];
    }
    groupedCustomers[customer.groupName].push(customer);
  });

  // Convert to array of group entries for rendering
  const groupEntries = Object.entries(groupedCustomers);

  // Helper function to get unique products across all customers in a group
  const getGroupProducts = (groupCustomers: Customer[]) => {
    const uniqueProducts = new Set<string>();
    groupCustomers.forEach(customer => {
      customer.products.forEach(product => uniqueProducts.add(product));
    });
    return Array.from(uniqueProducts);
  };

  return (
    <div className="border rounded-md">
      <Accordion type="multiple" className="w-full">
        {groupEntries.map(([groupName, groupCustomers]) => (
          <GroupAccordionItem 
            key={groupName} 
            groupName={groupName}
            groupCustomers={groupCustomers}
            onSelectCustomer={onSelectCustomer}
            selectedCustomers={selectedCustomers}
            onToggleSelect={onToggleSelect}
            onToggleSelectAll={onToggleSelectAll}
            allSelected={allSelected}
            getGroupProducts={getGroupProducts}
          />
        ))}
      </Accordion>
    </div>
  );
}

interface GroupAccordionItemProps {
  groupName: string;
  groupCustomers: Customer[];
  onSelectCustomer: (id: number) => void;
  selectedCustomers: number[];
  onToggleSelect: (id: number) => void;
  onToggleSelectAll?: () => void;
  allSelected: boolean;
  getGroupProducts: (customers: Customer[]) => string[];
}

function GroupAccordionItem({
  groupName,
  groupCustomers,
  onSelectCustomer,
  selectedCustomers,
  onToggleSelect,
  onToggleSelectAll,
  allSelected,
  getGroupProducts
}: GroupAccordionItemProps) {
  return (
    <AccordionItem value={groupName}>
      <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <span className="font-medium">{groupName}</span>
            <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
              {groupCustomers.length} 个客户
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {getGroupProducts(groupCustomers).map((product) => (
              <Badge
                key={product}
                variant="outline"
                className={`bg-${product === "股票交易" ? "blue" : product === "债券交易" ? "purple" : "green"}-100 text-${product === "股票交易" ? "blue" : product === "债券交易" ? "purple" : "green"}-800 hover:bg-${product === "股票交易" ? "blue" : product === "债券交易" ? "purple" : "green"}-100`}
              >
                {product}
              </Badge>
            ))}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <CustomerGroupTable 
          groupCustomers={groupCustomers}
          onSelectCustomer={onSelectCustomer}
          selectedCustomers={selectedCustomers}
          onToggleSelect={onToggleSelect}
          onToggleSelectAll={onToggleSelectAll}
          allSelected={allSelected}
        />
        <CustomerGroupMobile 
          groupCustomers={groupCustomers}
          onSelectCustomer={onSelectCustomer}
          selectedCustomers={selectedCustomers}
          onToggleSelect={onToggleSelect}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

interface CustomerTableProps {
  groupCustomers: Customer[];
  onSelectCustomer: (id: number) => void;
  selectedCustomers: number[];
  onToggleSelect: (id: number) => void;
  onToggleSelectAll?: () => void;
  allSelected: boolean;
}

function CustomerGroupTable({
  groupCustomers,
  onSelectCustomer,
  selectedCustomers,
  onToggleSelect,
  onToggleSelectAll,
  allSelected
}: CustomerTableProps) {
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

interface CustomerMobileProps {
  groupCustomers: Customer[];
  onSelectCustomer: (id: number) => void;
  selectedCustomers: number[];
  onToggleSelect: (id: number) => void;
}

function CustomerGroupMobile({
  groupCustomers,
  onSelectCustomer,
  selectedCustomers,
  onToggleSelect
}: CustomerMobileProps) {
  return (
    <div className="sm:hidden space-y-2 p-2">
      {groupCustomers.map((customer) => (
        <div 
          key={customer.id}
          className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 space-y-2"
          onClick={() => onSelectCustomer(customer.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={selectedCustomers.includes(customer.id)}
                onCheckedChange={() => onToggleSelect(customer.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="font-medium">{customer.shortNameCn}</div>
            </div>
            <ProgressBadge progress={customer.progress} />
          </div>
          
          <div className="text-sm space-y-1">
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
                <DepartmentBadges departments={customer.sponsorDepartments} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
