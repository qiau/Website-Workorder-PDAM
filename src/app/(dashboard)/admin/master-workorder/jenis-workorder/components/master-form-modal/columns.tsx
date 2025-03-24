"use client";

import { Button } from "@/components/ui/button";
import { DetailForm } from "@/types/formTypes";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";

interface ColumnsProps {
  openSubModal: (modal: string, id: number) => void;
  handleDelete: (id: number) => void;
}

export const columns = ({
  openSubModal,
  handleDelete,
}: ColumnsProps): ColumnDef<DetailForm>[] => [
  {
    header: "No",
    size: 40,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "namaField",
    header: "Nama Field",
    size: 500,
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;
      const isDataFilled = !!data.tipeField;
      return (
        <div className="flex gap-5 justify-center px-5">
          <Button
            variant={isDataFilled ? "primary" : "thirtiary"}
            onClick={() =>
              isDataFilled
                ? openSubModal("detail", data.id)
                : openSubModal("add", data.id)
            }
          >
            {isDataFilled ? "Detail" : "Isi Detail"}
          </Button>
          <button onClick={() => openSubModal("edit", data.id)}>
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
