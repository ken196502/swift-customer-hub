
import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { Customer, CustomerContextType } from "./customer/customerTypes";
import { 
  initialCustomers, 
  initialProductOptions, 
  initialTagOptions, 
  initialContactTypes, 
  initialGroupOptions 
} from "./customer/mockData";

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [showTagManagement, setShowTagManagement] = useState(false);
  const [showContactTypeManagement, setShowContactTypeManagement] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [productOptions, setProductOptions] = useState<string[]>(initialProductOptions);
  const [tagOptions, setTagOptions] = useState<string[]>(initialTagOptions);
  const [contactTypes, setContactTypes] = useState<string[]>(initialContactTypes);
  const [groupOptions, setGroupOptions] = useState<string[]>(initialGroupOptions);
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

// Re-export the Customer type for convenience
export type { Customer } from "./customer/customerTypes";
