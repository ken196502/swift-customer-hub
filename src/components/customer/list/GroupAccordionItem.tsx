
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Customer } from "@/contexts/CustomerContext";
import { CustomerGroupHeader } from "./CustomerGroupHeader";
import { CustomerGroupTable } from "./CustomerGroupTable";
import { CustomerGroupMobile } from "./CustomerGroupMobile";

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

export function GroupAccordionItem({
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
        <CustomerGroupHeader 
          groupName={groupName} 
          groupCustomers={groupCustomers} 
          getGroupProducts={getGroupProducts} 
        />
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
