"use client";

import { Button } from "@/components/ui/button";
import { numberFilterFn } from "@/utils/numberFilter";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Detail = {
  id: number;
  judulElemen: string | null;
  tipeField: string;
  jumlahPilihan: number;
};

export const columns: ColumnDef<Detail>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "judulElemen",
    header: "Judul Elemen",
    // cell: ({ row }) => row.original.judulElemen || "-",
  },
  {
    accessorKey: "tipeField",
    header: "Tipe Field",
  },
  {
    accessorKey: "jumlahPilihan",
    header: "Jumlah Pilihan",
    filterFn: numberFilterFn,
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-6 justify-center">
          <Button variant={"primary"}>Lihat Isi</Button>
          <Button variant={"danger"} onClick={() => alert("Hapus")}>
            Hapus
          </Button>
        </div>
      );
    },
  },
];
