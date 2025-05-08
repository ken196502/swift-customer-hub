import { ContactTypeManagementDialog } from "@/components/management/ContactTypeManagementDialog";
import { GroupManagementDialog } from "@/components/management/GroupManagementDialog";
import { NewCustomerDialog } from "@/components/NewCustomerDialog";
import { Customer } from "@/contexts/CustomerContext";

interface ManagementDialogsProps {
  showNewCustomerDialog: boolean;
  setShowNewCustomerDialog: (show: boolean) => void;
  showContactTypeManagement: boolean;
  setShowContactTypeManagement: (show: boolean) => void;
  showGroupManagement: boolean;
  setShowGroupManagement: (show: boolean) => void;
  handleAddCustomer: (customer: Partial<Customer>) => void;
  productOptions: string[];
  contactTypes: string[];
  groupOptions: string[];
  onUpdateContactTypes: (types: string[]) => void;
  onUpdateGroups: (groups: string[]) => void;
}

export function ManagementDialogs({
  showNewCustomerDialog,
  setShowNewCustomerDialog,
  showContactTypeManagement,
  setShowContactTypeManagement,
  showGroupManagement,
  setShowGroupManagement,
  handleAddCustomer,
  productOptions,
  contactTypes,
  groupOptions,
  onUpdateContactTypes,
  onUpdateGroups
}: ManagementDialogsProps) {
  return (
    <>
      <NewCustomerDialog 
        open={showNewCustomerDialog} 
        onOpenChange={setShowNewCustomerDialog}
        onSubmit={handleAddCustomer}
        productOptions={productOptions}
        groupOptions={groupOptions}
      />      
      <ContactTypeManagementDialog
        open={showContactTypeManagement}
        onOpenChange={setShowContactTypeManagement}
        contactTypes={contactTypes}
        onUpdate={onUpdateContactTypes}
      />

      <GroupManagementDialog
        open={showGroupManagement}
        onOpenChange={setShowGroupManagement}
        groups={groupOptions}
        onUpdate={onUpdateGroups}
      />
    </>
  );
}
