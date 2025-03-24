"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Row } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

interface DraggableRowProps<TData extends { id: number }> {
  row: Row<TData>;
}

export default function DraggableRow<TData extends { id: number }>({
  row,
}: DraggableRowProps<TData>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: row.original.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className="cursor-default bg-white text-center"
    >
      <TableCell {...listeners} {...attributes} className="w-10 cursor-grab">
        <GripVertical className="text-gray-500" />
      </TableCell>

      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          style={{ width: `${cell.column.getSize()}px` }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
