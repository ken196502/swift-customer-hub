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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-left w-full flex justify-start">
          {isNew ? '添加权限' : '编辑权限'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-left">客户编号</label>
            <Input 
              value={editingPermission.customerNumber} 
              onChange={(e) => onCustomerNumberChange(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-left">客户名称</label>
            <Input 
              value={editingPermission.customerName} 
              readOnly
              placeholder="系统通过客户号自动获取客户名称"
              className="bg-gray-100"
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
            <label className="block text-sm font-medium mb-1 text-left">可见产品</label>
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
