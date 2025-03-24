import MasterFormulir from "@/app/(dashboard)/admin/master-workorder/jenis-workorder/components/master-form-modal/MasterFormModal";
import { getForm, getFormById, updateForm } from "@/services/formService";
import { useFormStore } from "@/store/useFormStore";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function EditPage() {
  const { id } = useParams();
  const { formData, setFormData, resetForm } = useFormStore();
  const router = useRouter();

  useEffect(() => {
    async function fetchFormData() {
      try {
        const data = await getFormById(Number(id));
        setFormData(data);
      } catch (error) {
        console.error("Gagal mengambil data form:", error);
      }
    }
    if (id) fetchFormData();
  }, [id, setFormData]);

  const handleUpdate = async () => {
    try {
      await updateForm(Number(id), formData);
      alert("Formulir berhasil diperbarui");
      router.push("/admin/master-formulir");
      resetForm();
    } catch {
      alert("Gagal memperbarui Formulir");
    }
  };

  return <MasterFormulir onSubmit={handleUpdate} />;
}
