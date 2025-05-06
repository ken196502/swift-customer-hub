
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, File, RotateCcw, Grid, Rows } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                提供产品
                {selectedProducts.length > 0 && (
                  <Badge className="ml-2 bg-blue-100 text-blue-800">
                    {selectedProducts.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <div className="p-2 space-y-1">
                {productOptions.map((product) => (
                  <div
                    key={product}
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-gray-100",
                      selectedProducts.includes(product) && "bg-gray-100"
                    )}
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className={cn(
                      "h-4 w-4 border rounded-sm flex items-center justify-center",
                      selectedProducts.includes(product) ? "bg-blue-500 border-blue-500" : "border-gray-300"
                    )}>
                      {selectedProducts.includes(product) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span>{product}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="md:col-span-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                标签
                {selectedTags.length > 0 && (
                  <Badge className="ml-2 bg-blue-100 text-blue-800">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <div className="p-2 space-y-1">
                {tagOptions.map((tag) => (
                  <div
                    key={tag}
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-gray-100",
                      selectedTags.includes(tag) && "bg-gray-100"
                    )}
                    onClick={() => handleTagSelect(tag)}
                  >
                    <div className={cn(
                      "h-4 w-4 border rounded-sm flex items-center justify-center",
                      selectedTags.includes(tag) ? "bg-blue-500 border-blue-500" : "border-gray-300"
                    )}>
                      {selectedTags.includes(tag) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="md:col-span-1 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleViewMode}
            className="flex items-center gap-1 w-full"
          >
            {viewMode === "customer" ? (
              <>
                <Grid className="h-4 w-4" />
                按集团
              </>
            ) : (
              <>
                <Rows className="h-4 w-4" />
                按客户
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-100 hover:bg-gray-200"
          onClick={resetFilters}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          重置
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Search className="h-4 w-4 mr-2" />
          查询
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-orange-500 hover:bg-orange-600"
        >
          <File className="h-4 w-4 mr-2" />
          导出
        </Button>
      </div>
    </div>
  );
}
