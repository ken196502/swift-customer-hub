import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { countries } from "@/utils/countries";

function countryCodeToFlagEmoji(code: string): string {
  // Only works for 2-letter country codes
  if (!code || code.length !== 2) return "";
  const codePoints = code.toUpperCase().split("").map(c => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

interface Option {
  value: string;
  label: string;
}

interface CountryAutocompleteProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({ value, onChange, disabled }) => {
  const [inputValue, setInputValue] = useState("");
  const options: Option[] = countries;

  const filtered = useMemo(() => {
    if (!inputValue) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div>
      <Input
        placeholder="搜索国家/地区"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        disabled={disabled}
        className="mb-2"
      />
      <div className="max-h-56 overflow-y-auto border rounded bg-white shadow">
        {filtered.map(option => (
          <div
            key={option.value}
            className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 ${option.value === value ? 'bg-blue-100' : ''}`}
            onClick={() => { if (!disabled) { onChange(option.value); setInputValue(""); } }}
          >
            <span className="mr-2 text-xl">{countryCodeToFlagEmoji(option.value)}</span>
            <span>{option.label}</span>
          </div>
        ))}
        {filtered.length === 0 && <div className="px-3 py-2 text-gray-400">无匹配结果</div>}
      </div>
      {selectedOption && (
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-xl">{countryCodeToFlagEmoji(selectedOption.value)}</span>
          <span>{selectedOption.label}</span>
        </div>
      )}
    </div>
  );
};
