"use client";

import { Button } from "@/components/ui/button";
import { numberFilterFn } from "@/utils/numberFilter";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Detail = {
  id: number;
  judul: string;
  fieldSlug: string;
  tipeParameter: string;
  unitSatuan: string;
  min: number;
  max: number;
  parentField: string;
  panjangMaksimal: number;
  sifat: string;
  keterangan: string;
};

export const columns: ColumnDef<Detail>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "judul",
    header: "Judul",
  },
  {
    accessorKey: "fieldSlug",
    header: "Field Slug",
  },
  {
    accessorKey: "tipeParameter",
    header: "Tipe Parameter",
  },
  {
    accessorKey: "unitSatuan",
    header: "Unit Satuan",
  },
  {
    accessorKey: "min",
    header: "Min",
    filterFn: numberFilterFn,
  },
  {
    accessorKey: "max",
    header: "Max",
    filterFn: numberFilterFn,
  },
  {
    accessorKey: "parentField",
    header: "Parent Field",
  },
  {
    accessorKey: "panjangMaksimal",
    header: "Panjang Maksimal",
    filterFn: numberFilterFn,
  },
  {
    accessorKey: "sifat",
    header: "Sifat",
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-3 justify-center">
          <Button variant={"primary"}>Detail</Button>
          <Button variant={"secondary"}>Ubah</Button>
          <Button variant={"danger"} onClick={() => alert("Hapus")}>
            Hapus
          </Button>
        </div>
      );
    },
  },
];
