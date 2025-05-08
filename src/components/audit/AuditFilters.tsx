
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface AuditFiltersProps {
  categoryFilter?: string | null;
  onCategoryChange?: (category: string | null) => void;
}

export function AuditFilters({ categoryFilter, onCategoryChange }: AuditFiltersProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "all");
  const [selectedChangeType, setSelectedChangeType] = useState("all");

  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
  }, [categoryFilter]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "permissions") {
      setSelectedChangeType("权限变更");
    } else {
      setSelectedChangeType("all");
    }
    if (onCategoryChange) {
      onCategoryChange(value === "all" ? null : value);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex gap-2 w-full md:w-auto">
        <div className="w-full md:w-auto">
          <Input type="date" className="w-36" placeholder="开始日期" />
        </div>
        <div className="w-full md:w-auto">
          <Input type="date" className="w-36" placeholder="结束日期" />
        </div>
      </div>
      <div className="w-full md:w-auto">
        <Input placeholder="客户名称" className="w-36" />
      </div>
      <div className="w-full md:w-auto">
        <Input placeholder="变更人" className="w-36" />
      </div>
      <div className="w-full md:w-auto">
        <Select
          value={selectedCategory}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="customer">客户信息</SelectItem>
            <SelectItem value="interaction">触达记录</SelectItem>
            <SelectItem value="permissions">共享权限</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-auto">
        <Select
          value={selectedChangeType}
          onValueChange={setSelectedChangeType}
          disabled={selectedCategory === "permissions"}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="变动类型" />
          </SelectTrigger>
          <SelectContent>
            {selectedCategory === "permissions" ? (
              <SelectItem value="权限变更">权限变更</SelectItem>
            ) : (
              <>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="新增">新增</SelectItem>
                <SelectItem value="修改">修改</SelectItem>
                <SelectItem value="删除">删除</SelectItem>
                <SelectItem value="权限变更">权限变更</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-auto">
        <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">
          <Search className="h-4 w-4 mr-2" />
          查询
        </Button>
      </div>
    </div>
  );
}
