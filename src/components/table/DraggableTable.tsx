"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableRow from "./DraggableRow";
import Lottie from "lottie-react";
import notFoundAnimation from "@/../public/animation/notfound.json";

interface DraggableTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  setData: (data: TData[]) => void;
}

export function DraggableTable<TData extends { id: number; order: number }>({
  columns,
  data,
  setData,
}: DraggableTableProps<TData>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((item) => item.id === active.id);
    const newIndex = data.findIndex((item) => item.id === over.id);

    const newData = arrayMove(data, oldIndex, newIndex).map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setData(newData);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={data.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="overflow-auto max-h-[266px]">
          <Table className="w-full overflow-hidden">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead className="bg-primary-500 text-white"></TableHead>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-center bg-primary-500 text-white"
                      style={{ width: `${header.column.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <DraggableRow key={row.original.id} row={row} />
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1}>
                    <div className="flex flex-col items-center justify-center">
                      <Lottie
                        animationData={notFoundAnimation}
                        className="w-24"
                      />
                      <p className="text-lg text-gray-800 pb-3">
                        Belum ada data
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </SortableContext>
    </DndContext>
  );
}
