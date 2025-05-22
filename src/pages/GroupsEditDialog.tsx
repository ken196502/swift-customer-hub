import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GroupsEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: { cn: string; en: string } | null;
  onSave: (group: { cn: string; en: string }) => void;
}

export function GroupsEditDialog({ open, onOpenChange, group, onSave }: GroupsEditDialogProps) {
  const [cn, setCn] = useState(group?.cn || "");
  const [en, setEn] = useState(group?.en || "");

  // Reset when group changes
  React.useEffect(() => {
    setCn(group?.cn || "");
    setEn(group?.en || "");
  }, [group]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑集团</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={cn} onChange={e => setCn(e.target.value)} placeholder="中文名" />
          <Input value={en} onChange={e => setEn(e.target.value)} placeholder="英文名" />
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>取消</Button>
          <Button onClick={() => onSave({ cn, en })} disabled={!cn.trim() || !en.trim()}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
