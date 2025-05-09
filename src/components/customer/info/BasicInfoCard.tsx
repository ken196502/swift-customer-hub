
import { Customer } from "@/contexts/CustomerContext";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getCountryEmoji } from "@/utils/countryEmojis";

interface BasicInfoCardProps {
  customer: Customer;
}

export function BasicInfoCard({ customer }: BasicInfoCardProps) {
  const isPersonalCustomer = customer.type === "个人户";
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-muted py-2 px-4">
          <h3 className="text-sm font-medium">基本信息</h3>
        </div>
        <dl className="divide-y">
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">客户编号</dt>
            <dd className="col-span-2 text-sm">{customer.customerNumber || "-"}</dd>
          </div>
          
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">客户类型</dt>
            <dd className="col-span-2 text-sm">{customer.type || "-"}</dd>
          </div>
          
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">风险等级</dt>
            <dd className="col-span-2 text-sm">
              <span className={cn(
                "px-2 py-0.5 text-xs rounded-full font-medium",
                customer.riskLevel === "高" ? "bg-red-100 text-red-800" :
                customer.riskLevel === "中" ? "bg-yellow-100 text-yellow-800" :
                "bg-green-100 text-green-800"
              )}>
                {customer.riskLevel || "低"}
              </span>
            </dd>
          </div>
          
          {/* Added active status to basic information as requested */}
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">活跃状态</dt>
            <dd className="col-span-2 text-sm">
              <span className={cn(
                "px-2 py-0.5 text-xs rounded-full font-medium",
                customer.activeStatus === "活跃" ? "bg-green-100 text-green-800" :
                customer.activeStatus === "一般" ? "bg-blue-100 text-blue-800" :
                "bg-gray-100 text-gray-800"
              )}>
                {customer.activeStatus || "-"}
              </span>
            </dd>
          </div>
          
          {/* Added development progress to basic information as requested */}
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">开发进度</dt>
            <dd className="col-span-2 text-sm">
              <span className={cn(
                "px-2 py-0.5 text-xs rounded-full font-medium",
                customer.progress === "已开户" ? "bg-green-100 text-green-800" :
                customer.progress === "意向" ? "bg-yellow-100 text-yellow-800" :
                "bg-gray-100 text-gray-800"
              )}>
                {customer.progress || "-"}
              </span>
            </dd>
          </div>
          
          {isPersonalCustomer ? (
            <>
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">中文名称</dt>
                <dd className="col-span-2 text-sm">{customer.shortNameCn || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">英文名称</dt>
                <dd className="col-span-2 text-sm">{customer.shortNameEn || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">手机号</dt>
                <dd className="col-span-2 text-sm">{customer.phone || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">邮箱</dt>
                <dd className="col-span-2 text-sm">{customer.email || "-"}</dd>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">中文简称</dt>
                <dd className="col-span-2 text-sm">{customer.shortNameCn || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">中文全称</dt>
                <dd className="col-span-2 text-sm">{customer.fullNameCn || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">英文简称</dt>
                <dd className="col-span-2 text-sm">{customer.shortNameEn || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">英文全称</dt>
                <dd className="col-span-2 text-sm">{customer.fullNameEn || "-"}</dd>
              </div>
            </>
          )}
          
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">国家/地区</dt>
            <dd className="col-span-2 text-sm">
              <div className="flex items-center">
                {customer.country && (
                  <span className="mr-2 text-base">{getCountryEmoji(customer.country)}</span>
                )}
                {customer.country || "-"}
              </div>
            </dd>
          </div>
          
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">城市</dt>
            <dd className="col-span-2 text-sm">{customer.city || "-"}</dd>
          </div>
          
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">证件类型</dt>
            <dd className="col-span-2 text-sm">{customer.idType || "-"}</dd>
          </div>
          
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">证件号码</dt>
            <dd className="col-span-2 text-sm">{customer.idNumber || "-"}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
