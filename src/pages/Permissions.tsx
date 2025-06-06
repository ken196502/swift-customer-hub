
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Search, ChevronLeft } from 'lucide-react';
import { PermissionEditModal } from '@/components/permissions/PermissionEditModal';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { PaginationControl } from "@/components/ui/PaginationControl";

interface User {
  id: number;
  name: string;
  level: string;
  department: string;
  permissions: Permission[];
}

import { Permission } from '@/types/permission';

const mockUsers: User[] = [
  {
    id: 1,
    name: '张三',
    level: '普通用户',
    department: '零售经纪部',
    permissions: [
      {
        id: 1,
        customerNumber: 'C001',
        customerName: '小米集团',
        departments: ['零售经纪部'],
        visibleContent: ['触达记录',],
        visibleProducts: ['股票交易']
      }
    ]
  },
  {
    id: 2,
    name: '李四',
    level: '部门管理员',
    department: '金融市场部',
    permissions: [
      {
        id: 2,
        customerNumber: 'C002',
        customerName: '腾讯',
        departments: ['金融市场部', '投资银行DCM'],
        visibleContent: ['触达记录', '收入'],
        visibleProducts: ['股票交易', '债券交易']
      }
    ]
  },
  {
    id: 3,
    name: '王五',
    level: '系统管理员',
    department: '投资银行ECM',
    permissions: [
      {
        id: 3,
        customerNumber: 'ALL',
        customerName: '全公司客户',
        departments: ['零售经纪部', '金融市场部', '财富管理部', '投资银行DCM', '投资银行ECM'],
        visibleContent: ['触达记录',, '收入'],
        visibleProducts: ['股票交易', '咨询', '债券交易', 'IPO', '发债']
      }
    ]
  }
];

