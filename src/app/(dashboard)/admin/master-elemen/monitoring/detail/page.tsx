"use client";

import React, { useEffect, useState } from "react";
import { columns, Detail } from "./columns";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/Pagination";
import { Search } from "@/components/table/Search";

async function getData(): Promise<Detail[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      judulElemen: "Judul Pekerjaan",
      tipeField: "Input Text",
      jumlahPilihan: 1,
    },
    {
      id: 2,
      judulElemen: "Jenis Pekerjaan",
      tipeField: "Dropdown",
      jumlahPilihan: 50,
    },
    {
      id: 3,
      judulElemen: "Jenis Lokasi",
      tipeField: "Dropdown",
      jumlahPilihan: 6,
    },
    {
      id: 4,
      judulElemen: "Cari Lokasi",
      tipeField: "Location Picker",
      jumlahPilihan: 1,
    },
    {
      id: 5,
      judulElemen: "Judul Pekerjaan",
      tipeField: "Input Text",
      jumlahPilihan: 1,
    },
    {
      id: 6,
      judulElemen: "Judul Pekerjaan",
      tipeField: "Input Text",
      jumlahPilihan: 1,
    },
    {
      id: 7,
      judulElemen: "Judul Pekerjaan",
      tipeField: "Input Text",
      jumlahPilihan: 1,
    },
    {
      id: 8,
      judulElemen: "Judul Pekerjaan",
      tipeField: "Input Text",
      jumlahPilihan: 1,
    },
    {
      id: 9,
      judulElemen: "Judul Pekerjaan",
      tipeField: "Input Text",
      jumlahPilihan: 1,
    },
    {
      id: 10,
      judulElemen: "Judul Pekerjaan",
      tipeField: "Input Text",
      jumlahPilihan: 1,
    },
    // ...
  ];
}

export default function MonitoringDetailPage() {
  const [data, setData] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);
  const filterOptions = [
    { value: "judulElemen", label: "Judul Elemen" },
    { value: "tipeField", label: "Tipe Field" },
    { value: "jumlahPilihan", label: "Jumlah Pilihan" },
  ];

  if (loading) return <p className="text-center py-5">Loading...</p>;

  return (
    <div className="flex-col px-10">
      <div className="flex items-center justify-between bg-white rounded-t-lg p-4">
        <h2 className="text-2xl font-semibold">
          Monitoring Riwayat Pengajuan WO Normal
        </h2>
        <div className="flex items-center gap-4">
          <Pagination
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <div className="bg-grey-100 px-4 py-2">
        <Search filterOptions={filterOptions} onSearch={handleSearch} />
      </div>
      <MainTable
        columns={columns}
        data={paginatedData.map((item, index) => ({
          ...item,
          displayIndex: startIndex + index + 1,
        }))}
      />
    </div>
  );
}
