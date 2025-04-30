
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditTable } from "@/components/audit/AuditTable";
import { AuditFilters } from "@/components/audit/AuditFilters";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Download } from "lucide-react";

// Define the audit item type
export interface AuditItem {
  id: number;
  submitTime: string;
  customer: string;
  type: "新增" | "修改" | "删除";
  before: string;
  after: string;
  note: string;
  submitter: string;
  status: "pending" | "approved" | "rejected";
}

// Mock data for demonstration
const mockAuditItems: AuditItem[] = [
  {
    id: 1,
    submitTime: "2025-04-25 14:30",
    customer: "小米集团",
    type: "新增",
    before: "",
    after: "客户名称: 小米汽车\n联系人: 张三\n电话: 13800138000",
    note: "",
    submitter: "李四",
    status: "pending"
  },
  {
    id: 2,
    submitTime: "2025-04-26 09:15",
    customer: "腾讯",
    type: "修改",
    before: "客户名称: 腾讯科技\n联系人: 王五\n电话: 13900139000",
    after: "客户名称: 腾讯科技\n联系人: 王五\n电话: 13911139111",
    note: "",
    submitter: "赵六",
    status: "pending"
  },
  {
    id: 3,
    submitTime: "2025-04-24 16:45",
    customer: "阿里",
    type: "删除",
    before: "客户名称: 阿里巴巴\n联系人: 钱七\n电话: 13700137000",
    after: "",
    note: "重复客户",
    submitter: "孙八",
    status: "approved"
  },
  {
    id: 4,
    submitTime: "2025-04-23 10:30",
    customer: "字节",
    type: "修改",
    before: "客户名称: 字节跳动\n联系人: 周九\n电话: 13600136000",
    after: "客户名称: 字节跳动\n联系人: 周九\n电话: 13612136123\n地址: 北京市海淀区",
    note: "更新地址信息",
    submitter: "吴十",
    status: "rejected"
  },
  {
    id: 5,
    submitTime: "2025-04-22 14:00",
    customer: "百度",
    type: "新增",
    before: "",
    after: "客户名称: 百度\n联系人: 郑十一\n电话: 13500135000",
    note: "",
    submitter: "王五",
    status: "approved"
  }
];

export default function Audit() {
  const [auditItems, setAuditItems] = useState<AuditItem[]>(mockAuditItems);
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    setAuditItems(
      auditItems.map(item => 
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
    toast({
      title: "操作成功",
      description: "已通过该审核项",
    });
  };

  const handleReject = (id: number) => {
    setAuditItems(
      auditItems.map(item => 
        item.id === id ? { ...item, status: "rejected" } : item
      )
    );
    toast({
      title: "操作成功",
      description: "已驳回该审核项",
    });
  };

  const handleExport = () => {
    toast({
      title: "导出成功",
      description: "审核数据已导出",
    });
  };

  const pendingItems = auditItems.filter(item => item.status === "pending");
  const processedItems = auditItems.filter(item => item.status !== "pending");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">审核管理</h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="pending">待审核</TabsTrigger>
          <TabsTrigger value="processed">已审核</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <AuditFilters />
          <AuditTable 
            items={pendingItems}
            actionColumn={
              (id: number) => (
                <div className="flex space-x-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleApprove(id)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    通过
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleReject(id)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    驳回
                  </Button>
                </div>
              )
            }
          />
        </TabsContent>

        <TabsContent value="processed" className="space-y-4">
          <AuditFilters />
          <div className="flex justify-end mb-4">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>
          <AuditTable 
            items={processedItems}
            showStatus={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
