
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ServicePersonnel } from "@/types/servicePersonnel";
import { SearchControls } from "@/components/filters/SearchControls";
import { FilterPopover } from "@/components/filters/FilterPopover";
import { industryOptions, statusOptions } from "@/pages/ServicePersonnel";

interface ServicePersonnelFiltersProps {
  personnel: ServicePersonnel[];
  onFilter: (filtered: ServicePersonnel[]) => void;
}

export function ServicePersonnelFilters({ 
  personnel, 
  onFilter 
}: ServicePersonnelFiltersProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="name-filter">名称/英文名</Label>
            <Input
              id="name-filter"
              placeholder="输入名称或英文名"
              value={nameFilter}
              onChange={e => setNameFilter(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="position-filter">职务</Label>
            <Input
              id="position-filter"
              placeholder="输入职务"
              value={positionFilter}
              onChange={e => setPositionFilter(e.target.value)}
            />
          </div>
          
          <div>
            <Label>行业</Label>
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
            <Label>状态</Label>
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
