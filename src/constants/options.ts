export interface OptionType {
  value: string;
  label: string;
}

export const tipeFieldOptions: OptionType[] = [
  { value: "text_field", label: "Text Field" },
  { value: "dropdown", label: "Dropdown" },
];

export const tipeDataOptions: OptionType[] = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
];

export const sifatOptions: OptionType[] = [
  { value: "mandatory", label: "Mandatory" },
  { value: "opsional", label: "Opsional" },
];

export const jenisLokasiOptions: OptionType[] = [
  { value: "1", label: "Statis" },
  { value: "2", label: "Dinamis" },
];

export const unitOptions: OptionType[] = [
  { value: "Hari", label: "Hari" },
  { value: "Jam", label: "Jam" },
  { value: "Bulan", label: "Bulan" },
];

export const sortOptions: OptionType[] = [
  { value: "desc", label: "Terbaru" },
  { value: "asc", label: "Terlama" },
];
