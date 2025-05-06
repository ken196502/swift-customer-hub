
import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

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

// Initial mock data
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
  },
  {
    id: 2,
    customerNumber: "C20240002",
    groupName: "小米集团",
    nameEn: "Xiaomi Tech",
    shortNameEn: "Xiaomi Tech",
    fullNameEn: "Xiaomi Technology Co., Ltd.",
    shortNameCn: "小米科技",
    fullNameCn: "小米科技有限公司",
    type: "公司户",
    isListed: true,
    stockCode: "1810.HK",
    city: "北京",
    idType: "统一社会信用代码",
    idNumber: "91110000YYYYY",
    shareholders: "雷军",
    actualController: "雷军",
    registeredCapital: "120亿元",
    establishDate: "2010-04-06",
    registeredAddress: "北京市海淀区安宁庄路66号",
    legalRepresentative: "雷军",
    riskLevel: "低",
    entryDate: "2018-05-15",
    activeStatus: "活跃",
    products: ["股票交易", "咨询", "债券交易"],
    tags: ["零售经纪", "机构经纪"],
  }
];

interface CustomerContextType {
  customers: Customer[];
  selectedCustomer: number | null;
  viewMode: "customer" | "group";
  showNewCustomerDialog: boolean;
  showTagManagement: boolean;
  showContactTypeManagement: boolean;
  showGroupManagement: boolean;
  productOptions: string[];
  tagOptions: string[];
  contactTypes: string[];
  groupOptions: string[];
  setSelectedCustomer: (id: number | null) => void;
  setShowNewCustomerDialog: (show: boolean) => void;
  setShowTagManagement: (show: boolean) => void;
  setShowContactTypeManagement: (show: boolean) => void;
  setShowGroupManagement: (show: boolean) => void;
  toggleViewMode: () => void;
  handleAddCustomer: (newCustomer: Partial<Customer>) => void;
  handleUpdateCustomer: (updatedCustomer: Partial<Customer>) => void;
  handleUpdateTags: (updatedTags: string[]) => void;
  handleUpdateContactTypes: (updatedContactTypes: string[]) => void;
  handleUpdateGroups: (updatedGroups: string[]) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [showTagManagement, setShowTagManagement] = useState(false);
  const [showContactTypeManagement, setShowContactTypeManagement] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [productOptions, setProductOptions] = useState<string[]>(["股票交易", "咨询", "债券交易", "IPO", "发债"]);
  const [tagOptions, setTagOptions] = useState<string[]>(["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"]);
  const [contactTypes, setContactTypes] = useState<string[]>(["电话", "会议", "邮件", "拜访", "社交活动"]);
  const [groupOptions, setGroupOptions] = useState<string[]>(["小米集团", "腾讯", "阿里", "字节"]);
  const [viewMode, setViewMode] = useState<"customer" | "group">("customer");
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

  const handleUpdateGroups = (updatedGroups: string[]) => {
    setGroupOptions(updatedGroups);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "customer" ? "group" : "customer");
  };

  const value = {
    customers,
    selectedCustomer,
    viewMode,
    showNewCustomerDialog,
    showTagManagement,
    showContactTypeManagement,
    showGroupManagement,
    productOptions,
    tagOptions,
    contactTypes,
    groupOptions,
    setSelectedCustomer,
    setShowNewCustomerDialog,
    setShowTagManagement,
    setShowContactTypeManagement,
    setShowGroupManagement,
    toggleViewMode,
    handleAddCustomer,
    handleUpdateCustomer,
    handleUpdateTags,
    handleUpdateContactTypes,
    handleUpdateGroups,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
