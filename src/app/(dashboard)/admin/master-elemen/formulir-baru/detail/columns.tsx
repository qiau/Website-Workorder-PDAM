"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Detail = {
  id: number;
  judulPilihan: string;
  order: number;
};

export const columns: ColumnDef<Detail>[] = [
  {
    header: "No",
    size: 15,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "judulPilihan",
    header: "Judul Pilihan",
    size: 100,
  },
  {
    id: "drag",
    header: "",
    size: 400,
    cell: () => null,
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-6 justify-center">
          <Button variant={"primary"}>Edit</Button>
          <Button variant={"danger"} onClick={() => alert("Hapus")}>
            Hapus
          </Button>
        </div>
      );
    },
  },
];
