
import { useCustomer } from "@/contexts/CustomerContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

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
      
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
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
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>集团名称</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group}>
                <TableCell>{group}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteGroup(group)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
