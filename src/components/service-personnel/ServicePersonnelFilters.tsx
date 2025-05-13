
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ServicePersonnel } from "@/types/servicePersonnel";
import { SearchControls } from "@/components/filters/SearchControls";
import { FilterPopover } from "@/components/filters/FilterPopover";
import { industryOptions, statusOptions } from "@/pages/ServicePersonnel";
import { useIsMobile } from "@/hooks/use-mobile";

interface ServicePersonnelFiltersProps {
  personnel: ServicePersonnel[];
  onFilter: (filtered: ServicePersonnel[]) => void;
}

export function ServicePersonnelFilters({ 
  personnel, 
  onFilter 
}: ServicePersonnelFiltersProps) {
  const isMobile = useIsMobile();
  const [nameFilter, setNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<Array<string>>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Array<string>>([]);

  // Update filtered personnel when filters change
  useEffect(() => {
    applyFilters();
  }, [nameFilter, positionFilter, selectedIndustries, selectedStatuses, personnel]);

  const applyFilters = () => {
    let filtered = [...personnel];

    // Filter by name
    if (nameFilter) {
      filtered = filtered.filter(
        person => 
          person.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
          person.englishName.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Filter by position
    if (positionFilter) {
      filtered = filtered.filter(
        person => person.position.toLowerCase().includes(positionFilter.toLowerCase())
      );
    }

    // Filter by industry
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(person => selectedIndustries.includes(person.industry));
    }

    // Filter by status
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(person => selectedStatuses.includes(person.status));
    }

    onFilter(filtered);
  };

  const handleReset = () => {
    setNameFilter("");
    setPositionFilter("");
    setSelectedIndustries([]);
    setSelectedStatuses([]);
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-1 md:grid-cols-4"} gap-4`}>
          <div>
            <Input
              placeholder="名称/英文名"
              value={nameFilter}
              onChange={e => setNameFilter(e.target.value)}
            />
          </div>
          
          <div>
            <Input
              placeholder="职务"
              value={positionFilter}
              onChange={e => setPositionFilter(e.target.value)}
            />
          </div>
          
          <div>
            <FilterPopover
              label="选择行业"
              options={Array.from(industryOptions)}
              selectedItems={selectedIndustries}
              onItemSelect={(industry) => {
                setSelectedIndustries(prev => 
                  prev.includes(industry)
                    ? prev.filter(i => i !== industry)
                    : [...prev, industry]
                );
              }}
            />
          </div>
          
          <div>
            <FilterPopover
              label="选择状态"
              options={Array.from(statusOptions)}
              selectedItems={selectedStatuses}
              onItemSelect={(status) => {
                setSelectedStatuses(prev => 
                  prev.includes(status)
                    ? prev.filter(s => s !== status)
                    : [...prev, status]
                );
              }}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <SearchControls 
            onReset={handleReset} 
            onSearch={applyFilters}
          />
        </div>
      </CardContent>
    </Card>
  );
}
