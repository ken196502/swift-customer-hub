
import { Checkbox } from "@/components/ui/checkbox";
import { Customer } from "@/contexts/CustomerContext";
import { DepartmentBadges, ProgressBadge } from "./CustomerGroupBadges";

interface CustomerGroupMobileProps {
  groupCustomers: Customer[];
  onSelectCustomer: (id: number) => void;
  selectedCustomers: number[];
  onToggleSelect: (id: number) => void;
}

export function CustomerGroupMobile({
  groupCustomers,
  onSelectCustomer,
  selectedCustomers,
  onToggleSelect
}: CustomerGroupMobileProps) {
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
