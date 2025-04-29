
import { TagManagementDialog } from "@/components/management/TagManagementDialog";
import { ContactTypeManagementDialog } from "@/components/management/ContactTypeManagementDialog";
import { NewCustomerDialog } from "@/components/NewCustomerDialog";
import type { Customer } from "@/pages/Index";

interface ManagementDialogsProps {
  showNewCustomerDialog: boolean;
  setShowNewCustomerDialog: (show: boolean) => void;
  showTagManagement: boolean;
  setShowTagManagement: (show: boolean) => void;
  showContactTypeManagement: boolean;
  setShowContactTypeManagement: (show: boolean) => void;
  handleAddCustomer: (customer: Partial<Customer>) => void;
  tagOptions: string[];
  productOptions: string[];
  contactTypes: string[];
  onUpdateTags: (tags: string[]) => void;
  onUpdateContactTypes: (types: string[]) => void;
}

export function ManagementDialogs({
  showNewCustomerDialog,
  setShowNewCustomerDialog,
  showTagManagement,
  setShowTagManagement,
  showContactTypeManagement,
  setShowContactTypeManagement,
  handleAddCustomer,
  tagOptions,
  productOptions,
  contactTypes,
  onUpdateTags,
  onUpdateContactTypes
}: ManagementDialogsProps) {
  return (
    <>
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
        onUpdate={onUpdateTags}
      />
      
      <ContactTypeManagementDialog
        open={showContactTypeManagement}
        onOpenChange={setShowContactTypeManagement}
        contactTypes={contactTypes}
        onUpdate={onUpdateContactTypes}
      />
    </>
  );
}
