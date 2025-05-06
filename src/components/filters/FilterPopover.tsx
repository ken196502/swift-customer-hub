
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterPopoverProps {
  label: string;
  options: string[];
  selectedItems: string[];
  onItemSelect: (item: string) => void;
}

export function FilterPopover({ label, options, selectedItems, onItemSelect }: FilterPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {label}
          {selectedItems.length > 0 && (
            <Badge className="ml-2 bg-blue-100 text-blue-800">
              {selectedItems.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="p-2 space-y-1">
          {options.map((item) => (
            <div
              key={item}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-gray-100",
                selectedItems.includes(item) && "bg-gray-100"
              )}
              onClick={() => onItemSelect(item)}
            >
              <div className={cn(
                "h-4 w-4 border rounded-sm flex items-center justify-center",
                selectedItems.includes(item) ? "bg-blue-500 border-blue-500" : "border-gray-300"
              )}>
                {selectedItems.includes(item) && <Check className="h-3 w-3 text-white" />}
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
