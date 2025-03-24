"use client";

import { columns } from "./columns";
import { MainTable } from "@/components/table/MainTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "@phosphor-icons/react";
import { deleteJenisWorkorder } from "@/services/jenisWorkorderService";
import { useState } from "react";
import { JenisWorkorder } from "@/types/jenisWorkorderTypes";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/table/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import SingleSelect from "@/components/form/SingleSelect";
import { sortOptions } from "@/constants/options";
import { useJenisWorkorder } from "@/hooks/useJenisWorkorder";
import { useJenisWO } from "@/store/useJenisWOStore";
import MasterFormModal from "./components/master-form-modal/MasterFormModal";

export default function JenisWorkorderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const id = searchParams.get("id");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const { data, totalPages, loading, error, refreshData } = useJenisWorkorder(
    currentPage,
    itemsPerPage,
    search,
    sort
  );

  const { resetForm } = useJenisWO();

  const openModal = (modal: string, id?: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("modal", modal);
    if (id) params.set("id", id.toString());
    router.push(
      `/admin/master-workorder/jenis-workorder?${params.toString()}`,
      { scroll: false }
    );
  };

  const closeModal = () => {
    resetForm();
    router.replace(`/admin/master-workorder/jenis-workorder`, {
      scroll: false,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJenisWorkorder(id);
      refreshData();
      toast.success("Data berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <div className="flex-col px-28">
      <div className="flex items-center justify-between bg-white rounded-t-lg p-4">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-semibold">Jenis Workorder</h2>
          <div className="w-30">
            <SingleSelect
              placeholder="Terbaru"
              value={sortOptions.find((item) => item.value === sort) || null}
              onChange={(selected) => setSort(selected ? selected.value : "")}
              options={sortOptions}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Pagination
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
          <Button variant="primary" size="sm" onClick={() => openModal("add")}>
            <PlusCircle size={10} />
            Buat Baru
          </Button>
        </div>
      </div>
      <div className="bg-grey-100 px-4 py-2">
        {/* <Search filterOptions={filterOptions} onSearch={handleSearch} /> */}
        <Input
          placeholder="Search"
          className="w-64"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <MainTable
        columns={columns({
          openModal,
          handleDelete,
          currentPage,
          itemsPerPage,
        })}
        data={data}
        loading={loading}
      />
      {modal && <MasterFormModal modal={modal} id={id} onClose={closeModal} />}
    </div>
  );
}
