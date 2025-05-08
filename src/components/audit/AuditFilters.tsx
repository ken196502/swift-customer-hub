
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface AuditFiltersProps {
  categoryFilter?: string | null;
  onCategoryChange?: (category: string | null) => void;
}

export function AuditFilters({ categoryFilter, onCategoryChange }: AuditFiltersProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "all");
  const [selectedChangeType, setSelectedChangeType] = useState("all");
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "导出成功",
      description: "审核数据已导出",
    });
  };
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
    <div className="grid grid-cols-1 gap-y-4 px-4 md:flex md:flex-wrap md:gap-3 md:px-0">
      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
        <div className="w-full md:w-36">
          <Input type="date" className="w-full" placeholder="开始日期" />
        </div>
        <div className="w-full md:w-36">
          <Input type="date" className="w-full" placeholder="结束日期" />
        </div>
      </div>
      
      <div className="w-full md:w-36">
        <Input placeholder="客户名称" className="w-full" />
      </div>
      
      <div className="w-full md:w-36">
        <Input placeholder="变更人" className="w-full" />
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
      <div className="flex w-full flex-wrap gap-2 md:w-auto">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full bg-blue-500 hover:bg-blue-600 md:w-auto"
        >
          <Search className="h-4 w-4 mr-2" />
          查询
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="w-full bg-blue-500 hover:bg-blue-600 md:w-auto"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2" />
          导出
        </Button>
      </div>
    </div>
  );
}