export default function Permissions() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPermissionDetails, setShowPermissionDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const { toast } = useToast();

  const departments = ["零售经纪部", "金融市场部", "财富管理部", "投资银行DCM", "投资银行ECM"];
  const contentOptions = ["触达记录", "收入"];
  const productOptions = ["股票交易", "咨询", "债券交易", "IPO", "发债"];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.includes(searchTerm);
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleViewPermissions = (user: User) => {
    setSelectedUser(user);
    setShowPermissionDetails(true);
  };

  const handleEditPermission = (permission: Permission) => {
    setEditingPermission({...permission});
    setShowEditModal(true);
  };

  const handleAddPermission = () => {
    if (!selectedUser) return;
    
    setEditingPermission({
      id: Date.now(),
      customerNumber: '',
      customerName: '',
      departments: [selectedUser.department],
      visibleContent: [],
      visibleProducts: []
    });
    setShowEditModal(true);
  };

  const handleDeletePermission = (permissionId: number) => {
    if (!selectedUser) return;
    
    // 查找要删除的权限信息
    const permissionToDelete = selectedUser.permissions.find(p => p.id === permissionId);
    if (!permissionToDelete) return;
    
    // 显示确认提交审核的提示
    const confirmSubmit = window.confirm('确定要提交删除该权限的审核申请吗？');
    if (!confirmSubmit) return;
    
    // 这里可以添加提交审核的API调用
    // 例如: await api.submitPermissionDeletionReview(permissionId);
    
    toast({
      title: "删除申请已提交",
      description: `已提交删除 ${permissionToDelete.customerName || '该客户'} 权限的审核申请，请等待审核结果`
    });
  };

  const handleSavePermission = () => {
    if (!selectedUser || !editingPermission) return;
    
    const updatedPermissions = editingPermission.id ? 
      selectedUser.permissions.map(p => p.id === editingPermission.id ? editingPermission : p) :
      [...selectedUser.permissions, editingPermission];
    
    const updatedUser = {
      ...selectedUser,
      permissions: updatedPermissions
    };
    
    setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
    setSelectedUser(updatedUser);
    setShowEditModal(false);
    
    toast({
      title: "权限已保存",
      description: "权限信息已成功更新"
    });
  };

  const handleContentChange = (content: string) => {
    if (!editingPermission) return;
    
    const updatedContent = editingPermission.visibleContent.includes(content) ?
      editingPermission.visibleContent.filter(c => c !== content) :
      [...editingPermission.visibleContent, content];
    
    setEditingPermission({
      ...editingPermission,
      visibleContent: updatedContent
    });
  };

  const handleProductChange = (product: string) => {
    if (!editingPermission) return;
    
    const updatedProducts = editingPermission.visibleProducts.includes(product) ?
      editingPermission.visibleProducts.filter(p => p !== product) :
      [...editingPermission.visibleProducts, product];
    
    setEditingPermission({
      ...editingPermission,
      visibleProducts: updatedProducts
    });
  };

  const handleDepartmentChange = (dept: string) => {
    if (!editingPermission) return;
    
    const updatedDepartments = editingPermission.departments.includes(dept) ?
      editingPermission.departments.filter(d => d !== dept) :
      [...editingPermission.departments, dept];
    
    setEditingPermission({
      ...editingPermission,
      departments: updatedDepartments
    });
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-left">信息共享管理</h1>
      </div>
      {!showPermissionDetails ? (
        <>
          <div className="grid grid-cols-1 gap-y-4 px-4 md:flex md:flex-wrap md:gap-3 md:px-0">
            <div className="w-full md:w-36">
              <Input 
                placeholder="系统用户名称" 
                className="w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-36">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="所属部门" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有部门</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full md:w-auto"
                onClick={() => {
                  setSearchTerm('');
                  setDepartmentFilter('all');
                }}
              >
                重置
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-blue-500 hover:bg-blue-600 md:w-auto"
              >
                <Search className="h-4 w-4 mr-2" />
                查询
              </Button>
            </div>
          </div>
          <PaginationControl
        currentPage={1} // TODO: 用实际分页状态替换
        total={100}     // TODO: 用实际总条数替换
        pageSize={50}   // TODO: 用实际每页条数替换
        onPageChange={page => {
          // TODO: 替换为实际分页逻辑
          console.log('Change page:', page);
        }}
        onPageSizeChange={size => {
          // TODO: 替换为实际每页条数切换逻辑
          console.log('Change page size:', size);
        }}
      />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>系统用户名称</TableHead>
                  <TableHead>等级</TableHead>
                  <TableHead>所属部门</TableHead>
                  <TableHead className="text-right">权限明细</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.level}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewPermissions(user)}
                      >
                        查看和编辑
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowPermissionDetails(false)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              返回列表
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={handleAddPermission}
                  >
                    添加权限
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" style={{ maxWidth: 320, whiteSpace: 'pre-line' }}>
                  添加已存在客户时，请去编辑该客户的权限，不能新增
                  <br/>优先判断全部客户，再判断单个客户
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户编号</TableHead>
                  <TableHead>客户名称</TableHead>
                  <TableHead>涉及部门</TableHead>
                  <TableHead>可见内容</TableHead>
                  <TableHead>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>可见产品</span>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center" style={{ maxWidth: 640, whiteSpace: 'pre-line' }}>
                          股票交易:恒生柜台有账号<br/>咨询:CRM收入列表有发票(testdv.tfisec.cn/groupcrm/revenue/revenue_list)<br/>债券交易:CRM属于FICC客户testdv.tfisec.cn/groupcrm/product/product_list<br/>IPO:CRM收入列表有IPO(testdv.tfisec.cn/groupcrm/revenue/revenue_list)<br/>发债:投资银行DCM发行人(testdv.tfisec.cn/groupcrm/dcm-project/issuer)
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                </span>
                  </TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedUser?.permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>{permission.customerNumber}</TableCell>
                    <TableCell>{permission.customerName}</TableCell>
                    <TableCell>{permission.departments.join(', ')}</TableCell>
                    <TableCell>{permission.visibleContent.join(', ')}</TableCell>
                    <TableCell>{permission.visibleProducts.join(', ')}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditPermission(permission)}
                      >
                        编辑
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeletePermission(permission.id)}
                      >
                        删除
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {showEditModal && editingPermission && (
            <PermissionEditModal
              editingPermission={editingPermission}
              departments={departments}
              contentOptions={contentOptions}
              productOptions={productOptions}
              onDepartmentChange={handleDepartmentChange}
              onContentChange={handleContentChange}
              onProductChange={handleProductChange}
              onCustomerNumberChange={(value) => setEditingPermission({
                ...editingPermission,
                customerNumber: value
              })}
              onCustomerNameChange={(value) => setEditingPermission({
                ...editingPermission,
                customerName: value
              })}
              onSave={handleSavePermission}
              onCancel={() => setShowEditModal(false)}
              isNew={!editingPermission.id}
            />
          )}
        </>
      )}
    </div>
  );
}
