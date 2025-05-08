
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/contexts/CustomerContext";
import { CustomerFormSection } from "./CustomerFormSection";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const [newCustomerType, setNewCustomerType] = useState<"公司户" | "个人户" | "机构户">("公司户");
  const [newCustomerData, setNewCustomerData] = useState<Partial<Customer>>({
    type: "公司户",
    entryDate: formattedDate,
    products: [],
    reaches: [],
    isListed: false,
    sponsorDepartments: [],
  });
  const [activeTab, setActiveTab] = useState("basic");

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
    });
    setActiveTab("basic");
    setNewCustomerType("公司户");
  };

  const handleCancelNewCustomer = () => {
    resetNewCustomerForm();
    setShowNewCustomerDialog(false);
  };

  return (
    <>
      <Dialog open={showNewCustomerDialog} onOpenChange={setShowNewCustomerDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新建客户</DialogTitle>
          </DialogHeader>
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">基本信息</TabsTrigger>
              <TabsTrigger value="details">详细信息</TabsTrigger>
            </TabsList>
            <div className="pt-4 pb-2">
              <div className="flex gap-4 mb-6">
                <Button
                  type="button"
                  variant={newCustomerType === "公司户" ? "default" : "outline"}
                  onClick={() => handleCustomerInputChange("type", "公司户")}
                  className="flex-1"
                >
                  公司户
                </Button>
                <Button
                  type="button"
                  variant={newCustomerType === "个人户" ? "default" : "outline"}
                  onClick={() => handleCustomerInputChange("type", "个人户")}
                  className="flex-1"
                >
                  个人户
                </Button>
                <Button
                  type="button"
                  variant={newCustomerType === "机构户" ? "default" : "outline"}
                  onClick={() => handleCustomerInputChange("type", "机构户")}
                  className="flex-1"
                >
                  机构户
                </Button>
              </div>
              <CustomerFormSection
                formData={newCustomerData}
                handleInputChange={handleCustomerInputChange}
                section={activeTab as "basic" | "details"}
                groupOptions={groupOptions}
                countries={countries}
              />
            </div>
          </Tabs>
          <div className="flex justify-end space-x-2">
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
