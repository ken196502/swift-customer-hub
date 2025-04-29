
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { Customer } from "@/pages/Index";

interface TagSelectorProps {
  label: string;
  options: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  bgColorClass?: string;
}

export function TagSelector({ label, options, selectedItems, onToggle, bgColorClass = "bg-blue-100" }: TagSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => (
          <div 
            key={item}
            onClick={() => onToggle(item)}
            className={`px-3 py-1 rounded-md cursor-pointer border flex items-center gap-2 ${
              selectedItems?.includes(item)
                ? `${bgColorClass} border-${bgColorClass.replace('bg-', 'border-')}`
                : 'bg-white border-gray-200'
            }`}
          >
            {selectedItems?.includes(item) && <Check className="h-4 w-4" />}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
