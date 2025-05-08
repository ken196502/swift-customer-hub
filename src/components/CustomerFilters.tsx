
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterPopover } from "@/components/filters/FilterPopover";
import { SearchControls } from "@/components/filters/SearchControls";
import { ViewModeToggle } from "@/components/filters/ViewModeToggle";
import { useCustomer } from "@/contexts/CustomerContext";

export function CustomerFilters() {
  const { productOptions, viewMode, toggleViewMode } = useCustomer();
  
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [productType, setProductType] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const resetFilters = () => {
    setCustomerName("");
    setCustomerType("");
    setProductType("");
    setSelectedProducts([]);
  };

  const handleProductSelect = (product: string) => {
    setSelectedProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product) 
        : [...prev, product]
    );
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
              <SelectItem value="company">公司户</SelectItem>
              <SelectItem value="personal">个人户</SelectItem>
              <SelectItem value="institute">机构户</SelectItem>
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
        <div className="flex-grow">
          <SearchControls 
            onReset={resetFilters}
            onSearch={() => console.log("Search with filters:", {customerName, customerType, productType, selectedProducts})}
            onExport={() => console.log("Export with filters:", {customerName, customerType, productType, selectedProducts})}
          />
        </div>
      </div>
      <div className="flex">
        <ViewModeToggle viewMode={viewMode} onToggle={toggleViewMode} />
      </div>
    </div>
  );
}
