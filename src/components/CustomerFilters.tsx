
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    </div>
  );
}
