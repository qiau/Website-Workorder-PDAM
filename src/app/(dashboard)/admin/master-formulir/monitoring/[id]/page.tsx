import MasterFormulir from "@/app/(dashboard)/admin/master-workorder/jenis-workorder/components/master-form-modal/MasterFormModal";
import { useRouter } from "next/navigation";
import React from "react";

export default function DetailPage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("Data disimpan:", data);
    router.push("/formulir-baru"); // ⬅️ Kembali ke tabel setelah tambah data
  };

  return <MasterFormulir onSubmit={handleSubmit} />;
}
