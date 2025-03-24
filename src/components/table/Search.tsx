"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sliders } from "@phosphor-icons/react";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchProps {
  filterOptions: FilterOption[];
  onSearch: (column: string, value: string) => void;
}

export function Search({ filterOptions, onSearch }: SearchProps) {
  const [filterColumn, setFilterColumn] = useState(filterOptions[0].value);
  const [searchValue, setSearchValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(filterColumn, value);
  };

  return (
    <div className="flex items-center border p-1 max-w-sm bg-white border-primary-500 rounded-lg">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <span className="px-2 text-primary-400 cursor-pointer">
            <Sliders size={24} />
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2">
          {filterOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                filterColumn === option.value ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setFilterColumn(option.value);
                setSearchValue("");
                onSearch(filterColumn, "");
                setIsPopoverOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </PopoverContent>
      </Popover>
      <div className="h-4 border-r-2 border-grey-500"></div>
      <input
        placeholder={`Cari berdasarkan ${
          filterOptions.find((opt) => opt.value === filterColumn)?.label
        }...`}
        value={searchValue}
        onChange={handleSearchChange}
        className="w-full px-3 bg-transparent text-sm font-normal placeholder-primary-400 outline-none"
      />
    </div>
  );
}
