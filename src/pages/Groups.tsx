
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
import { History, PlusCircle, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useManagementAudit, ManagementChangeRecord } from "@/hooks/use-management-audit";
import { ManagementChangeRecordsDialog } from "@/components/management/ManagementChangeRecordsDialog";

export default function Groups() {
  const { groupOptions, handleUpdateGroups } = useCustomer();
  const [groups, setGroups] = useState(groupOptions);
  const [newGroup, setNewGroup] = useState("");
  const { toast } = useToast();
  const { recordManagementChange } = useManagementAudit();
  
  // For change records
  const [showChangeRecords, setShowChangeRecords] = useState(false);
  const [changeRecords, setChangeRecords] = useState<ManagementChangeRecord[]>([]);

  // Setup audit approval listener
  useEffect(() => {
    const handleAuditApproved = (event: CustomEvent) => {
      const { category, type } = event.detail;
      if (category === "集团管理" && type === "修改") {
        // This would typically update based on specific details in the event
        // For demo purposes, we'll update groups from groupOptions
        setGroups([...groupOptions]);
        
        toast({
          title: "集团变更已生效",
          description: "审核通过，集团列表已更新",
        });
      }
    };

    window.addEventListener("audit:approved", handleAuditApproved as EventListener);
    return () => {
      window.removeEventListener("audit:approved", handleAuditApproved as EventListener);
    };
  }, [groupOptions]);
  
  // Load change records (demo data)
  useEffect(() => {
    const demoRecords = [
      {
        id: 1,
        date: '2025-05-01 14:30:25',
        type: "集团" as const,
        before: ['华为集团', '阿里巴巴', '腾讯集团', '百度集团'],
        after: ['华为集团', '阿里巴巴', '腾讯集团', '百度集团', '小米集团'],
        user: '张三'
      },
      {
        id: 2,
        date: '2025-05-03 09:15:36',
        type: "集团" as const,
        before: ['华为集团', '阿里巴巴', '腾讯集团', '百度集团', '小米集团'],
        after: ['华为集团', '阿里巴巴', '腾讯集团', '百度集团', '小米集团', '京东集团'],
        user: '李四'
      },
      {
        id: 3,
        date: '2025-05-07 16:42:51',
        type: "集团" as const,
        before: ['华为集团', '阿里巴巴', '腾讯集团', '百度集团', '小米集团', '京东集团'],
        after: ['华为集团', '腾讯集团', '百度集团', '小米集团', '京东集团'],
        user: '王五'
      }
    ];
    
    setChangeRecords(demoRecords);
  }, []);

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
    
    // Record the change for audit
    recordManagementChange("集团", groups, updatedGroups);
    
    // Update local state (will be overwritten when audit is approved)
    setGroups(updatedGroups);
    setNewGroup("");
    
    // The actual update happens after audit approval
  };

  const handleDeleteGroup = (group: string) => {
    const updatedGroups = groups.filter(g => g !== group);
    
    // Record the change for audit
    recordManagementChange("集团", groups, updatedGroups);
    
    // Update local state (will be overwritten when audit is approved)
    setGroups(updatedGroups);
    
    // The actual update happens after audit approval
  };

  return (
    <div className="mx-auto py-6 space-y-6 max-w-3xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">集团管理</h1>
        <Button variant="outline" onClick={() => setShowChangeRecords(true)}>
          <History className="h-4 w-4 mr-2" />
          变动记录
        </Button>
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
      
      <ManagementChangeRecordsDialog
        open={showChangeRecords}
        onOpenChange={setShowChangeRecords}
        title="集团"
        changeRecords={changeRecords}
      />
    </div>
  );
}
