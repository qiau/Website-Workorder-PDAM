"use client";

import WorkorderForm from "@/components/form/WorkorderForm";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { createWorkorder } from "@/services/workorderService";
import { useState } from "react";
import { toast } from "sonner";

export default function NormalPage() {
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleConfirmSubmit = async () => {
    if (!formData) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createWorkorder(formData);
      toast.success("Workorder Normal berhasil diajukan");
    } catch (error) {
      toast.error("Gagal membuat workorder");
    } finally {
      setSubmitModalOpen(false);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="flex items-center px-20">
      <div className="w-full p-6 justify-center bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">
          Pengajuan Work Order Normal
        </h2>
        <WorkorderForm
          type={1}
          onOpenSubmitModal={(data) => {
            setFormData(data);
            setSubmitModalOpen(true);
          }}
        />
      </div>
      <ConfirmModal
        open={isSubmitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Ajukan Work Order"
        description="Apakah Anda yakin ingin mengajukan workorder ini?"
        confirmText="Konfirmasi"
        variant="primary"
        loading={isSubmitting}
      />
    </div>
  );
}
