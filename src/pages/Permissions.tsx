
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomer } from "@/contexts/CustomerContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Edit, X, Plus, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define types for permissions data structures
interface PermissionDetail {
  id: number;
  customerId: number | null; // null means "all customers"
  customerName: string; // "全公司客户" or customer name
  customerNumber?: string;
  departments: string[] | null; // null means "all departments"
  visibleContent: "触达记录" | "客户画像" | "收入";
  visibleProduct: "股票交易" | "咨询" | "债券交易" | "IPO" | "发债";
}

interface UserPermission {
  id: number;
  name: string;
  level: "公司管理层" | "合规风控" | "部门管理层" | "员工";
  department: string;
  details: PermissionDetail[];
}

export default function Permissions() {
  const { departments, customers } = useCustomer();
  
  // Mock data for system users
  const [users, setUsers] = useState<UserPermission[]>([
    {
      id: 1,
      name: "张三",
      level: "公司管理层",
      department: "零售经纪",
      details: [
        {
          id: 1,
          customerId: null,
          customerName: "全公司客户",
          departments: null,
          visibleContent: "触达记录",
          visibleProduct: "股票交易",
        }
      ]
    },
    {
      id: 2,
      name: "李四",
      level: "部门管理层",
      department: "机构经纪",
      details: [
        {
          id: 2,
          customerId: null,
          customerName: "全公司客户",
          departments: ["机构经纪"],
          visibleContent: "触达记录",
          visibleProduct: "股票交易",
        }
      ]
    },
    {
      id: 3,
      name: "王五",
      level: "员工",
      department: "DCM",
      details: [
        {
          id: 3,
          customerId: 1,
          customerName: customers[0]?.shortNameCn || "某客户",
          customerNumber: customers[0]?.customerNumber,
          departments: ["DCM"],
          visibleContent: "触达记录",
          visibleProduct: "发债",
        }
      ]
    },
  ]);

  // Search state
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState<string | null>(null);
  
  // Selected users
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  
  // Dialog states
  const [showPermissionDetailDialog, setShowPermissionDetailDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserPermission | null>(null);
  const [selectedPermissionDetail, setSelectedPermissionDetail] = useState<PermissionDetail | null>(null);
  const [newPermissionDetail, setNewPermissionDetail] = useState<Partial<PermissionDetail>>({
    customerId: null,
    customerName: "全公司客户",
    departments: [],
    visibleContent: "触达记录",
    visibleProduct: "股票交易"
  });

  // Filter users based on search criteria
  const filteredUsers = users.filter(user => {
    const nameMatch = user.name.includes(searchName);
    const departmentMatch = !searchDepartment || user.department === searchDepartment;
    return nameMatch && departmentMatch;
  });

  // Toggle user selection
  const toggleSelectUser = (id: number) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id)
        : [...prev, id]
    );
  };
  
  // Toggle all selection
  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  // Handle opening permission details
  const handleOpenPermissionDetail = (user: UserPermission, isEdit = false) => {
    setSelectedUser(user);
    setEditMode(isEdit);
    setShowPermissionDetailDialog(true);
  };

  // Handle opening edit detail dialog
  const handleEditDetail = (detail: PermissionDetail) => {
    setSelectedPermissionDetail(detail);
    setNewPermissionDetail({
      customerId: detail.customerId,
      customerName: detail.customerName,
      customerNumber: detail.customerNumber,
      departments: detail.departments,
      visibleContent: detail.visibleContent,
      visibleProduct: detail.visibleProduct
    });
  };

  // Handle saving detail changes
  const handleSaveDetailChanges = () => {
    if (!selectedUser || !selectedPermissionDetail) return;
    
    // Update the user's permission details
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        const updatedDetails = user.details.map(detail => {
          if (detail.id === selectedPermissionDetail.id) {
            return {
              ...detail,
              ...newPermissionDetail,
              id: detail.id,
            } as PermissionDetail;
          }
          return detail;
        });
        
        return {
          ...user,
          details: updatedDetails
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setSelectedPermissionDetail(null);
  };

  // Handle adding new permission detail
  const handleAddNewDetail = () => {
    if (!selectedUser) return;
    
    const newDetail: PermissionDetail = {
      id: Math.max(0, ...selectedUser.details.map(d => d.id)) + 1,
      customerId: null,
      customerName: "全公司客户",
      departments: [],
      visibleContent: "触达记录",
      visibleProduct: "股票交易"
    };
    
    // Add the new detail to the user's permissions
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          details: [...user.details, newDetail]
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setSelectedPermissionDetail(newDetail);
    setNewPermissionDetail({
      customerId: null,
      customerName: "全公司客户",
      departments: [],
      visibleContent: "触达记录",
      visibleProduct: "股票交易"
    });
  };

  // Handle deleting a permission detail
  const handleDeleteDetail = (detailId: number) => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          details: user.details.filter(detail => detail.id !== detailId)
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setSelectedPermissionDetail(null);
  };

  // Handle reset search
  const handleResetSearch = () => {
    setSearchName("");
    setSearchDepartment(null);
  };

  const contentOptions = ["触达记录", "客户画像", "收入"] as const;
  const productOptions = ["股票交易", "咨询", "债券交易", "IPO", "发债"] as const;
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">共享权限管理</h1>
      
      {/* Search Section */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <h2 className="text-lg font-semibold">搜索</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="searchName">系统用户名称</Label>
            <div className="relative">
              <Input 
                id="searchName"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="输入用户名称" 
                className="pl-9"
              />
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div>
            <Label htmlFor="searchDepartment">所属部门</Label>
            <Select 
              value={searchDepartment || ""} 
              onValueChange={(value) => setSearchDepartment(value || null)}
            >
              <SelectTrigger id="searchDepartment">
                <SelectValue placeholder="选择部门" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleResetSearch}>重置</Button>
          <Button>查询</Button>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>系统用户名称</TableHead>
              <TableHead>等级</TableHead>
              <TableHead>所属部门</TableHead>
              <TableHead>权限明细</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleSelectUser(user.id)}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.level}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleOpenPermissionDetail(user, true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    编辑权限
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Permission Detail Dialog */}
      <Dialog open={showPermissionDetailDialog} onOpenChange={setShowPermissionDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "编辑权限明细" : "查看权限明细"} - {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedUser && (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">权限列表</h3>
                  {editMode && (
                    <Button 
                      size="sm" 
                      onClick={handleAddNewDetail}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加权限
                    </Button>
                  )}
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>客户编号</TableHead>
                      <TableHead>客户名称</TableHead>
                      <TableHead>涉及部门</TableHead>
                      <TableHead>可见内容</TableHead>
                      <TableHead>可见产品</TableHead>
                      {editMode && <TableHead className="w-24">操作</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedUser.details.map((detail) => (
                      <TableRow 
                        key={detail.id} 
                        className={selectedPermissionDetail?.id === detail.id ? "bg-blue-50" : ""}
                      >
                        <TableCell>{detail.customerNumber || "-"}</TableCell>
                        <TableCell>{detail.customerName}</TableCell>
                        <TableCell>
                          {detail.departments ? (
                            <div className="flex flex-wrap gap-1">
                              {detail.departments.map(dept => (
                                <Badge key={dept} variant="outline">{dept}</Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-blue-500 font-medium">全部</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{detail.visibleContent}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{detail.visibleProduct}</Badge>
                        </TableCell>
                        {editMode && (
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button 
                                size="icon" 
                                variant="outline" 
                                onClick={() => handleEditDetail(detail)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteDetail(detail.id)}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {selectedPermissionDetail && (
                  <div className="border p-4 rounded-lg space-y-4 bg-blue-50">
                    <h3 className="font-semibold">编辑权限</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="customerType">客户范围</Label>
                        <Select 
                          value={newPermissionDetail.customerId === null ? "all" : "specific"} 
                          onValueChange={(value) => {
                            if (value === "all") {
                              setNewPermissionDetail({
                                ...newPermissionDetail,
                                customerId: null,
                                customerName: "全公司客户"
                              });
                            }
                          }}
                        >
                          <SelectTrigger id="customerType">
                            <SelectValue placeholder="选择客户范围" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">全公司客户</SelectItem>
                            <SelectItem value="specific">特定客户</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {newPermissionDetail.customerId !== null && (
                        <div>
                          <Label htmlFor="customerSelect">选择客户</Label>
                          <Select 
                            value={String(newPermissionDetail.customerId || "")}
                            onValueChange={(value) => {
                              const customerId = parseInt(value);
                              const customer = customers.find(c => c.id === customerId);
                              setNewPermissionDetail({
                                ...newPermissionDetail,
                                customerId: customerId,
                                customerName: customer?.shortNameCn || "",
                                customerNumber: customer?.customerNumber
                              });
                            }}
                          >
                            <SelectTrigger id="customerSelect">
                              <SelectValue placeholder="选择客户" />
                            </SelectTrigger>
                            <SelectContent>
                              {customers.map((customer) => (
                                <SelectItem key={customer.id} value={String(customer.id)}>
                                  {customer.shortNameCn}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div>
                        <Label htmlFor="departmentType">部门范围</Label>
                        <Select 
                          value={newPermissionDetail.departments === null ? "all" : "specific"} 
                          onValueChange={(value) => {
                            setNewPermissionDetail({
                              ...newPermissionDetail,
                              departments: value === "all" ? null : []
                            });
                          }}
                        >
                          <SelectTrigger id="departmentType">
                            <SelectValue placeholder="选择部门范围" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">全部部门</SelectItem>
                            <SelectItem value="specific">特定部门</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {newPermissionDetail.departments !== null && (
                        <div>
                          <Label htmlFor="departmentSelect">选择部门</Label>
                          <Select 
                            value={newPermissionDetail.departments && newPermissionDetail.departments[0] || ""}
                            onValueChange={(value) => {
                              setNewPermissionDetail({
                                ...newPermissionDetail,
                                departments: [value]
                              });
                            }}
                          >
                            <SelectTrigger id="departmentSelect">
                              <SelectValue placeholder="选择部门" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>可见内容</Label>
                      <RadioGroup
                        value={newPermissionDetail.visibleContent as string}
                        onValueChange={(value) => setNewPermissionDetail({
                          ...newPermissionDetail,
                          visibleContent: value as typeof contentOptions[number]
                        })}
                        className="flex flex-wrap gap-2"
                      >
                        {contentOptions.map((content) => (
                          <div key={content} className="flex items-center space-x-2">
                            <RadioGroupItem value={content} id={`content-${content}`} />
                            <Label htmlFor={`content-${content}`}>{content}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>可见产品</Label>
                      <RadioGroup
                        value={newPermissionDetail.visibleProduct as string}
                        onValueChange={(value) => setNewPermissionDetail({
                          ...newPermissionDetail,
                          visibleProduct: value as typeof productOptions[number]
                        })}
                        className="flex flex-wrap gap-2"
                      >
                        {productOptions.map((product) => (
                          <div key={product} className="flex items-center space-x-2">
                            <RadioGroupItem value={product} id={`product-${product}`} />
                            <Label htmlFor={`product-${product}`}>{product}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setSelectedPermissionDetail(null)}>
                        取消
                      </Button>
                      <Button onClick={handleSaveDetailChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        保存
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionDetailDialog(false)}>关闭</Button>
            {selectedUser && editMode && (
              <Button>保存更改</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
