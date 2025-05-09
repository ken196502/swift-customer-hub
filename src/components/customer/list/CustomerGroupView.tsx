
import {
  Accordion
} from "@/components/ui/accordion";
import { Customer } from "@/contexts/CustomerContext";
import { GroupAccordionItem } from "./GroupAccordionItem";

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
