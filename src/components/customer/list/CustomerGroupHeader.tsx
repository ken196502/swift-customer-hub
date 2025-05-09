
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
  );
}
