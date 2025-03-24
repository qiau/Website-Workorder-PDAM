"use client";

import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { MainTable } from "@/components/table/MainTable";
import { Pagination } from "@/components/table/Pagination";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { fetchWorkorders } from "@/services/workorderService";
import { Workorder, WorkorderResponse } from "@/types/workorderTypes";

type HistoryTableProps = {
  type: 1 | 2;
  role: 2 | 3;
};

const HistoryTable: React.FC<HistoryTableProps> = ({ type, role }) => {
  const [data, setData] = useState<Workorder[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const [cache, setCache] = useState<Record<number, WorkorderResponse>>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function loadData() {
  //     const result = await fetchWorkorders(
  //       type,
  //       currentPage,
  //       search,
  //       itemsPerPage,
  //       sortOrder
  //     );
  //     setData(result.data);
  //     setTotalPages(result.total_pages);
  //     setCurrentPage(result.current_page);
  //   }

  //   loadData();
  // }, [search, currentPage, itemsPerPage, sortOrder]);

  useEffect(() => {
    const loadData = async () => {
      if (!search && cache[currentPage]) {
        setData(cache[currentPage].data);
        return;
      }

      setLoading(true);
      const response = await fetchWorkorders(
        type,
        currentPage,
        itemsPerPage,
        search
      );
      setData(response.data);
      setTotalPages(response.totalPages);
      setLoading(false);
      if (!search) {
        setCache((prevCache) => ({
          ...prevCache,
          [currentPage]: response,
        }));
      }
    };

    loadData();
  }, [search, currentPage, cache]);

  return (
    <div className="flex-col px-10">
      <div className="flex items-center justify-between bg-white rounded-t-lg p-4">
        <h2 className="text-2xl font-semibold">
          Monitoring Riwayat Pengajuan WO {type === 1 ? "Normal" : "Lembur"}
        </h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Pencarian"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Pagination
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />

          {role === 3 && (
            <Button variant="primary" size="sm">
              <PlusCircle size={50} />
              Pengajuan Baru
            </Button>
          )}
        </div>
      </div>
      <div className="bg-grey-100 px-4 py-2">
        <Input placeholder="nama" />
      </div>
      <MainTable
        columns={columns(currentPage, itemsPerPage)}
        data={data}
        loading={loading}
      />
    </div>
  );
};

export default HistoryTable;
