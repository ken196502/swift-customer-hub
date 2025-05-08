
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
  country?: string;
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
  sponsorDepartments?: string[];
  entryDepartment?: string;
  progress?: "意向" | "已开户";
  phone?: string;
  email?: string;
}

export interface CustomerContextType {
  customers: Customer[];
  selectedCustomer: number | null;
  selectedCustomers: number[];
  viewMode: "customer" | "group";
  showNewCustomerDialog: boolean;
  showContactTypeManagement: boolean;
  showGroupManagement: boolean;
  showSponsorDepartmentDialog: boolean;
  productOptions: string[];
  contactTypes: string[];
  groupOptions: string[];
  countries: string[];
  departments: string[];
  setSelectedCustomer: (id: number | null) => void;
  toggleSelectCustomer: (id: number) => void;
  setShowNewCustomerDialog: (show: boolean) => void;
  setShowContactTypeManagement: (show: boolean) => void;
  setShowGroupManagement: (show: boolean) => void;
  setShowSponsorDepartmentDialog: (show: boolean) => void;
  toggleViewMode: () => void;
  handleAddCustomer: (newCustomer: Partial<Customer>) => void;
  handleUpdateCustomer: (updatedCustomer: Partial<Customer>) => void;
  handleUpdateContactTypes: (updatedContactTypes: string[]) => void;
  handleUpdateGroups: (updatedGroups: string[]) => void;
  handleUpdateSponsorDepartments: (customerIds: number[], departments: string[]) => void;
}
