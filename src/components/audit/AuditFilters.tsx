
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function AuditFilters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="flex gap-2">
        <Input type="date" className="w-full" placeholder="开始日期" />
        <Input type="date" className="w-full" placeholder="结束日期" />
      </div>
      <div>
        <Input placeholder="客户名称" />
      </div>
      <div>
        <Input placeholder="变更人" />
      </div>
      <div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="变动类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="新增">新增</SelectItem>
            <SelectItem value="修改">修改</SelectItem>
            <SelectItem value="删除">删除</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">
          <Search className="h-4 w-4 mr-2" />
          查询
        </Button>
      </div>
    </div>
  );
}
