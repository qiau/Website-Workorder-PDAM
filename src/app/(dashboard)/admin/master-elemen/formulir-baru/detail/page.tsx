"use client";

import { columns, Detail } from "./columns";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DraggableTable } from "@/components/table/DraggableTable";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SingleSelect from "@/components/form/SingleSelect";
import { useFormulirStore } from "@/store/useFormStore";

async function getData(): Promise<Detail[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      judulPilihan: "1Judul Pekerjaan",
      order: 1,
    },
    {
      id: 2,
      judulPilihan: "2Jenis Pekerjaan",
      order: 2,
    },
    {
      id: 3,
      judulPilihan: "3Jenis Lokasi",
      order: 3,
    },
    {
      id: 4,
      judulPilihan: "4Cari Lokasi",
      order: 4,
    },
    {
      id: 5,
      judulPilihan: "5Judul Pekerjaan",
      order: 5,
    },
    {
      id: 6,
      judulPilihan: "6Judul Pekerjaan",
      order: 6,
    },
    {
      id: 7,
      judulPilihan: "7Judul Pekerjaan",
      order: 7,
    },
    {
      id: 8,
      judulPilihan: "8Judul Pekerjaan",
      order: 8,
    },
    {
      id: 9,
      judulPilihan: "9Judul Pekerjaan",
      order: 9,
    },
  ];
}

interface OptionType {
  value: string;
  label: string;
}

const tipeFieldOptions: OptionType[] = [
  { value: "dropdown", label: "Dropdown" },
  { value: "opsional", label: "Opsional" },
];

export default function DetailPage() {
  const {
    judul,
    tipeData,
    tipeField,
    judulPilihan,
    setFormData,
    addJudulPilihan,
    removeJudulPilihan,
  } = useFormulirStore();
  const [data, setData] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const [newPilihan, setNewPilihan] = useState("");

  const handleTambahPilihan = () => {
    if (newPilihan.trim() === "") return;
    addJudulPilihan(newPilihan);
    setNewPilihan("");
  };

  if (loading) return <p className="text-center py-5">Loading...</p>;

  return (
    <div className="flex-col px-20 ">
      <div className="relative flex font-semibold ">
        <Link href="/admin/master-elemen/formulir-baru">
          <button className="px-4 py-2 rounded-t-lg absolute left-3 bg-primary-100 text-primary-500 hover:bg-grey-300 z-0">
            Elemen Formulir
          </button>
        </Link>
        <Link href="/admin/master-elemen/formulir-baru/detail">
          <button className="px-4 py-2 rounded-t-lg absolute left-36  bg-success-500 text-primary-500  z-10">
            Detail Elemen Formulir
          </button>
        </Link>
      </div>
      <div className="py-6 mt-10 bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl font-semibold mb-4 px-6">
          Detail Elemen Formulir
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-3 px-6 gap-4 col-span-3">
            <Input
              label="Judul"
              value={judul}
              readOnly
              className="bg-gray-100"
            />
            <Input
              label="Tipe Data"
              value={tipeData}
              placeholder="masukkan tipe data..."
              onChange={(e) => setFormData({ tipeData: e.target.value })}
            />
          </div>
          <div className="border-2 rounded-lg grid grid-cols-3 gap-4 p-2.5 mx-3 col-span-3">
            <SingleSelect
              label="Tipe Field"
              placeholder="Dropdown"
              value={tipeField}
              onChange={(value) => setFormData({ tipeField: value })}
              options={tipeFieldOptions}
            />
            <Input
              label="Judul Pilihan"
              placeholder="isi kolom..."
              value={newPilihan}
              onChange={(e) => setNewPilihan(e.target.value)}
            />
          </div>
          <div className="col-span-3 flex justify-end px-3">
            <Button type="button" variant="primary" size="lg">
              Tambah
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg mt-10">
        <DraggableTable columns={columns} data={data} setData={setData} />
        {data.length > 0 && (
          <div className="flex border-t px-3 py-6 justify-end">
            <Button variant="primary" size="lg">
              Simpan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
