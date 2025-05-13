
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ServicePersonnel } from "@/types/servicePersonnel";
import { Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface ServicePersonnelTableProps {
  personnel: ServicePersonnel[];
  onEdit: (personnel: ServicePersonnel) => void;
  onDelete: (id: number) => void;
}

export function ServicePersonnelTable({ 
  personnel,
  onEdit,
  onDelete
}: ServicePersonnelTableProps) {
  const isMobile = useIsMobile();

  // Desktop view
  const DesktopTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>名称</TableHead>
          <TableHead>英文名</TableHead>
          <TableHead>职务</TableHead>
          <TableHead>行业</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>关联系统用户</TableHead>
          <TableHead>邮箱</TableHead>
          <TableHead>手机</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {personnel.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-4">
              暂无数据
            </TableCell>
          </TableRow>
        ) : (
          personnel.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.englishName}</TableCell>
              <TableCell>{person.position}</TableCell>
              <TableCell>{person.industry}</TableCell>
              <TableCell>
                <Badge variant={person.status === "在职" ? "default" : "secondary"}>
                  {person.status}
                </Badge>
              </TableCell>
              <TableCell>{person.systemUser}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.phone}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(person)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDelete(person.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  // Mobile view
  const MobileView = () => (
    <div className="space-y-4">
      {personnel.length === 0 ? (
        <div className="text-center py-4 border rounded-md">
          暂无数据
        </div>
      ) : (
        personnel.map((person) => (
          <div 
            key={person.id}
            className="p-4 border rounded-md space-y-3"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{person.name}</div>
                <div className="text-sm text-muted-foreground">{person.englishName}</div>
              </div>
              <Badge variant={person.status === "在职" ? "default" : "secondary"}>
                {person.status}
              </Badge>
            </div>
            
            <div className="text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">职务:</span>
                <span>{person.position}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">行业:</span>
                <span>{person.industry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">系统用户:</span>
                <span>{person.systemUser}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">邮箱:</span>
                <span>{person.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">手机:</span>
                <span>{person.phone}</span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit(person)}
              >
                <Edit className="h-4 w-4 mr-1" />
                编辑
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDelete(person.id)}
              >
                <Trash className="h-4 w-4 mr-1" />
                删除
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="border rounded-md">
      <div className={isMobile ? "block" : "hidden"}>
        <MobileView />
      </div>
      <div className={isMobile ? "hidden" : "block"}>
        <DesktopTable />
      </div>
    </div>
  );
}
