
import { useCustomer } from "@/contexts/CustomerContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactTypes() {
  const { contactTypes, handleUpdateContactTypes } = useCustomer();
  const [types, setTypes] = useState(contactTypes);
  const [newType, setNewType] = useState("");
  const { toast } = useToast();

  const handleAddType = () => {
    if (!newType.trim()) return;
    if (types.includes(newType.trim())) {
      toast({
        title: "添加失败",
        description: "该联系类型已存在",
        variant: "destructive"
      });
      return;
    }

    const updatedTypes = [...types, newType.trim()];
    setTypes(updatedTypes);
    setNewType("");
    handleUpdateContactTypes(updatedTypes);
    
    toast({
      title: "操作成功",
      description: "联系类型已添加",
    });
  };

  const handleDeleteType = (type: string) => {
    if (type === "其他") {
      toast({
        title: "删除失败",
        description: "不能删除系统保留的联系类型",
        variant: "destructive"
      });
      return;
    }
    
    const updatedTypes = types.filter(t => t !== type);
    setTypes(updatedTypes);
    handleUpdateContactTypes(updatedTypes);
    
    toast({
      title: "操作成功",
      description: "联系类型已删除",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">联系类型管理</h1>
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="输入新联系类型..."
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={handleAddType}>
          <PlusCircle className="h-4 w-4 mr-2" />
          添加
        </Button>
      </div>
      
      <div className="border rounded-md p-4">
        <h2 className="text-lg font-semibold mb-4">已有联系类型</h2>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <div
              key={type}
              className="bg-muted px-3 py-1 rounded-full flex items-center gap-1"
            >
              <span>{type}</span>
              {type !== "其他" && (
                <button
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteType(type)}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-muted-foreground text-sm">
        <p>注意: "其他" 是系统保留的联系类型，不能被删除。</p>
      </div>
    </div>
  );
}
