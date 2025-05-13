
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
  return (
    <div className="border rounded-md">
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
    </div>
  );
}
