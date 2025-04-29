
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TagManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tags: string[];
  onUpdate: (tags: string[]) => void;
}

export function TagManagementDialog({ open, onOpenChange, tags: initialTags, onUpdate }: TagManagementDialogProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState<string>("");
  const { toast } = useToast();

  const handleAddTag = () => {
    if (!newTag.trim()) {
      toast({
        title: "标签不能为空",
        variant: "destructive"
      });
      return;
    }

    if (tags.includes(newTag.trim())) {
      toast({
        title: "标签已存在",
        variant: "destructive"
      });
      return;
    }

    const updatedTags = [...tags, newTag.trim()];
    setTags(updatedTags);
    setNewTag("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    onUpdate(tags);
    toast({
      title: "标签已更新",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>管理标签</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="添加新标签"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button onClick={handleAddTag} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-[300px] overflow-y-auto">
            {tags.length > 0 ? (
              <ul className="space-y-2">
                {tags.map((tag) => (
                  <li key={tag} className="flex items-center justify-between bg-muted p-2 rounded-md">
                    <span>{tag}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveTag(tag)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                没有标签
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
