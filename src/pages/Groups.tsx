
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
import { GroupsEditDialog } from "./GroupsEditDialog";
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
import { PaginationControl } from "@/components/ui/PaginationControl";

export default function Groups() {
  // 搜索相关状态
  const [groups, setGroups] = useState<{ cn: string; en: string }[]>([
    { cn: "小米集团", en: "Xiaomi Group" },
    { cn: "华为集团", en: "Huawei Group" },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredGroups, setFilteredGroups] = useState<{ cn: string; en: string }[]>(groups);

  // 查询按钮逻辑
  const handleSearch = () => {
    setFilteredGroups(
      groups.filter(g =>
        g.cn.includes(searchValue.trim()) || g.en.includes(searchValue.trim())
      )
    );
  };
  // 重置按钮逻辑
  const handleReset = () => {
    setSearchValue("");
    setFilteredGroups(groups);
  };

  // groups 变化时同步 filteredGroups
  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);
  // 删除弹窗控制和待删除集团
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteGroup, setPendingDeleteGroup] = useState<string | null>(null);

  const { groupOptions, handleUpdateGroups } = useCustomer();
// 集团数据结构：{ cn: string, en: string }

// 移除新增输入框状态
// const [newGroupCn, setNewGroupCn] = useState("");
// const [newGroupEn, setNewGroupEn] = useState("");
const [addDialogOpen, setAddDialogOpen] = useState(false);
const [editDialogOpen, setEditDialogOpen] = useState(false);
const [editingGroup, setEditingGroup] = useState<{ cn: string; en: string } | null>(null);
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
        // 这里需要从groupOptions恢复为对象数组
try {
  let parsed: { cn: string; en: string; }[] = [];
  if (Array.isArray(groupOptions)) {
    if (groupOptions.length === 0) {
      parsed = [];
    } else if (typeof groupOptions[0] === 'string') {
      parsed = (groupOptions as string[]).map(str => ({ cn: str, en: str }));
    } else if (
      typeof groupOptions[0] === 'object' &&
      groupOptions[0] !== null &&
      'cn' in groupOptions[0] &&
      'en' in groupOptions[0]
    ) {
      parsed = groupOptions as { cn: string; en: string; }[];
    }
  }
  setGroups(parsed);
} catch {
  setGroups([]);
}
        
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

  const handleDeleteGroup = (group: { cn: string; en: string }) => {
  setPendingDeleteGroup(group.cn);
  setDeleteDialogOpen(true);
};

  const confirmDeleteGroup = () => {
  if (!pendingDeleteGroup) return;
  const updatedGroups = groups.filter(g => g.cn !== pendingDeleteGroup);
  recordManagementChange("集团", groups.map(g => g.cn), updatedGroups.map(g => g.cn));
  setGroups(updatedGroups);
  setPendingDeleteGroup(null);
  setDeleteDialogOpen(false);
  // handleUpdateGroups(updatedGroups.map(g => g.cn)); // 如需同步到全局
};

  const cancelDeleteGroup = () => {
    setPendingDeleteGroup(null);
    setDeleteDialogOpen(false);
  };

  return (
  <div className="mx-auto space-y-6 max-w-3xl">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">集团管理</h1>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setShowChangeRecords(true)}>
          <History className="h-4 w-4 mr-2" />
          变动记录
        </Button>
        <Button onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          添加
        </Button>
      </div>
    </div>
    <div className="flex items-center gap-2 mb-4">
      <Input className="max-w-xs" placeholder="请输入集团名称" />
      <Button>查询</Button>
      <Button variant="outline">重置</Button>
    </div>
    <PaginationControl
  currentPage={1} // TODO: 用实际分页状态替换
  total={30}     // TODO: 用实际总条数替换
  pageSize={10}   // TODO: 用实际每页条数替换
  onPageChange={page => {
    // TODO: 替换为实际分页逻辑
    console.log('Change page:', page);
  }}
  onPageSizeChange={size => {
    // TODO: 替换为实际每页条数切换逻辑
    console.log('Change page size:', size);
  }}
/>
    {/* 搜索区域（模拟，无功能） */}

    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>中文名</TableHead>
            <TableHead>英文名</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredGroups.map((group) => (
            <TableRow key={group.cn + group.en}>
              <TableCell>{group.cn}</TableCell>
              <TableCell>{group.en}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditingGroup(group); setEditDialogOpen(true); }}>编辑</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteGroup(group)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {/* 删除确认弹窗 */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除</AlertDialogTitle>
                <AlertDialogDescription>
                  确认要删除该集团“{pendingDeleteGroup}”吗？此操作需要审核通过后才会生效。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={cancelDeleteGroup}>取消</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeleteGroup}>确认删除</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableBody>
      </Table>
    </Card>
    <ManagementChangeRecordsDialog
      open={showChangeRecords}
      onOpenChange={setShowChangeRecords}
      title="集团"
      changeRecords={changeRecords}
    />
    {/* 新增弹窗 */}
    <GroupsEditDialog
      open={addDialogOpen}
      onOpenChange={setAddDialogOpen}
      group={null}
      onSave={(newGroup) => {
        setGroups([...groups, newGroup]);
        setAddDialogOpen(false);
      }}
    />
    {/* 编辑弹窗 */}
    <GroupsEditDialog
      open={editDialogOpen}
      onOpenChange={setEditDialogOpen}
      group={editingGroup}
      onSave={(edited) => {
        setGroups(groups.map(g => (g.cn === editingGroup?.cn && g.en === editingGroup?.en) ? edited : g));
        setEditDialogOpen(false);
      }}
    />
  </div>
);
}
