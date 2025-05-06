
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterPopover } from "@/components/filters/FilterPopover";
import { SearchControls } from "@/components/filters/SearchControls";
import { ViewModeToggle } from "@/components/filters/ViewModeToggle";
import { useCustomer } from "@/contexts/CustomerContext";

export function CustomerFilters() {
  const { productOptions, tagOptions, viewMode, toggleViewMode } = useCustomer();
  
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [productType, setProductType] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const resetFilters = () => {
    setCustomerName("");
    setCustomerType("");
    setProductType("");
    setSelectedProducts([]);
    setSelectedTags([]);
  };

  const handleProductSelect = (product: string) => {
    setSelectedProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product) 
        : [...prev, product]
    );
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-3">
          <Input 
            placeholder="客户名称" 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Select value={customerType} onValueChange={setCustomerType}>
            <SelectTrigger>
              <SelectValue placeholder="客户类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company">公司户</SelectItem>
              <SelectItem value="personal">个人户</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Select value={productType} onValueChange={setProductType}>
            <SelectTrigger>
              <SelectValue placeholder="产品类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">新客签约</SelectItem>
              <SelectItem value="renewal">续约签约</SelectItem>
              <SelectItem value="sales">销售</SelectItem>
              <SelectItem value="ipo">IPO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <FilterPopover 
            label="提供产品"
            options={productOptions}
            selectedItems={selectedProducts}
            onItemSelect={handleProductSelect}
          />
        </div>
        <div className="md:col-span-2">
          <FilterPopover
            label="标签"
            options={tagOptions}
            selectedItems={selectedTags}
            onItemSelect={handleTagSelect}
          />
        </div>
        <div className="md:col-span-1">
          <SearchControls 
            onReset={resetFilters}
            onSearch={() => console.log("Search with filters:", {customerName, customerType, productType, selectedProducts, selectedTags})}
            onExport={() => console.log("Export with filters:", {customerName, customerType, productType, selectedProducts, selectedTags})}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <ViewModeToggle viewMode={viewMode} onToggle={toggleViewMode} />
      </div>
    </div>
  );
}
