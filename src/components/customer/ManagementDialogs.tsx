import { TagManagementDialog } from "@/components/management/TagManagementDialog";
import { ContactTypeManagementDialog } from "@/components/management/ContactTypeManagementDialog";
import { GroupManagementDialog } from "@/components/management/GroupManagementDialog";
import { NewCustomerDialog } from "@/components/NewCustomerDialog";
import { Customer } from "@/contexts/CustomerContext";

interface ManagementDialogsProps {
  showNewCustomerDialog: boolean;
  setShowNewCustomerDialog: (show: boolean) => void;
  showTagManagement: boolean;
  setShowTagManagement: (show: boolean) => void;
  showContactTypeManagement: boolean;
  setShowContactTypeManagement: (show: boolean) => void;
  showGroupManagement: boolean;
  setShowGroupManagement: (show: boolean) => void;
  handleAddCustomer: (customer: Partial<Customer>) => void;
  tagOptions: string[];
  productOptions: string[];
  contactTypes: string[];
  groupOptions: string[];
  onUpdateTags: (tags: string[]) => void;
  onUpdateContactTypes: (types: string[]) => void;
  onUpdateGroups: (groups: string[]) => void;
}

export function ManagementDialogs({
  showNewCustomerDialog,
  setShowNewCustomerDialog,
  showTagManagement,
  setShowTagManagement,
  showContactTypeManagement,
  setShowContactTypeManagement,
  showGroupManagement,
  setShowGroupManagement,
  handleAddCustomer,
  tagOptions,
  productOptions,
  contactTypes,
  groupOptions,
  onUpdateTags,
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
        tagOptions={tagOptions}
        groupOptions={groupOptions}
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

      <GroupManagementDialog
        open={showGroupManagement}
        onOpenChange={setShowGroupManagement}
        groups={groupOptions}
        onUpdate={onUpdateGroups}
      />
    </>
  );
}
