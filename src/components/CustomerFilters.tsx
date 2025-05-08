
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterPopover } from "@/components/filters/FilterPopover";
import { SearchControls } from "@/components/filters/SearchControls";
import { ViewModeToggle } from "@/components/filters/ViewModeToggle";
import { useCustomer } from "@/contexts/CustomerContext";
import { Button } from "@/components/ui/button";
import { SponsorDepartmentDialog } from "./customer/SponsorDepartmentDialog";
import { UsersRound } from "lucide-react";

export function CustomerFilters() {
  const { 
    productOptions, 
    viewMode, 
    toggleViewMode, 
    departments,
    selectedCustomers,
    showSponsorDepartmentDialog,
    setShowSponsorDepartmentDialog,
    handleUpdateSponsorDepartments
  } = useCustomer();
  
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [productType, setProductType] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const resetFilters = () => {
    setCustomerName("");
    setCustomerType("");
    setProductType("");
    setSelectedProducts([]);
    setSelectedDepartments([]);
  };

  const handleProductSelect = (product: string) => {
    setSelectedProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product) 
        : [...prev, product]
    );
  };

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartments(prev => 
      prev.includes(department) 
        ? prev.filter(d => d !== department) 
        : [...prev, department]
    );
  };

  const handleSponsorDepartmentSubmit = (departments: string[]) => {
    handleUpdateSponsorDepartments(selectedCustomers, departments);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-40 sm:w-48">
          <Input 
            placeholder="客户名称" 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-28 sm:w-32">
          <Select value={customerType} onValueChange={setCustomerType}>
            <SelectTrigger>
              <SelectValue placeholder="客户类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="公司户">公司户</SelectItem>
              <SelectItem value="个人户">个人户</SelectItem>
              <SelectItem value="机构户">机构户</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-28 sm:w-32">
          <FilterPopover 
            label="提供产品"
            options={productOptions}
            selectedItems={selectedProducts}
            onItemSelect={handleProductSelect}
          />
        </div>
        <div className="w-28 sm:w-32">
          <FilterPopover 
            label="部门"
            options={departments}
            selectedItems={selectedDepartments}
            onItemSelect={handleDepartmentSelect}
          />
        </div>
        <div className="flex-grow">
          <SearchControls 
            onReset={resetFilters}
            onSearch={() => console.log("Search with filters:", {customerName, customerType, productType, selectedProducts, selectedDepartments})}
            onExport={() => console.log("Export with filters:", {customerName, customerType, productType, selectedProducts, selectedDepartments})}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowSponsorDepartmentDialog(true)} 
          disabled={selectedCustomers.length === 0}
        >
          <UsersRound className="h-4 w-4 mr-2" />
          设置主办部门
        </Button>
        <ViewModeToggle viewMode={viewMode} onToggle={toggleViewMode} />
      </div>

      <SponsorDepartmentDialog
        open={showSponsorDepartmentDialog}
        onOpenChange={setShowSponsorDepartmentDialog}
        departments={departments}
        onSubmit={handleSponsorDepartmentSubmit}
        selectedCustomerCount={selectedCustomers.length}
      />
    </div>
  );
}
