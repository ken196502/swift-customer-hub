
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
export function CustomerFilters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <Input placeholder="客户名称" />
      </div>
      <div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="客户类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company">公司户</SelectItem>
            <SelectItem value="personal">个人户</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
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
      <div>
        <Input type="date" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">
          <Search className="h-4 w-4 mr-2" />
          查询
        </Button>
        <Button variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600">
          <File className="h-4 w-4 mr-2" />
          导出
        </Button>
      </div>
    </div>
  );
}
