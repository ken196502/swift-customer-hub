import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditTable } from "@/components/audit/AuditTable";
import { AuditFilters } from "@/components/audit/AuditFilters";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { AuditBatchActions } from "@/components/audit/AuditBatchActions";

// Define the audit item type
export interface AuditItem {
  id: number;
  submitTime: string;
  customer: string;
  type: "新增" | "修改" | "删除";
  category: "客户信息" | "触达记录";
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
    category: "客户信息",
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
    category: "客户信息",
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
    category: "客户信息",
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
    category: "客户信息",
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
    category: "客户信息",
    before: "",
    after: "客户名称: 百度\n联系人: 郑十一\n电话: 13500135000",
    note: "",
    submitter: "王五",
    status: "approved"
  },
  {
    id: 6,
    submitTime: "2025-04-21 11:20",
    customer: "小米集团",
    type: "新增",
    category: "触达记录",
    before: "",
    after: "类型: 电话沟通\n时间: 2025-04-21\n人员: 李四\n部门: 销售部",
    note: "客户咨询新产品",
    submitter: "李四",
    status: "pending"
  },
  {
    id: 7,
    submitTime: "2025-04-20 16:10",
    customer: "腾讯",
    type: "修改",
    category: "触达记录",
    before: "类型: 电话沟通\n时间: 2025-04-20\n人员: 王五",
    after: "类型: 电话沟通\n时间: 2025-04-20\n人员: 王五, 赵六\n备注: 与客户讨论年度计划",
    note: "添加参与人员和备注",
    submitter: "王五",
    status: "approved"
  }
];

export default function Audit() {
  const [auditItems, setAuditItems] = useState<AuditItem[]>(mockAuditItems);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { toast } = useToast();

  const handleItemSelect = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    }
  };

  const handleSelectAll = (isSelected: boolean, items: AuditItem[]) => {
    if (isSelected) {
      setSelectedIds(items.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleApprove = (ids: number[], reason?: string) => {
    setAuditItems(
      auditItems.map(item => 
        ids.includes(item.id) ? { ...item, status: "approved", note: reason || item.note } : item
      )
    );
    setSelectedIds([]);
  };

  const handleReject = (ids: number[], reason?: string) => {
    setAuditItems(
      auditItems.map(item => 
        ids.includes(item.id) ? { ...item, status: "rejected", note: reason || item.note } : item
      )
    );
    setSelectedIds([]);
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
          
          <AuditBatchActions 
            selectedIds={selectedIds} 
            onApprove={handleApprove} 
            onReject={handleReject} 
          />
          
          <AuditTable 
            items={pendingItems}
            selectedIds={selectedIds}
            onItemSelect={handleItemSelect}
            onSelectAll={handleSelectAll}
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
