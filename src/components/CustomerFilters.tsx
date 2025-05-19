
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";

interface CustomerFiltersProps {
  activeTab: string;
}

export function CustomerFilters({ activeTab }: CustomerFiltersProps) {
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
  // 部门类型：主办部门/录入部门/触达部门
  const [departmentType, setDepartmentType] = useState<string>("主办");

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
          <FilterPopover 
            label="提供产品"
            options={productOptions}
            selectedItems={selectedProducts}
            onItemSelect={handleProductSelect}
          />
        </div>
        {/* 部门类型下拉菜单及部门筛选 */}
        <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="min-w-[50px]">
                {departmentType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup value={departmentType} onValueChange={setDepartmentType}>
                <DropdownMenuRadioItem value="主办部门">主办</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="录入部门">录入</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="触达部门">触达</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-28 sm:w-32">
            <FilterPopover 
              label="部门"
              options={departments}
              selectedItems={selectedDepartments}
              onItemSelect={handleDepartmentSelect}
            />
          </div>
          </div>
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
        <div className="flex justify-between items-center gap-2">
        {activeTab !== 'personal' && (
          <ViewModeToggle viewMode={viewMode} onToggle={toggleViewMode} />
        )}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>上一页</Button>
          <Button variant="outline" size="sm">1/100</Button>
          <Button variant="outline" size="sm">下一页</Button>
        </div>
        </div>

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
