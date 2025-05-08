
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft } from 'lucide-react';
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

interface User {
  id: number;
  name: string;
  level: string;
  department: string;
  permissions: Permission[];
}

interface Permission {
  id: number;
  customerNumber: string;
  customerName: string;
  departments: string[];
  visibleContent: string[];
  visibleProducts: string[];
}

const mockUsers: User[] = [
  {
    id: 1,
    name: '张三',
    level: '员工',
    department: '零售经纪',
    permissions: [
      {
        id: 1,
        customerNumber: 'C001',
        customerName: '小米集团',
        departments: ['零售经纪'],
        visibleContent: ['触达记录', '客户画像'],
        visibleProducts: ['股票交易']
      }
    ]
  },
  {
    id: 2,
    name: '李四',
    level: '部门管理层',
    department: '机构经纪',
    permissions: [
      {
        id: 2,
        customerNumber: 'C002',
        customerName: '腾讯',
        departments: ['机构经纪', 'DCM'],
        visibleContent: ['触达记录', '收入'],
        visibleProducts: ['股票交易', '债券交易']
      }
    ]
  },
  {
    id: 3,
    name: '王五',
    level: '公司管理层',
    department: 'ECM',
    permissions: [
      {
        id: 3,
        customerNumber: 'ALL',
        customerName: '全公司客户',
        departments: ['零售经纪', '机构经纪', '跨资产', 'DCM', 'ECM'],
        visibleContent: ['触达记录', '客户画像', '收入'],
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

  const departments = ["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"];
  const contentOptions = ["触达记录", "客户画像", "收入"];
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
    
    const updatedUser = {
      ...selectedUser,
      permissions: selectedUser.permissions.filter(p => p.id !== permissionId)
    };
    
    setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
    setSelectedUser(updatedUser);
    
    toast({
      title: "权限已删除",
      description: "该权限信息已成功删除"
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
    <div className="mx-auto py-6 space-y-6">
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">选择</TableHead>
                  <TableHead>系统用户名称</TableHead>
                  <TableHead>等级</TableHead>
                  <TableHead>所属部门</TableHead>
                  <TableHead className="text-right">权限明细</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="w-[50px]">
                      <Input type="checkbox" className="w-4 h-4" />
                    </TableCell>
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
            <Button 
              variant="default" 
              size="sm"
              onClick={handleAddPermission}
            >
              添加权限
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户编号</TableHead>
                  <TableHead>客户名称</TableHead>
                  <TableHead>涉及部门</TableHead>
                  <TableHead>可见内容</TableHead>
                  <TableHead>可见产品</TableHead>
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">
                  {editingPermission.id ? '编辑权限' : '添加权限'}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">客户编号</label>
                    <Input 
                      value={editingPermission.customerNumber} 
                      onChange={(e) => setEditingPermission({
                        ...editingPermission,
                        customerNumber: e.target.value
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">客户名称</label>
                    <Input 
                      value={editingPermission.customerName} 
                      onChange={(e) => setEditingPermission({
                        ...editingPermission,
                        customerName: e.target.value
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">涉及部门</label>
                    <div className="grid grid-cols-2 gap-2">
                      {departments.map(dept => (
                        <label key={dept} className="flex items-center space-x-2">
                          <Input 
                            type="checkbox" 
                            className="w-4 h-4"
                            checked={editingPermission.departments.includes(dept)}
                            onChange={() => handleDepartmentChange(dept)}
                          />
                          <span>{dept}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">可见内容</label>
                    <div className="grid grid-cols-2 gap-2">
                      {contentOptions.map(content => (
                        <label key={content} className="flex items-center space-x-2">
                          <Input 
                            type="checkbox" 
                            className="w-4 h-4"
                            checked={editingPermission.visibleContent.includes(content)}
                            onChange={() => handleContentChange(content)}
                          />
                          <span>{content}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">可见产品</label>
                    <div className="grid grid-cols-2 gap-2">
                      {productOptions.map(product => (
                        <label key={product} className="flex items-center space-x-2">
                          <Input 
                            type="checkbox" 
                            className="w-4 h-4"
                            checked={editingPermission.visibleProducts.includes(product)}
                            onChange={() => handleProductChange(product)}
                          />
                          <span>{product}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditModal(false)}
                  >
                    取消
                  </Button>
                  <Button 
                    onClick={handleSavePermission}
                  >
                    保存
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
