
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
  reaches: string[];
}

export interface CustomerContextType {
  customers: Customer[];
  selectedCustomer: number | null;
  viewMode: "customer" | "group";
  showNewCustomerDialog: boolean;
  showContactTypeManagement: boolean;
  showGroupManagement: boolean;
  productOptions: string[];
  contactTypes: string[];
  groupOptions: string[];
  setSelectedCustomer: (id: number | null) => void;
  setShowNewCustomerDialog: (show: boolean) => void;
  setShowContactTypeManagement: (show: boolean) => void;
  setShowGroupManagement: (show: boolean) => void;
  toggleViewMode: () => void;
  handleAddCustomer: (newCustomer: Partial<Customer>) => void;
  handleUpdateCustomer: (updatedCustomer: Partial<Customer>) => void;
  handleUpdateContactTypes: (updatedContactTypes: string[]) => void;
  handleUpdateGroups: (updatedGroups: string[]) => void;
}
