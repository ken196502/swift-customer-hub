
import { CustomerFilters } from "@/components/CustomerFilters";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerDetailView } from "@/components/customer/CustomerDetailView";
import { ManagementDialogs } from "@/components/customer/ManagementDialogs";
import { useCustomer } from "@/contexts/CustomerContext";
import { Customer } from "@/contexts/customer/customerTypes";
import { useCustomerAudit } from "@/hooks/use-customer-audit";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function CustomerContent() {
  const {
    customers,
    selectedCustomer,
    selectedCustomers,
    viewMode,
    showNewCustomerDialog,
    productOptions,
    contactTypes,
    groupOptions,
    countries,
    departments,
    setSelectedCustomer,
    toggleSelectCustomer,
    setShowNewCustomerDialog,
    toggleViewMode,
    handleAddCustomer,
    handleUpdateCustomer,
  } = useCustomer();

  const { submitCustomerChanges, setupAuditApprovedListener } = useCustomerAudit({
    onApproved: (newCustomer) => {
      handleAddCustomer(newCustomer);
    }
  });

  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter customers based on the active tab
  const filteredCustomers = customers.filter(customer => {
    if (activeTab === "all") return true;
    if (activeTab === "company") return customer.type === "公司户";
    if (activeTab === "personal") return customer.type === "个人户";
    return true;
  });

  // Set up the listener for audit approvals
  useEffect(() => {
    const cleanupListener = setupAuditApprovedListener();
    return cleanupListener;
  }, []);

  // Handle new customer creation through the audit system
  const handleSubmitNewCustomer = (newCustomer: Partial<Customer>) => {
    submitCustomerChanges(null, newCustomer, true);
    setShowNewCustomerDialog(false);
  };

  if (selectedCustomer !== null) {
    const customer = customers.find((c) => c.id === selectedCustomer);
    if (customer) {
      return (
        <CustomerDetailView
          customer={customer}
          onBack={() => setSelectedCustomer(null)}
          onEditCustomer={handleUpdateCustomer}
          productOptions={productOptions}
          contactTypes={contactTypes}
          groupOptions={groupOptions}
          departments={departments}
          countries={countries}
        />
      );
    }
  }

  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
        <span className="md:block hidden"><h1 className="text-2xl font-bold">客户管理</h1></span>
        <div className='bg-gray-100 rounded-sm'>
          <label
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm cursor-pointer border border-transparent ${activeTab === 'all' ? 'bg-background text-foreground shadow-sm border-border' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <input
              type="radio"
              name="customerType"
              value="all"
              checked={activeTab === 'all'}
              onChange={() => setActiveTab('all')}
              className="sr-only"
            />
            全部
          </label>
          <label
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm cursor-pointer border border-transparent ${activeTab === 'company' ? 'bg-background text-foreground shadow-sm border-border' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <input
              type="radio"
              name="customerType"
              value="company"
              checked={activeTab === 'company'}
              onChange={() => setActiveTab('company')}
              className="sr-only"
            />
            公司户
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <label
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm cursor-pointer border border-transparent ${activeTab === 'personal' ? 'bg-background text-foreground shadow-sm border-border' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <input
                  type="radio"
                  name="customerType"
                  value="personal"
                  checked={activeTab === 'personal'}
                  onChange={() => setActiveTab('personal')}
                  className="sr-only"
                />
                个人户
              </label>
            </TooltipTrigger>
            <TooltipContent>
              <p>个人户为反洗钱等级</p>
            </TooltipContent>
          </Tooltip>
          </div>
        </div>
        <CustomerHeader
          onShowNewCustomerDialog={() => setShowNewCustomerDialog(true)}
          viewMode={viewMode}
          onToggleViewMode={toggleViewMode}
        />
      </div>

      {activeTab === 'all' && (
        <div className="flex flex-col space-y-4">
          <CustomerFilters activeTab={activeTab}  />
          <CustomerList 
            customers={filteredCustomers} 
            onSelectCustomer={customerId => setSelectedCustomer(customerId)} 
            viewMode={viewMode}
            selectedCustomers={selectedCustomers}
            onToggleSelect={toggleSelectCustomer}
          />
        </div>
      )}
      {activeTab === 'company' && (
        <div className="flex flex-col space-y-4">
          <CustomerFilters activeTab={activeTab}  />
          <CustomerList 
            customers={filteredCustomers} 
            onSelectCustomer={customerId => setSelectedCustomer(customerId)} 
            viewMode={viewMode}
            selectedCustomers={selectedCustomers}
            onToggleSelect={toggleSelectCustomer}
          />
        </div>
      )}
      {activeTab === 'personal' && (
        <div className="flex flex-col space-y-4">
          <CustomerFilters activeTab={activeTab}  />
          <CustomerList 
            customers={filteredCustomers} 
            onSelectCustomer={customerId => setSelectedCustomer(customerId)} 
            viewMode={viewMode}
            selectedCustomers={selectedCustomers}
            onToggleSelect={toggleSelectCustomer}
          />
        </div>
      )}
      
      <ManagementDialogs
        showNewCustomerDialog={showNewCustomerDialog}
        setShowNewCustomerDialog={setShowNewCustomerDialog}
        handleAddCustomer={handleSubmitNewCustomer}
        productOptions={productOptions}
        contactTypes={contactTypes}
        groupOptions={groupOptions}
        countries={countries}
        departments={departments}
      />
    </div>
  );
}
