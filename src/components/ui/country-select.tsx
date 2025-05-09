import React, { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { countries } from "@/utils/countries";

function countryCodeToFlagEmoji(code: string): string {
  if (!code || code.length !== 2) return "";
  const codePoints = code.toUpperCase().split("").map(c => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

interface CountrySelectProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, disabled }) => {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search) return countries;
    return countries.filter(option =>
      option.label.toLowerCase().includes(search.toLowerCase()) ||
      option.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="请选择国家/地区" />
      </SelectTrigger>
      <SelectContent>
        <div className="px-2 pt-2 pb-1 sticky top-0 bg-white z-10">
          <Input
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索国家/地区"
            className="mb-2"
            onClick={e => e.stopPropagation()}
          />
        </div>
        {filtered.length === 0 && (
          <div className="px-3 py-2 text-gray-400">无匹配结果</div>
        )}
        {filtered.map(option => (
          <SelectItem key={option.value} value={option.value}>
            <span className="mr-2 text-xl">{countryCodeToFlagEmoji(option.value)}</span>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
