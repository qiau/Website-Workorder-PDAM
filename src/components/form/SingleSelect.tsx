import { OptionType } from "@/constants/options";
import React, { useEffect, useState } from "react";
import Select from "react-select";

type SingleSelectProps = {
  label?: string;
  variant?: "clear" | "default";
  placeholder: string;
  isSearchable?: boolean;
  options: OptionType[];
  value: OptionType | null;
  onChange: (selected: OptionType) => void;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

const SingleSelect: React.FC<SingleSelectProps> = ({
  label,
  variant = "default",
  placeholder,
  isSearchable = false,
  options,
  value,
  onChange,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  const variantStyles = {
    clear: {
      control: (provided: any) => ({
        ...provided,
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        height: "40px",
        border: "2px solid #E2E8F0",
        width: "88px",
        fontSize: "14px",
        fontWeight: 500,
        ":hover": {
          borderColor: "#E2E8F0",
          cursor: "pointer",
        },
      }),
      placeholder: (provided: any) => ({
        ...provided,
        color: "#000000",
        fontSize: "14px",
        fontWeight: 500,
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "#007bff"
          : state.isFocused
          ? "#e0e0e0"
          : "#ffffff",
        color: state.isSelected ? "white" : "black",
        fontWeight: 500,
        fontSize: "14px",
        padding: "10px",
      }),
      dropdownIndicator: (provided: any) => ({
        ...provided,
        color: "#87878B",
        backgroundColor: "transparent",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    },
    default: {
      control: (provided: any) => ({
        ...provided,
        width: "100%",
        height: "40px",
        fontSize: "16px",
        backgroundColor: "#F7F7F7",
        border: "2px solid #2D499B",
        borderRadius: "8px",
        cursor: "pointer",
        ":hover": {
          borderColor: "#2D499B",
        },
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "#2A83C6"
          : state.isFocused
          ? "#f0f0f0"
          : "#ffffff",
        color: state.isSelected ? "white" : "black",
        padding: "10px",
      }),
      dropdownIndicator: (provided: any) => ({
        ...provided,
        color: "#87878B",
        backgroundColor: "transparent",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    },
  };

  const customStyles = variantStyles[variant];

  return (
    <div>
      {label && (
        <label className="block text-base font-medium text-primary-500 mb-1">
          {label}
        </label>
      )}
      <Select
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        isSearchable={isSearchable}
        value={value}
        onChange={(selected) => onChange(selected as OptionType)}
      />
    </div>
  );
};

export default SingleSelect;
