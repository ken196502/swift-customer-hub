
import { Customer } from "@/contexts/CustomerContext";

interface CustomerDetailHeaderProps {
  customer: Customer;
}

export function CustomerDetailHeader({ customer }: CustomerDetailHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{customer.fullNameCn}</h2>
      </div>
      <div className="flex items-center text-sm text-gray-500 space-x-8">
        <div className="flex items-center space-x-2">
          <span>所属集团:</span>
          <span className="text-gray-700">{customer.groupName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>录入时间:</span>
          <span className="text-gray-700">{customer.entryDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>活跃状态:</span>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700">{customer.activeStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
