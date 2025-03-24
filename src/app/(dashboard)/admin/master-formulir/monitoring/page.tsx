"use client";
import { useEffect, useState } from "react";
import { columns, Detail } from "./columns";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/Pagination";
import { Search } from "@/components/table/Search";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { useMonitoringForm } from "@/hooks/useMonitoringForm";

export default function MonitoringPage() {
  const { data, loading, error, refreshData } = useMonitoringForm();
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filterOptions = [
    { value: "no", label: "No" },
    { value: "jenisWorkorder", label: "Jenis Workorder" },
    { value: "jumlahKomponen", label: "Jumlah Komponen" },
  ];

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (column: string, value: string) => {
    if (!value) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      item[column as keyof Detail]
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredData(filtered);

    const maxPage = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <p className="text-center py-5">Loading...</p>;
  if (error) return <p className="text-center py-5 text-red-500">{error}</p>;

  return (
    <div className="flex-col px-20">
      <div className="flex items-center justify-between bg-white rounded-t-lg p-4">
        <h2 className="text-2xl font-semibold">
          Monitoring Formulir Workorder
        </h2>
        <div className="flex items-center gap-4">
          <Pagination
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />

          <Link href="/admin/master-formulir/formulir-baru">
            <Button variant="primary" size="sm">
              <PlusCircle size={50} />
              Buat Formulir
            </Button>
          </Link>
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
          jenisWorkorder: item.jenisWorkorder.nama,
        }))}
      />
    </div>
  );
}
