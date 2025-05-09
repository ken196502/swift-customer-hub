
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface AuditFiltersProps {
  onCategoryChange?: (category: string | null) => void;
  selectedCategory?: string | null;
}

export function AuditFilters({ onCategoryChange, selectedCategory }: AuditFiltersProps) {
  const [customerName, setCustomerName] = useState("");
  const [changeType, setChangeType] = useState<string>("");
  const [category, setCategory] = useState<string>(selectedCategory || "");

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    if (onCategoryChange) {
      onCategoryChange(value === "" ? null : value);
    }
    
    // If category is "共享权限", reset changeType to "权限变更"
    if (value === "共享权限") {
      setChangeType("权限变更");
    } else {
      setChangeType("");
    }
  };
  
  // Get available change types based on the selected category
  const getChangeTypes = () => {
    if (category === "共享权限") {
      return ["权限变更"];
    }
    return ["新增", "修改", "删除", "权限变更"];
  };

  // Reset all filters
  const handleReset = () => {
    setCustomerName("");
    setChangeType("");
    setCategory("");
    if (onCategoryChange) {
      onCategoryChange(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Customer name filter */}
      <div className="w-36 sm:w-44">
        <Input
          placeholder="客户名称"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      {/* Category filter */}
      <div className="w-28 sm:w-32">
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="审核类别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">全部</SelectItem>
            <SelectItem value="客户信息">客户信息</SelectItem>
            <SelectItem value="触达记录">触达记录</SelectItem>
            <SelectItem value="共享权限">共享权限</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Change type filter */}
      <div className="w-28 sm:w-32">
        <Select value={changeType} onValueChange={setChangeType} disabled={category === "共享权限"}>
          <SelectTrigger>
            <SelectValue placeholder="变动类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">全部</SelectItem>
            {getChangeTypes().map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="icon" onClick={handleReset}>
          <X className="h-4 w-4" />
        </Button>
        <Button variant="default" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
