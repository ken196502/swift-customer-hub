
import { Badge } from "@/components/ui/badge";
import { getTagColor, getProductColor } from "@/utils/colorUtils";

interface DepartmentBadgesProps {
  departments?: string[];
}

export const DepartmentBadges = ({ departments }: DepartmentBadgesProps) => (
  <div className="flex flex-wrap gap-1">
    {departments?.map((dept, i) => (
      <Badge
        key={i}
        variant="outline"
        className={getTagColor(dept)}
      >
        {dept}
      </Badge>
    ))}
  </div>
);

interface ProductBadgesProps {
  products: string[];
}

export const ProductBadges = ({ products }: ProductBadgesProps) => (
  <div className="flex flex-wrap gap-1">
    {products.map((product, i) => (
      <Badge
        key={i}
        variant="outline"
        className={getProductColor(product)}
      >
        {product}
      </Badge>
    ))}
  </div>
);

interface ProgressBadgeProps {
  progress?: string;
}

export const ProgressBadge = ({ progress }: ProgressBadgeProps) => (
  <Badge
    variant={progress === "落地" ? "default" : "outline"}
    className={progress === "落地" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
  >
    {progress || "意向"}
  </Badge>
);
