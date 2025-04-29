
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactTypeManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactTypes: string[];
  onUpdate: (contactTypes: string[]) => void;
}

export function ContactTypeManagementDialog({ 
  open, 
  onOpenChange, 
  contactTypes: initialContactTypes, 
  onUpdate 
}: ContactTypeManagementDialogProps) {
  const [contactTypes, setContactTypes] = useState<string[]>(initialContactTypes);
  const [newContactType, setNewContactType] = useState<string>("");
  const { toast } = useToast();

  const handleAddContactType = () => {
    if (!newContactType.trim()) {
      toast({
        title: "联系类型不能为空",
        variant: "destructive"
      });
      return;
    }

    if (contactTypes.includes(newContactType.trim())) {
      toast({
        title: "联系类型已存在",
        variant: "destructive"
      });
      return;
    }

    const updatedContactTypes = [...contactTypes, newContactType.trim()];
    setContactTypes(updatedContactTypes);
    setNewContactType("");
  };

  const handleRemoveContactType = (type: string) => {
    setContactTypes(contactTypes.filter(t => t !== type));
  };

  const handleSubmit = () => {
    onUpdate(contactTypes);
    toast({
      title: "联系类型已更新",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>管理联系类型</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="添加新联系类型"
              value={newContactType}
              onChange={(e) => setNewContactType(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddContactType();
                }
              }}
            />
            <Button onClick={handleAddContactType} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-[300px] overflow-y-auto">
            {contactTypes.length > 0 ? (
              <ul className="space-y-2">
                {contactTypes.map((type) => (
                  <li key={type} className="flex items-center justify-between bg-muted p-2 rounded-md">
                    <span>{type}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveContactType(type)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                没有联系类型
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
