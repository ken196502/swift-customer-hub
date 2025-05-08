
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer } from "@/contexts/CustomerContext";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

interface BasicInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  groupOptions: string[];
  countries: string[];
}

export function BasicInfoFields({ 
  formData, 
  handleInputChange, 
  groupOptions,
  countries
}: BasicInfoFieldsProps) {
  const [showCountrySearch, setShowCountrySearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countries.filter(country => 
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      
      <div className="space-y-2">
        <Label>客户类型</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleInputChange('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="请选择客户类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="公司户">公司户</SelectItem>
            <SelectItem value="个人户">个人户</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>所属集团</Label>
        <Select
          value={formData.groupName}
          onValueChange={(value) => handleInputChange('groupName', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="请选择所属集团" />
          </SelectTrigger>
          <SelectContent>
            {groupOptions.map((group) => (
              <SelectItem key={group} value={group}>{group}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>英文简称</Label>
        <Input 
          placeholder="请输入英文简称" 
          value={formData.shortNameEn} 
          onChange={(e) => handleInputChange('shortNameEn', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>中文简称 <span className="text-red-500">*</span></Label>
        <Input 
          placeholder="请输入中文简称" 
          value={formData.shortNameCn} 
          onChange={(e) => handleInputChange('shortNameCn', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>英文全称</Label>
        <Input 
          placeholder="请输入英文全称" 
          value={formData.fullNameEn} 
          onChange={(e) => handleInputChange('fullNameEn', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>中文全称</Label>
        <Input 
          placeholder="请输入中文全称" 
          value={formData.fullNameCn} 
          onChange={(e) => handleInputChange('fullNameCn', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>是否上市</Label>
        <Select
          value={formData.isListed ? "true" : "false"}
          onValueChange={(value) => handleInputChange('isListed', value === "true")}
        >
          <SelectTrigger>
            <SelectValue placeholder="请选择是否上市" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">是</SelectItem>
            <SelectItem value="false">否</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>股票代码</Label>
        <Input 
          placeholder="请输入股票代码" 
          value={formData.stockCode} 
          onChange={(e) => handleInputChange('stockCode', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>城市地区</Label>
        <Input 
          placeholder="请输入城市地区" 
          value={formData.city} 
          onChange={(e) => handleInputChange('city', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>客户号 <span className="text-red-500">*</span></Label>
        <Input 
          placeholder="请输入客户号" 
          value={formData.customerNumber} 
          onChange={(e) => handleInputChange('customerNumber', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>证件类型 <span className="text-red-500">*</span></Label>
        <Select
          value={formData.idType}
          onValueChange={(value) => handleInputChange('idType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="请选择证件类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="身份证">身份证</SelectItem>
            <SelectItem value="营业执照">营业执照</SelectItem>
            <SelectItem value="护照">护照</SelectItem>
            <SelectItem value="其他证件">其他证件</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>证件号码 <span className="text-red-500">*</span></Label>
        <Input 
          placeholder="请输入证件号码" 
          value={formData.idNumber} 
          onChange={(e) => handleInputChange('idNumber', e.target.value)}
        />
      </div>

      <Dialog open={showCountrySearch} onOpenChange={setShowCountrySearch}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>选择国家</DialogTitle>
          </DialogHeader>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="搜索国家..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollArea className="h-72">
            <div className="space-y-1">
              {filteredCountries.map((country) => (
                <div
                  key={country}
                  className="px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => {
                    handleInputChange('country', country);
                    setShowCountrySearch(false);
                    setSearchQuery("");
                  }}
                >
                  {country}
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
