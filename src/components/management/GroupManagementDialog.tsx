
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GroupManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: string[];
  onUpdate: (groups: string[]) => void;
}

export function GroupManagementDialog({
  open,
  onOpenChange,
  groups,
  onUpdate
}: GroupManagementDialogProps) {
  const [groupItems, setGroupItems] = useState<string[]>(groups);
  const [newGroup, setNewGroup] = useState("");
  const { toast } = useToast();

  const handleAddGroup = () => {
    if (!newGroup.trim()) {
      toast({
        title: "错误",
        description: "请输入有效的集团名称",
        variant: "destructive"
      });
      return;
    }

    if (groupItems.includes(newGroup.trim())) {
      toast({
        title: "错误",
        description: "该集团名称已存在",
        variant: "destructive"
      });
      return;
    }

    setGroupItems([...groupItems, newGroup.trim()]);
    setNewGroup("");
  };

  const handleRemoveGroup = (group: string) => {
    setGroupItems(groupItems.filter(item => item !== group));
  };

  const handleSave = () => {
    onUpdate(groupItems);
    toast({
      title: "操作成功",
      description: "集团列表已更新",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>管理集团</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="请输入集团名称"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddGroup();
                }
              }}
            />
            <Button type="button" size="sm" onClick={handleAddGroup}>
              <Plus className="h-4 w-4 mr-2" />
              添加
            </Button>
          </div>

          <div className="space-y-2">
            {groupItems.map((group) => (
              <div
                key={group}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded"
              >
                <span>{group}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveGroup(group)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
