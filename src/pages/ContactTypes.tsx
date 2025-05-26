
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
import { History, PlusCircle, Trash, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useManagementAudit, ManagementChangeRecord } from "@/hooks/use-management-audit";
import { ManagementChangeRecordsDialog } from "@/components/management/ManagementChangeRecordsDialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function ContactTypes() {
  // 删除弹窗控制和待删除类型
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteType, setPendingDeleteType] = useState<string | null>(null);

  const { contactTypes, handleUpdateContactTypes } = useCustomer();
  const [types, setTypes] = useState(contactTypes);
  const [newType, setNewType] = useState("");
  const { toast } = useToast();
  const { recordManagementChange } = useManagementAudit();
  
  // For change records
  const [showChangeRecords, setShowChangeRecords] = useState(false);
  const [changeRecords, setChangeRecords] = useState<ManagementChangeRecord[]>([]);

  // Setup audit approval listener
  useEffect(() => {
    const handleAuditApproved = (event: CustomEvent) => {
      const { category, type } = event.detail;
      if (category === "联系类型管理" && type === "修改") {
        // This would typically update based on specific details in the event
        // For demo purposes, we'll update types from contactTypes
        setTypes([...contactTypes]);
        
        toast({
          title: "联系类型变更已生效",
          description: "审核通过，联系类型列表已更新",
        });
      }
    };

    window.addEventListener("audit:approved", handleAuditApproved as EventListener);
    return () => {
      window.removeEventListener("audit:approved", handleAuditApproved as EventListener);
    };
  }, [contactTypes]);
  
  // Load change records (demo data)
  useEffect(() => {
    const demoRecords = [
      {
        id: 1,
        date: '2025-04-28 10:22:45',
        type: "联系类型" as const,
        before: ['会晤'],
        after: ['会议'],
        user: '张三'
      },
      {
        id: 2,
        date: '2025-05-02 14:35:12',
        type: "联系类型" as const,
        before: ['电话'],
        after: ['致电'],
        user: '李四'
      },
      {
        id: 3,
        date: '2025-05-05 09:17:33',
        type: "联系类型" as const,
        before: ['视频会议'],
        after: ['视讯'],
        user: '王五'
      }
    ];
    
    setChangeRecords(demoRecords);
  }, []);

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
    
    // Record the change for audit
    recordManagementChange("联系类型", types, updatedTypes);
    
    // Update local state (will be overwritten when audit is approved)
    setTypes(updatedTypes);
    setNewType("");
    
    // The actual update happens after audit approval
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
    setPendingDeleteType(type);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteType = () => {
    if (!pendingDeleteType) return;
    const updatedTypes = types.filter(t => t !== pendingDeleteType);
    recordManagementChange("联系类型", types, updatedTypes);
    setTypes(updatedTypes);
    setPendingDeleteType(null);
    setDeleteDialogOpen(false);
  };

  const cancelDeleteType = () => {
    setPendingDeleteType(null);
    setDeleteDialogOpen(false);
  };

  return (
    <div className="mx-auto space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">联系类型管理</h1>
        <Button variant="outline" onClick={() => setShowChangeRecords(true)}>
          <History className="h-4 w-4 mr-2" />
          变动记录
        </Button>
      </div>
      
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
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
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>联系类型</TableHead>
              <TableHead>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 cursor-help">
                        操作
                        <Info className="h-3.5 w-3.5 text-muted-foreground ml-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>已有数据的不能删除</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type}>
                <TableCell>{type}</TableCell>
                <TableCell>
                  {type !== "其他" ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteType(type)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  ) : (
                    <span className="text-sm text-muted-foreground">系统保留</span>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {/* 删除确认弹窗 */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确认删除</AlertDialogTitle>
                  <AlertDialogDescription>
                    确认要删除该联系类型“{pendingDeleteType}”吗？此操作需要审核通过后才会生效。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={cancelDeleteType}>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={confirmDeleteType}>确认删除</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </TableBody>
        </Table>
      </Card>
      
      <div className="text-muted-foreground text-sm">
        <p>注意: "其他" 是系统保留的联系类型，不能被删除。</p>
      </div>
      
      <ManagementChangeRecordsDialog
        open={showChangeRecords}
        onOpenChange={setShowChangeRecords}
        title="联系类型"
        changeRecords={changeRecords}
      />
    </div>
  );
}
