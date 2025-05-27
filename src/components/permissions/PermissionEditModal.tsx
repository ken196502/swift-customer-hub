import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Permission } from '@/types/permission';

interface PermissionEditModalProps {
  editingPermission: Permission;
  departments: string[];
  contentOptions: string[];
  productOptions: string[];
  onDepartmentChange: (dept: string) => void;
  onContentChange: (content: string) => void;
  onProductChange: (product: string) => void;
  onCustomerNumberChange: (value: string) => void;
  onCustomerNameChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew: boolean;
}

import React, { useState } from 'react';

export function PermissionEditModal({
  editingPermission,
  departments,
  contentOptions,
  productOptions,
  onDepartmentChange,
  onContentChange,
  onProductChange,
  onCustomerNumberChange,
  onCustomerNameChange,
  onSave,
  onCancel,
  isNew
}: PermissionEditModalProps) {
  const [allCustomers, setAllCustomers] = useState(false);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-left w-full flex justify-start">
          {isNew ? '添加权限' : '编辑权限'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2 mb-2">
              <Input
                type="checkbox"
                className="w-4 h-4"
                checked={allCustomers}
                onChange={() => setAllCustomers((prev) => !prev)}
              />
              <span>全部客户</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-left">客户编号</label>
            <Input 
              value={editingPermission.customerNumber} 
              onChange={(e) => onCustomerNumberChange(e.target.value)}
              disabled={allCustomers}
              placeholder={allCustomers ? '符合下面条件的全部客户' : ''}
              className={allCustomers?"bg-gray-200":""}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-left">客户名称</label>
            <Input 
              value={editingPermission.customerName} 
              disabled={true}              
              placeholder="系统通过客户号自动获取客户名称"
              className="bg-gray-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-left">涉及部门</label>
            <div className="grid grid-cols-2 gap-2">
              {departments.map(dept => (
                <label key={dept} className="flex items-center space-x-2">
                  <Input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={editingPermission.departments.includes(dept)}
                    onChange={() => onDepartmentChange(dept)}
                  />
                  <span>{dept}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-left">可见内容</label>
            <div className="grid grid-cols-2 gap-2">
              {contentOptions.map(content => (
                <label key={content} className="flex items-center space-x-2">
                  <Input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={editingPermission.visibleContent.includes(content)}
                    onChange={() => onContentChange(content)}
                  />
                  <span>{content}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-left">可见产品记录</label>
            <div className="grid grid-cols-2 gap-2">
              {productOptions.map(product => (
                <label key={product} className="flex items-center space-x-2">
                  <Input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={editingPermission.visibleProducts.includes(product)}
                    onChange={() => onProductChange(product)}
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
            onClick={onCancel}
          >
            取消
          </Button>
          <Button 
            onClick={onSave}
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PermissionEditModal;
