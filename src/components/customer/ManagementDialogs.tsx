
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/contexts/customer/customerTypes";
import { CustomerFormSection } from "./CustomerFormSection";
import { CustomerTypeSelector } from "./form/CustomerTypeSelector";

interface ManagementDialogsProps {
  showNewCustomerDialog: boolean;
  setShowNewCustomerDialog: (show: boolean) => void;
  handleAddCustomer: (newCustomer: Partial<Customer>) => void;
  productOptions: string[];
  contactTypes: string[];
  groupOptions: string[];
  departments: string[];
  countries: string[];
}

export function ManagementDialogs({
  showNewCustomerDialog,
  setShowNewCustomerDialog,
  handleAddCustomer,
  productOptions,
  contactTypes,
  groupOptions,
  departments,
  countries
}: ManagementDialogsProps) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${String(currentDate.getDate()).padStart(2, "0")}`;

  const [newCustomerType, setNewCustomerType] = useState<"公司户" | "机构户" | "个人户">("公司户");
  const [newCustomerData, setNewCustomerData] = useState<Partial<Customer>>({
    type: "公司户",
    entryDate: formattedDate,
    products: [],
    reaches: [],
    isListed: false,
    sponsorDepartments: [],
    progress: "意向",
    activeStatus: "活跃",
    riskLevel: "低",
  });

  const handleCustomerInputChange = (field: string, value: any) => {
    let updatedData = { ...newCustomerData, [field]: value };
    
    // When customer type changes, adjust the form data
    if (field === "type") {
      setNewCustomerType(value);
    }

    setNewCustomerData(updatedData);
  };

  const handleSubmitNewCustomer = () => {
    // Simple validation
    if (!newCustomerData.shortNameCn) {
      alert("客户名称为必填项");
      return;
    }

    handleAddCustomer(newCustomerData);
    resetNewCustomerForm();
    setShowNewCustomerDialog(false);
  };

  const resetNewCustomerForm = () => {
    setNewCustomerData({
      type: "公司户",
      entryDate: formattedDate,
      products: [],
      reaches: [],
      isListed: false,
      sponsorDepartments: [],
      progress: "意向",
      activeStatus: "活跃",
      riskLevel: "低",
    });
    setNewCustomerType("公司户");
  };

  const handleCancelNewCustomer = () => {
    resetNewCustomerForm();
    setShowNewCustomerDialog(false);
  };

  return (
    <>
      <Dialog open={showNewCustomerDialog} onOpenChange={setShowNewCustomerDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新建客户</DialogTitle>
          </DialogHeader>
          

          <CustomerFormSection
            formData={newCustomerData}
            handleInputChange={handleCustomerInputChange}
            groupOptions={groupOptions}
            countries={countries}
          />
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={handleCancelNewCustomer}>
              取消
            </Button>
            <Button onClick={handleSubmitNewCustomer}>
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
