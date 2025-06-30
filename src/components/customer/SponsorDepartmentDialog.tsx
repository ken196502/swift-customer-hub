
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SponsorDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departments: string[];
  onSubmit: (department: string) => void;
  selectedCustomerCount: number;
}

export function SponsorDepartmentDialog({ 
  open, 
  onOpenChange, 
  departments, 
  onSubmit,
  selectedCustomerCount
}: SponsorDepartmentDialogProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(selectedDepartment);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedDepartment("");
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
          
          <RadioGroup value={selectedDepartment} onValueChange={setSelectedDepartment}>
            {departments.map(dept => (
              <div key={dept} className="flex items-center space-x-2">
                <RadioGroupItem value={dept} id={`dept-${dept}`} />
                <label
                  htmlFor={`dept-${dept}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {dept}
                </label>
              </div>
            ))}
          </RadioGroup>
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
