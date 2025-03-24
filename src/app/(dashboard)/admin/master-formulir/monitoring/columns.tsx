"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export type Detail = {
  id: number;
  jenisWorkorder: string;
  jumlahKomponen: number;
};

export const columns: ColumnDef<Detail>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "jenisWorkorder",
    header: "Jenis Workorder",
  },
  {
    accessorKey: "jumlahKomponen",
    header: "Jumlah Komponen",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;

      return (
        <div className="flex gap-3 justify-center">
          <Button
            variant={"primary"}
            onClick={() => router.push(`/monitoring/detail/${data.id}`)}
          >
            Detail
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => router.push(`/monitoring/edit/${data.id}`)}
          >
            Edit
          </Button>
          <Button variant={"danger"} onClick={() => alert("Hapus")}>
            Hapus
          </Button>
        </div>
      );
    },
  },
];
