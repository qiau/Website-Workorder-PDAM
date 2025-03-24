"use client";
import React, { useState } from "react";
import MasterFormulir from "@/app/(dashboard)/admin/master-workorder/jenis-workorder/components/master-form-modal/MasterFormModal";
import { useFormStore } from "@/store/useFormStore";
import { createForm } from "@/services/formService";
import { toast } from "sonner";

export default function FormulirBaruPage() {
  const { formData, resetForm } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createForm(formData);
      toast.success("Formulir berhasil ditambahkan");
      resetForm();
    } catch {
      toast.error("Gagal menyimpan Formulir");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <MasterFormulir onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
