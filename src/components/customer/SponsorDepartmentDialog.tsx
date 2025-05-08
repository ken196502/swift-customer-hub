
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface SponsorDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departments: string[];
  onSubmit: (departments: string[]) => void;
  selectedCustomerCount: number;
}

export function SponsorDepartmentDialog({ 
  open, 
  onOpenChange, 
  departments, 
  onSubmit,
  selectedCustomerCount
}: SponsorDepartmentDialogProps) {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleToggleDepartment = (dept: string) => {
    setSelectedDepartments(prev => 
      prev.includes(dept)
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedDepartments);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedDepartments([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>设置主办部门</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            已选择 {selectedCustomerCount} 个客户，请选择要设置的主办部门：
          </p>
          
          <div className="space-y-4">
            {departments.map(dept => (
              <div key={dept} className="flex items-center space-x-2">
                <Checkbox
                  id={`dept-${dept}`}
                  checked={selectedDepartments.includes(dept)}
                  onCheckedChange={() => handleToggleDepartment(dept)}
                />
                <label
                  htmlFor={`dept-${dept}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {dept}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={selectedCustomerCount === 0}>
            确定
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
