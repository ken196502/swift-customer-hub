
import { Customer } from "@/contexts/CustomerContext";
import { CustomerTableView } from "./list/CustomerTableView";
import { CustomerGroupView } from "./list/CustomerGroupView";

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customerId: number) => void;
  viewMode: "customer" | "group";
}

export function CustomerList({ customers, onSelectCustomer, viewMode }: CustomerListProps) {
  if (viewMode === "customer") {
    return <CustomerTableView customers={customers} onSelectCustomer={onSelectCustomer} />;
  } else {
    return <CustomerGroupView customers={customers} onSelectCustomer={onSelectCustomer} />;
  }
}
