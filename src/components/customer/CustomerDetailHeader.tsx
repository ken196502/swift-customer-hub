
import { Customer } from "@/contexts/CustomerContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTooltipContext } from "@/contexts/TooltipContext";

interface CustomerDetailHeaderProps {
  customer: Customer;
}

export function CustomerDetailHeader({ customer }: CustomerDetailHeaderProps) {
  const { alwaysShowTooltips } = useTooltipContext();
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h2 className="text-xl font-bold cursor-help">{customer.fullNameCn}</h2>
            </TooltipTrigger>
            <TooltipContent>
              客户姓名: {customer.fullNameCn}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center text-sm text-gray-500 space-x-8">
        {customer.type !== "个人户" && (
          <div className="flex items-center space-x-2">
            <span>所属集团:</span>
            <span className="text-gray-700">{customer.groupName}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <span>录入时间:</span>
          <span className="text-gray-700">{customer.entryDate}</span>
        </div>
      </div>
    </div>
  );
}
