
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
    <div className="mx-auto py-6 space-y-6">
      <CustomerHeader
        onShowNewCustomerDialog={() => setShowNewCustomerDialog(true)}
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="flex-1">全部</TabsTrigger>
          <TabsTrigger value="company" className="flex-1">公司户</TabsTrigger>
          <TabsTrigger value="personal" className="flex-1">个人户</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="flex flex-col space-y-4">
            <CustomerFilters />
            <CustomerList 
              customers={filteredCustomers} 
              onSelectCustomer={customerId => setSelectedCustomer(customerId)} 
              viewMode={viewMode}
              selectedCustomers={selectedCustomers}
              onToggleSelect={toggleSelectCustomer}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="company" className="mt-0">
          <div className="flex flex-col space-y-4">
            <CustomerFilters />
            <CustomerList 
              customers={filteredCustomers} 
              onSelectCustomer={customerId => setSelectedCustomer(customerId)} 
              viewMode={viewMode}
              selectedCustomers={selectedCustomers}
              onToggleSelect={toggleSelectCustomer}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="personal" className="mt-0">
          <div className="flex flex-col space-y-4">
            <CustomerFilters />
            <CustomerList 
              customers={filteredCustomers} 
              onSelectCustomer={customerId => setSelectedCustomer(customerId)} 
              viewMode={viewMode}
              selectedCustomers={selectedCustomers}
              onToggleSelect={toggleSelectCustomer}
            />
          </div>
        </TabsContent>
      </Tabs>
      
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
