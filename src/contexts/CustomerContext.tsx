
import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { Customer, CustomerContextType } from "./customer/customerTypes";
import { 
  initialCustomers, 
  initialProductOptions,  
  initialContactTypes, 
  initialGroupOptions 
} from "./customer/mockData";

// List of departments
const departmentList = ["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"];

// List of countries
const countryList = [
  "中国内地", "美国", "英国", "日本", "德国", "法国", "意大利", "加拿大", "澳大利亚", "新西兰",
  "俄罗斯", "印度", "巴西", "南非", "墨西哥", "阿根廷", "西班牙", "葡萄牙", "荷兰", "比利时",
  "瑞士", "瑞典", "挪威", "芬兰", "丹麦", "奥地利", "希腊", "土耳其", "埃及", "沙特阿拉伯",
  "阿联酋", "卡塔尔", "新加坡", "马来西亚", "泰国", "印度尼西亚", "菲律宾", "韩国", "朝鲜", "越南"
].sort();

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(
    initialCustomers.map(customer => {
      if (customer.type === "公司户") {
        return {
          ...customer,
          country: "中国内地"
        };
      } else {
        return customer;
      }
    })
  );
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [showContactTypeManagement, setShowContactTypeManagement] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [showSponsorDepartmentDialog, setShowSponsorDepartmentDialog] = useState(false);
  const [productOptions, setProductOptions] = useState<string[]>(initialProductOptions);
  const [contactTypes, setContactTypes] = useState<string[]>([...initialContactTypes, "其他"]);
  const [groupOptions, setGroupOptions] = useState<string[] | { cn: string; en: string }[]>(initialGroupOptions);
  const [viewMode, setViewMode] = useState<"customer" | "group">("customer");
  const { toast } = useToast();

  const toggleSelectCustomer = (id: number) => {
    setSelectedCustomers(prev => 
      prev.includes(id) 
        ? prev.filter(customerId => customerId !== id)
        : [...prev, id]
    );
  };

  const generateCustomerNumber = () => {
    const nextId = Math.max(...customers.map(c => c.id), 0) + 1;
    return `TFI${new Date().getFullYear()}${String(nextId).padStart(4, '0')}`;
  };

  const handleAddCustomer = (newCustomer: Partial<Customer>) => {
    const nextId = Math.max(...customers.map(c => c.id), 0) + 1;
    
    const customer = {
      ...newCustomer,
      id: nextId,
      customerNumber: generateCustomerNumber(),
      products: newCustomer.products || [],
      reaches: newCustomer.reaches || [],
      sponsorDepartments: newCustomer.sponsorDepartments || [],
      entryDepartment: newCustomer.entryDepartment || departmentList[0],
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

  const handleUpdateContactTypes = (updatedContactTypes: string[]) => {
    // Always ensure "其他" is in the list
    if (!updatedContactTypes.includes("其他")) {
      updatedContactTypes.push("其他");
    }
    setContactTypes(updatedContactTypes);
  };

  const handleUpdateGroups = (updatedGroups: string[]) => {
    setGroupOptions(updatedGroups);
  };

  const handleUpdateSponsorDepartments = (customerIds: number[], departments: string[]) => {
    setCustomers(customers.map(customer => 
      customerIds.includes(customer.id)
        ? { ...customer, sponsorDepartments: departments }
        : customer
    ));
    
    toast({
      title: "操作成功",
      description: `已更新${customerIds.length}个客户的主办部门`,
    });
    
    // Clear selection after setting departments
    setSelectedCustomers([]);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "customer" ? "group" : "customer");
  };

  const value = {
    customers,
    selectedCustomer,
    selectedCustomers,
    viewMode,
    showNewCustomerDialog,
    showContactTypeManagement,
    showGroupManagement,
    showSponsorDepartmentDialog,
    productOptions,
    contactTypes,
    groupOptions,
    countries: countryList,
    departments: departmentList,
    setSelectedCustomer,
    toggleSelectCustomer,
    setShowNewCustomerDialog,
    setShowContactTypeManagement,
    setShowGroupManagement,
    setShowSponsorDepartmentDialog,
    toggleViewMode,
    handleAddCustomer,
    handleUpdateCustomer,
    handleUpdateContactTypes,
    handleUpdateGroups,
    handleUpdateSponsorDepartments,
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

// Re-export the Customer type for convenience
export type { Customer } from "./customer/customerTypes";
