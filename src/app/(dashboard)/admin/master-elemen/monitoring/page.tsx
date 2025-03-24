"use client";
import { useEffect, useState } from "react";
import { columns, Detail } from "./columns";
import { MainTable } from "@/components/table/MainTable";

async function getData(): Promise<Detail[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      judul: "Judul Pekerjaan",
      fieldSlug: "judul_pekerjaan",
      tipeParameter: "input text",
      unitSatuan: "cm",
      min: 0,
      max: 100,
      parentField: "text",
      panjangMaksimal: 100,
      sifat: "optional",
      keterangan:
        "lorem ipsum dolor sit ameat dkcmmmm mmmmmm mmmmmmm jjsdddd dkndkwn dksndm kdfmd dkfmkfm kmdfkdm kdfmkdmf dkfmdkmf kmfdmf fmdmf kmkmf ",
    },
    {
      id: 2,
      judul: "Jenis Pekerjaan",
      fieldSlug: "jenis_pekerjaan",
      tipeParameter: "dropdown",
      unitSatuan: "cm",
      min: 0,
      max: 300,
      parentField: "text",
      panjangMaksimal: 1000,
      sifat: "mandatory",
      keterangan: "lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      judul: "Jenis Lokasi",
      fieldSlug: "jenis_lokasi",
      tipeParameter: "dropdown",
      unitSatuan: "cm",
      min: 0,
      max: 100,
      parentField: "text",
      panjangMaksimal: 100,
      sifat: "optional",
      keterangan: "lorem ipsum dolor sit amet",
    },
    {
      id: 4,
      judul: "Cari Lokasi",
      fieldSlug: "cari_lokasi",
      tipeParameter: "location picker",
      unitSatuan: "cm",
      min: 0,
      max: 100,
      parentField: "text",
      panjangMaksimal: 100,
      sifat: "optional",
      keterangan: "lorem ipsum dolor sit amet",
    },
    {
      id: 5,
      judul: "Judul Pekerjaan",
      fieldSlug: "judul_pekerjaan",
      tipeParameter: "input text",
      unitSatuan: "cm",
      min: 0,
      max: 100,
      parentField: "text",
      panjangMaksimal: 100,
      sifat: "optional",
      keterangan: "lorem ipsum dolor sit amet",
    },
    {
      id: 6,
      judul: "Judul Pekerjaan",
      fieldSlug: "judul_pekerjaan",
      tipeParameter: "input text",
      unitSatuan: "cm",
      min: 0,
      max: 100,
      parentField: "text",
      panjangMaksimal: 100,
      sifat: "optional",
      keterangan: "lorem ipsum dolor sit amet",
    },
    {
      id: 7,
      judul: "Jenis Lokasi",
      fieldSlug: "jenis_lokasi",
      tipeParameter: "location picker",
      unitSatuan: "m3",
      min: 0,
      max: 100,
      parentField: "geolocation",
      panjangMaksimal: 60,
      sifat: "optional",
      keterangan: "digunakan untuk menentukan lokasi",
    },
    // ...
  ];
}

export default function MonitoringPage() {
  const [data, setData] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);
  const filterOptions = [
    { value: "judul", label: "Judul" },
    { value: "fieldSlug", label: "Field Slug" },
    { value: "tipeParameter", label: "Tipe Parameter" },
    { value: "unitSatuan", label: "Unit Satuan" },
    { value: "min", label: "Min" },
    { value: "max", label: "Max" },
    { value: "parentField", label: "Parent Field" },
    { value: "panjangMaksimal", label: "Panjang Maksimal" },
    { value: "sifat", label: "Sifat" },
    { value: "keterangan", label: "Keterangan" },
  ];

  if (loading) return <p className="text-center py-5">Loading...</p>;

  return (
    <div className="flex-col px-20">
      <MainTable columns={columns} data={data} />
    </div>
  );
}
