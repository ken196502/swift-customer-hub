
import { useState } from "react";
import { CustomerFilters } from "@/components/CustomerFilters";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerDetailView } from "@/components/customer/CustomerDetailView";
import { ManagementDialogs } from "@/components/customer/ManagementDialogs";
import { useCustomer } from "@/contexts/CustomerContext";

export function CustomerContent() {
  const {
    customers,
    selectedCustomer,
    viewMode,
    showNewCustomerDialog,
    showContactTypeManagement,
    showGroupManagement,
    productOptions,
    contactTypes,
    groupOptions,
    setSelectedCustomer,
    setShowNewCustomerDialog,
    setShowContactTypeManagement,
    setShowGroupManagement,
    toggleViewMode,
    handleAddCustomer,
    handleUpdateCustomer,
    handleUpdateContactTypes,
    handleUpdateGroups,
  } = useCustomer();

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
        />
      );
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <CustomerHeader
        onShowNewCustomerDialog={() => setShowNewCustomerDialog(true)}
        onShowContactTypeManagement={() => setShowContactTypeManagement(true)}
        onShowGroupManagement={() => setShowGroupManagement(true)}
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
      />

      <div className="flex flex-col space-y-4">
        <CustomerFilters />
        <CustomerList 
          customers={customers} 
          onSelectCustomer={customerId => setSelectedCustomer(customerId)} 
          viewMode={viewMode}
        />
      </div>
      
      <ManagementDialogs
        showNewCustomerDialog={showNewCustomerDialog}
        setShowNewCustomerDialog={setShowNewCustomerDialog}
        showContactTypeManagement={showContactTypeManagement}
        setShowContactTypeManagement={setShowContactTypeManagement}
        showGroupManagement={showGroupManagement}
        setShowGroupManagement={setShowGroupManagement}
        handleAddCustomer={handleAddCustomer}
        productOptions={productOptions}
        contactTypes={contactTypes}
        groupOptions={groupOptions}
        onUpdateContactTypes={handleUpdateContactTypes}
        onUpdateGroups={handleUpdateGroups}
      />
    </div>
  );
}
