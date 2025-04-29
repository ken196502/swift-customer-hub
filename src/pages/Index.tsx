
import { useState } from "react";
import { Search, File, PlusCircle, Tags, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerFilters } from "@/components/CustomerFilters";
import { CustomerDetail } from "@/components/CustomerDetail";
import { NewCustomerDialog } from "@/components/NewCustomerDialog";
import { useToast } from "@/hooks/use-toast";
import { CustomerList } from "@/components/customer/CustomerList";
import { TagManagementDialog } from "@/components/management/TagManagementDialog";
import { ContactTypeManagementDialog } from "@/components/management/ContactTypeManagementDialog";

export interface Customer {
  id: number;
  customerNumber: string;
  groupName: string;
  nameEn: string;
  shortNameEn: string;
  fullNameEn: string;
  shortNameCn: string;
  fullNameCn: string;
  type: string;
  isListed: boolean;
  stockCode: string;
  city: string;
  idType: string;
  idNumber: string;
  shareholders: string;
  actualController: string;
  registeredCapital: string;
  establishDate: string;
  registeredAddress: string;
  legalRepresentative: string;
  riskLevel: string;
  entryDate: string;
  activeStatus: string;
  products: string[];
  tags: string[];
}

// Updated mock data
const initialCustomers: Customer[] = [
  {
    id: 1,
    customerNumber: "C20240001",
    groupName: "小米集团",
    nameEn: "Xiaomi Auto",
    shortNameEn: "Xiaomi Auto",
    fullNameEn: "Xiaomi Automobile Co., Ltd.",
    shortNameCn: "小米汽车",
    fullNameCn: "小米汽车有限责任公司",
    type: "公司户",
    isListed: true,
    stockCode: "1810.HK",
    city: "北京",
    idType: "统一社会信用代码",
    idNumber: "91110000XXXXX",
    shareholders: "雷军,小米科技",
    actualController: "雷军",
    registeredCapital: "100亿元",
    establishDate: "2021-09-01",
    registeredAddress: "北京市海淀区清河中街68号",
    legalRepresentative: "雷军",
    riskLevel: "低",
    entryDate: "2019-10-01",
    activeStatus: "活跃",
    products: ["股票交易", "咨询", "债券交易", "IPO", "发债"],
    tags: ["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"],
  }
];

export default function Index() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [showTagManagement, setShowTagManagement] = useState(false);
  const [showContactTypeManagement, setShowContactTypeManagement] = useState(false);
  const [productOptions, setProductOptions] = useState<string[]>(["股票交易", "咨询", "债券交易", "IPO", "发债"]);
  const [tagOptions, setTagOptions] = useState<string[]>(["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"]);
  const [contactTypes, setContactTypes] = useState<string[]>(["电话", "会议", "邮件", "拜访", "社交活动"]);
  const { toast } = useToast();

  const handleAddCustomer = (newCustomer: Partial<Customer>) => {
    const nextId = Math.max(...customers.map(c => c.id)) + 1;
    
    const customer = {
      ...newCustomer,
      id: nextId,
      customerNumber: newCustomer.customerNumber || `C${new Date().getFullYear()}${String(nextId).padStart(4, '0')}`,
      products: newCustomer.products || [],
      tags: newCustomer.tags || [],
    } as Customer;
    
    setCustomers([...customers, customer]);
    
    toast({
      title: "操作成功",
      description: "新客户已添加",
    });
  };

  const handleUpdateCustomer = (updatedCustomer: Partial<Customer>) => {
    setCustomers(customers.map(c => 
      c.id === updatedCustomer.id ? { ...c, ...updatedCustomer } as Customer : c
    ));
    
    toast({
      title: "操作成功",
      description: "客户信息已更新",
    });
  };

  const handleUpdateTags = (updatedTags: string[]) => {
    setTagOptions(updatedTags);
  };

  const handleUpdateContactTypes = (updatedContactTypes: string[]) => {
    setContactTypes(updatedContactTypes);
  };

  if (selectedCustomer !== null) {
    const customer = customers.find((c) => c.id === selectedCustomer);
    if (customer) {
      return (
        <div className="container mx-auto py-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">客户详情</h1>
            <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
              返回列表
            </Button>
          </div>
          <CustomerDetail 
            customer={customer} 
            onEditCustomer={(updatedCustomer) => handleUpdateCustomer(updatedCustomer)}
            contactTypes={contactTypes}
          />
        </div>
      );
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">客户关系管理系统</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowTagManagement(true)}
          >
            <Tags className="h-4 w-4" />
            管理标签
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowContactTypeManagement(true)}
          >
            <List className="h-4 w-4" />
            管理联系类型
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <CustomerFilters />

        <div className="flex flex-wrap gap-2">
          <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">
            <Search className="h-4 w-4 mr-2" />
            查询
          </Button>
          <Button variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600">
            <File className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="bg-green-500 hover:bg-green-600"
            onClick={() => setShowNewCustomerDialog(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            新建
          </Button>
        </div>

        <CustomerList 
          customers={customers} 
          onSelectCustomer={customerId => setSelectedCustomer(customerId)} 
        />
      </div>
      
      <NewCustomerDialog 
        open={showNewCustomerDialog} 
        onOpenChange={setShowNewCustomerDialog}
        onSubmit={handleAddCustomer}
        productOptions={productOptions}
        tagOptions={tagOptions}
      />
      
      <TagManagementDialog
        open={showTagManagement}
        onOpenChange={setShowTagManagement}
        tags={tagOptions}
        onUpdate={handleUpdateTags}
      />
      
      <ContactTypeManagementDialog
        open={showContactTypeManagement}
        onOpenChange={setShowContactTypeManagement}
        contactTypes={contactTypes}
        onUpdate={handleUpdateContactTypes}
      />
    </div>
  );
}
