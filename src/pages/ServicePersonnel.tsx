
import { useState } from "react";
import { ServicePersonnelTable } from "@/components/service-personnel/ServicePersonnelTable";
import { ServicePersonnelFilters } from "@/components/service-personnel/ServicePersonnelFilters";
import type { ServicePersonnel } from "@/types/servicePersonnel";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ServicePersonnelFormModal } from "@/components/service-personnel/ServicePersonnelFormModal";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Initial mock data for demonstration purposes
const initialPersonnel: ServicePersonnel[] = [
  {
    id: 1,
    name: "张三",
    englishName: "Zhang San",
    position: "客户经理",
    industry: "金融",
    status: "在职",
    systemUser: "zhangsan",
    email: "zhangsan@example.com",
    phone: "13800000001"
  },
  {
    id: 2,
    name: "李四",
    englishName: "Li Si",
    position: "高级客户顾问",
    industry: "科技",
    status: "在职",
    systemUser: "lisi",
    email: "lisi@example.com",
    phone: "13800000002"
  },
  {
    id: 3,
    name: "王五",
    englishName: "Wang Wu",
    position: "行业分析师",
    industry: "制造",
    status: "离职",
    systemUser: "wangwu",
    email: "wangwu@example.com",
    phone: "13800000003"
  }
];

// Status and industry options for filters and form
export const statusOptions = ["在职", "离职"] as const;
export const industryOptions = ["金融", "科技", "制造", "零售", "医疗", "教育", "其他"] as const;

export default function ServicePersonnelPage() {
  const isMobile = useIsMobile();
  const [personnel, setPersonnel] = useState<ServicePersonnel[]>(initialPersonnel);
  const [filteredPersonnel, setFilteredPersonnel] = useState<ServicePersonnel[]>(personnel);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPersonnel, setEditingPersonnel] = useState<ServicePersonnel | null>(null);
  const { toast } = useToast();

  // Filter personnel based on filter criteria
  const handleFilter = (filtered: ServicePersonnel[]) => {
    setFilteredPersonnel(filtered);
  };

  // Open modal for creating new personnel
  const handleAddNew = () => {
    setEditingPersonnel(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing personnel
  const handleEdit = (personnel: ServicePersonnel) => {
    setEditingPersonnel(personnel);
    setIsModalOpen(true);
  };

  // Save new or updated personnel
  const handleSave = (data: ServicePersonnel) => {
    if (editingPersonnel) {
      // Update existing
      setPersonnel(prev => 
        prev.map(item => item.id === data.id ? data : item)
      );
      toast({
        title: "更新成功",
        description: `服务人员 ${data.name} 已成功更新`,
      });
    } else {
      // Add new with generated ID
      const newId = Math.max(0, ...personnel.map(p => p.id)) + 1;
      const newPersonnel = { ...data, id: newId };
      setPersonnel(prev => [...prev, newPersonnel]);
      toast({
        title: "添加成功",
        description: `服务人员 ${data.name} 已成功添加`,
      });
    }
    setIsModalOpen(false);
  };

  // Delete personnel
  const handleDelete = (id: number) => {
    setPersonnel(prev => prev.filter(item => item.id !== id));
    toast({
      title: "删除成功",
      description: "服务人员已成功删除",
      variant: "destructive",
    });
  };

  return (
    <div className={`${isMobile ? "px-4" : "container"} space-y-6`}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">服务人员管理</h1>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          添加服务人员
        </Button>
      </div>
      
      <ServicePersonnelFilters 
        personnel={personnel}
        onFilter={handleFilter}
      />
      
      <ServicePersonnelTable 
        personnel={filteredPersonnel}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {isModalOpen && (
        <ServicePersonnelFormModal
          personnel={editingPersonnel}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
