"use client";

import { Button } from "@/components/ui/button";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export type Option = {
  id: number;
  detailFormId?: number;
  namaOpsi: string;
  parent: number;
  order: number;
};

interface ColumnsProps {
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const columns = ({
  handleEdit,
  handleDelete,
}: ColumnsProps): ColumnDef<Option>[] => [
  {
    header: "No",
    size: 40,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "namaOpsi",
    header: "Uraian",
    size: 500,
  },
  {
    accessorKey: "parent",
    header: "Parent",
    size: 500,
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-4 justify-center px-3">
          <button onClick={() => handleEdit(data.id)}>
            <PencilSimpleLine
              size={20}
              className="text-grey-700 hover:text-grey-900"
            />
          </button>
          <button onClick={() => handleDelete(data.id)}>
            <Trash size={20} className="text-grey-700 hover:text-grey-900" />
          </button>
        </div>
      );
    },
  },
];
