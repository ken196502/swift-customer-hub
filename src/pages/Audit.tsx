
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AuditContent } from "@/components/audit/AuditContent";
import { AuditFilters } from "@/components/audit/AuditFilters";

// Define the audit item type
export interface AuditItem {
  id: number;
  submitTime: string;
  customer: string;
  type: "新增" | "修改" | "删除" | "权限变更";
  category: "客户信息" | "触达记录" | "共享权限";
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
  },
  {
    id: 8,
    submitTime: "2025-04-19 09:30",
    customer: "阿里",
    type: "权限变更",
    category: "共享权限",
    before: "部门: 机构经纪\n内容: 触达记录\n产品: 股票交易",
    after: "部门: 机构经纪, DCM\n内容: 触达记录, 客户画像\n产品: 股票交易, 发债",
    note: "新增DCM部门查看权限",
    submitter: "孙八",
    status: "pending"
  },
  {
    id: 9,
    submitTime: "2025-04-18 14:45",
    customer: "百度",
    type: "权限变更",
    category: "共享权限",
    before: "",
    after: "部门: 零售经纪\n内容: 触达记录\n产品: 咨询",
    note: "新增查看权限",
    submitter: "王五",
    status: "approved"
  }
];

export default function Audit() {
  const [auditItems, setAuditItems] = useState<AuditItem[]>(mockAuditItems);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const handleApprove = (ids: number[], reason?: string) => {
    setAuditItems(
      auditItems.map(item => 
        ids.includes(item.id) ? { ...item, status: "approved", note: reason || item.note } : item
      )
    );
  };

  const handleReject = (ids: number[], reason?: string) => {
    setAuditItems(
      auditItems.map(item => 
        ids.includes(item.id) ? { ...item, status: "rejected", note: reason || item.note } : item
      )
    );
  };

  // Filter items based on selected category
  const filteredItems = selectedCategory 
    ? auditItems.filter(item => item.category === selectedCategory)
    : auditItems;
    
  const pendingItems = filteredItems.filter(item => item.status === "pending");
  const processedItems = filteredItems.filter(item => item.status !== "pending");

  useEffect(() => {
    const handleApproveEvent = (e: CustomEvent) => {
      const { ids, reason } = e.detail;
      handleApprove(ids, reason);
    };

    const handleRejectEvent = (e: CustomEvent) => {
      const { ids, reason } = e.detail;
      handleReject(ids, reason);
    };

    window.addEventListener('audit:approve', handleApproveEvent as EventListener);
    window.addEventListener('audit:reject', handleRejectEvent as EventListener);

    return () => {
      window.removeEventListener('audit:approve', handleApproveEvent as EventListener);
      window.removeEventListener('audit:reject', handleRejectEvent as EventListener);
    };
  }, [auditItems]);

  return (
    <div className="container mx-auto py-6 space-y-6" style={{ width: "120%" }}>
      <h1 className="text-2xl font-bold text-left">审核管理</h1>
      
      <AuditFilters 
        categoryFilter={selectedCategory} 
        onCategoryChange={setSelectedCategory}
      />

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="pending">待审核</TabsTrigger>
          <TabsTrigger value="processed">已审核</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <AuditContent items={pendingItems} isPending={true} />
        </TabsContent>

        <TabsContent value="processed">
          <AuditContent items={processedItems} isPending={false} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
