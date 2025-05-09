
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/contexts/CustomerContext";

interface CustomerGroupHeaderProps {
  groupName: string;
  groupCustomers: Customer[];
  getGroupProducts: (customers: Customer[]) => string[];
}

export function CustomerGroupHeader({ 
  groupName, 
  groupCustomers, 
  getGroupProducts 
}: CustomerGroupHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="whitespace-nowrap">
        <p className="text-sm">{groupName}</p>
        <p className="text-xs text-muted-foreground"> {groupCustomers.length} 个客户</p>
      </div>
      <div className="flex flex-wrap gap-1 w-1/2 md:w-full justify-end">
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
  );
}
