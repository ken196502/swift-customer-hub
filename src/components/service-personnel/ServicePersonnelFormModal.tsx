
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ServicePersonnel } from "@/types/servicePersonnel";
import { industryOptions, statusOptions } from "@/pages/ServicePersonnel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ServicePersonnelFormModalProps {
  personnel: ServicePersonnel | null;
  onClose: () => void;
  onSave: (data: ServicePersonnel) => void;
}

export function ServicePersonnelFormModal({
  personnel,
  onClose,
  onSave
}: ServicePersonnelFormModalProps) {
  const [formData, setFormData] = useState<Omit<ServicePersonnel, "id"> & { id?: number }>({
    name: "",
    englishName: "",
    position: "",
    industry: "金融",
    status: "在职",
    systemUser: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (personnel) {
      setFormData(personnel);
    }
  }, [personnel]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.position) {
      // In a real app, you'd want to show proper validation messages
      return;
    }

    onSave({
      id: personnel?.id || 0, // ID will be set properly when saving
      ...formData
    } as ServicePersonnel);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {personnel ? "编辑服务人员" : "添加服务人员"}
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">名称 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                placeholder="请输入名称"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="englishName">英文名</Label>
              <Input
                id="englishName"
                value={formData.englishName}
                onChange={e => handleInputChange("englishName", e.target.value)}
                placeholder="请输入英文名"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="position">职务 *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={e => handleInputChange("position", e.target.value)}
                placeholder="请输入职务"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="industry">行业</Label>
              <Select
                value={formData.industry}
                onValueChange={value => handleInputChange("industry", value)}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="选择行业" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map(industry => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">状态</Label>
              <Select
                value={formData.status}
                onValueChange={value => handleInputChange("status", value as "在职" | "离职")}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="systemUser">关联系统用户</Label>
              <Input
                id="systemUser"
                value={formData.systemUser}
                onChange={e => handleInputChange("systemUser", e.target.value)}
                placeholder="请输入系统用户名"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
                placeholder="请输入邮箱"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">手机</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={e => handleInputChange("phone", e.target.value)}
                placeholder="请输入手机号"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSubmit}>
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
