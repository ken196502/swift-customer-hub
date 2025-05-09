
import { Customer } from "@/contexts/CustomerContext";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DetailedInfoCardProps {
  customer: Customer;
}

export function DetailedInfoCard({ customer }: DetailedInfoCardProps) {
  const isPersonalCustomer = customer.type === "个人户";
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-muted py-2 px-4">
          <h3 className="text-sm font-medium">详细信息</h3>
        </div>
        <dl className="divide-y">
          {!isPersonalCustomer && (
            <>
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">所属集团</dt>
                <dd className="col-span-2 text-sm">{customer.groupName || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">是否上市</dt>
                <dd className="col-span-2 text-sm">{customer.isListed ? "是" : "否"}</dd>
              </div>
              
              {customer.isListed && (
                <div className="grid grid-cols-3 py-2 px-4">
                  <dt className="col-span-1 text-sm font-medium text-muted-foreground">股票代码</dt>
                  <dd className="col-span-2 text-sm">{customer.stockCode || "-"}</dd>
                </div>
              )}
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">主要股东</dt>
                <dd className="col-span-2 text-sm">{customer.shareholders || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">实际控制人</dt>
                <dd className="col-span-2 text-sm">{customer.actualController || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">注册资本</dt>
                <dd className="col-span-2 text-sm">{customer.registeredCapital || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">注册地址</dt>
                <dd className="col-span-2 text-sm">{customer.registeredAddress || "-"}</dd>
              </div>
              
              <div className="grid grid-cols-3 py-2 px-4">
                <dt className="col-span-1 text-sm font-medium text-muted-foreground">法定代表人</dt>
                <dd className="col-span-2 text-sm">{customer.legalRepresentative || "-"}</dd>
              </div>
            </>
          )}
          
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">录入日期</dt>
            <dd className="col-span-2 text-sm">{customer.entryDate || "-"}</dd>
          </div>
          
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">录入部门</dt>
            <dd className="col-span-2 text-sm">{customer.entryDepartment || "-"}</dd>
          </div>
          
          <div className="grid grid-cols-3 py-2 px-4">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">主办部门</dt>
            <dd className="col-span-2 text-sm">{(customer.sponsorDepartments || []).join(', ') || "-"}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
