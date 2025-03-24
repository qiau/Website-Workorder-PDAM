"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const statusVariant: Record<number, "success" | "warning" | "danger"> = {
  1: "success",
  2: "warning",
  3: "danger",
};

const statusLabel: Record<number, string> = {
  1: "Disetujui",
  2: "Menunggu",
  3: "Ditolak",
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Detail = {
  id: number;
  // bagian: string;
  judulPekerjaan: string;
  jenisWorkorder: { id: number; nama: string };
  jenisLokasi: { id: number; nama: string };
  lokasi: string;
  waktuPenugasan: string;
  estimasiSelesai: string;
  estimasiDurasi: number;
  unitWaktu: string;
  penerimaTugas: { id: number; email: string }[];
  statusId: number;
};

export const columns = (
  currentPage: number,
  itemsPerPage: number
): ColumnDef<Detail>[] => [
  {
    header: "No",
    cell: ({ row }) => (currentPage - 1) * itemsPerPage + row.index + 1,
  },
  {
    accessorKey: "judulPekerjaan",
    header: "Judul Pekerjaan",
  },
  {
    header: "Jenis Workorder",
    cell: ({ row }) => row.original.jenisWorkorder?.nama || "null",
  },
  {
    header: "Jenis Lokasi",
    cell: ({ row }) => row.original.jenisLokasi?.nama || "null",
  },
  {
    accessorKey: "lokasi",
    header: "Lokasi",
  },
  {
    header: "Estimasi Waktu",
    cell: ({ row }) => {
      const mulai = format(
        new Date(row.original.waktuPenugasan),
        "dd MMM yyyy HH:mm",
        { locale: id }
      );
      const selesai = format(
        new Date(row.original.estimasiSelesai),
        "dd MMM yyyy HH:mm",
        { locale: id }
      );

      return (
        <>
          {mulai} -<br /> {selesai}
        </>
      );
    },
  },
  {
    accessorKey: "estimasiDurasi",
    header: "Durasi",
  },
  {
    accessorKey: "unitWaktu",
    header: "Satuan",
  },
  {
    header: "Petugas",
    cell: ({ row }) =>
      row.original.penerimaTugas?.length
        ? row.original.penerimaTugas.map((p) => <div key={p.id}>{p.email}</div>)
        : "null",
  },
  {
    id: "statusId",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original;
      const variant = statusVariant[data.statusId] || "info";
      const label = statusLabel[data.statusId] || "null";
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-2 justify-center">
          <button>
            <PencilSimpleLine
              size={20}
              className="text-grey-700 hover:text-grey-900"
            />
          </button>
          <button>
            <Trash size={20} className="text-grey-700 hover:text-grey-900" />
          </button>
        </div>
      );
    },
  },
];
