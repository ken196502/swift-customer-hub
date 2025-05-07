
import { Badge } from "@/components/ui/badge";
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
import { getTagColor, getProductColor } from "@/utils/colorUtils";

interface CustomerGroupViewProps {
  customers: Customer[];
  onSelectCustomer: (id: number) => void;
}

export function CustomerGroupView({ customers, onSelectCustomer }: CustomerGroupViewProps) {
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

  // Helper function to get unique tags across all customers in a group
  const getGroupTags = (groupCustomers: Customer[]) => {
    const uniqueTags = new Set<string>();
    groupCustomers.forEach(customer => {
      customer.tags.forEach(tag => uniqueTags.add(tag));
    });
    return Array.from(uniqueTags);
  };

  return (
    <div className="border rounded-md">
      <Accordion type="multiple" className="w-full">
        {groupEntries.map(([groupName, groupCustomers]) => (
          <AccordionItem key={groupName} value={groupName}>
            <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <span className="font-medium">{groupName}</span>
                  <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {groupCustomers.length} 个客户
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-wrap gap-1">
                    {getGroupProducts(groupCustomers).map((product) => (
                      <Badge
                        key={product}
                        variant="outline"
                        className={getProductColor(product)}
                      >
                        {product}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {getGroupTags(groupCustomers).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={getTagColor(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>客户号</TableHead>
                    <TableHead>客户名称</TableHead>
                    <TableHead>客户类型</TableHead>
                    <TableHead>提供产品</TableHead>
                    <TableHead>触达部门(按触达先后排列)</TableHead>
                    <TableHead>录入时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => onSelectCustomer(customer.id)}
                    >
                      <TableCell>{customer.customerNumber}</TableCell>
                      <TableCell>
                        <div className="font-medium">{customer.shortNameCn}</div>
                      </TableCell>
                      <TableCell>{customer.type}</TableCell>
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
