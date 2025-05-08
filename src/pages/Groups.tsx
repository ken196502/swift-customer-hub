
import { useCustomer } from "@/contexts/CustomerContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Groups() {
  const { groupOptions, handleUpdateGroups } = useCustomer();
  const [groups, setGroups] = useState(groupOptions);
  const [newGroup, setNewGroup] = useState("");
  const { toast } = useToast();

  const handleAddGroup = () => {
    if (!newGroup.trim()) return;
    if (groups.includes(newGroup.trim())) {
      toast({
        title: "添加失败",
        description: "该集团已存在",
        variant: "destructive"
      });
      return;
    }

    const updatedGroups = [...groups, newGroup.trim()];
    setGroups(updatedGroups);
    setNewGroup("");
    handleUpdateGroups(updatedGroups);
    
    toast({
      title: "操作成功",
      description: "集团已添加",
    });
  };

  const handleDeleteGroup = (group: string) => {
    const updatedGroups = groups.filter(g => g !== group);
    setGroups(updatedGroups);
    handleUpdateGroups(updatedGroups);
    
    toast({
      title: "操作成功",
      description: "集团已删除",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">集团管理</h1>
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="输入新集团..."
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={handleAddGroup}>
          <PlusCircle className="h-4 w-4 mr-2" />
          添加
        </Button>
      </div>
      
      <div className="border rounded-md p-4">
        <h2 className="text-lg font-semibold mb-4">已有集团</h2>
        <div className="flex flex-wrap gap-2">
          {groups.map((group) => (
            <div
              key={group}
              className="bg-muted px-3 py-1 rounded-full flex items-center gap-1"
            >
              <span>{group}</span>
              <button
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleDeleteGroup(group)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
