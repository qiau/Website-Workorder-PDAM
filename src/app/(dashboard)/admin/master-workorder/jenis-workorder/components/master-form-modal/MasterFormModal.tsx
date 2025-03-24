"use client";
import SingleSelect from "@/components/form/SingleSelect";
import { DraggableTable } from "@/components/table/DraggableTable";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DetailForm } from "@/types/formTypes";
import { X } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useJenisWO } from "@/store/useJenisWOStore";
import { createForm, updateForm } from "@/services/formService";
import { useKpi } from "@/hooks/useKpi";
import DetailFormModal from "../detail-form-modal/DetailFormModal";

interface MasterFormModalProps {
  modal: string;
  id?: string | null;
  onClose: () => void;
}

export default function MasterFormModal({
  modal,
  id,
  onClose,
}: MasterFormModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submodal = searchParams.get("submodal");

  const openSubModal = (modal: string, id?: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("submodal", modal);
    if (id) params.set("id", id.toString());
    router.push(
      `/admin/master-workorder/jenis-workorder?${params.toString()}`,
      { scroll: false }
    );
  };

  const closeSubModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("submodal");
    params.delete("id");
    router.replace(
      `/admin/master-workorder/jenis-workorder?${params.toString()}`,
      { scroll: false }
    );
  };

  const kpiData = useKpi();
  const kpiOptions = kpiData.data.map((item) => ({
    value: String(item.id),
    label: item.nama,
  }));
  const {
    formData,
    setFormData,
    addDetailForm,
    updateDetailForm,
    updateDetailFormOrder,
    removeDetailForm,
  } = useJenisWO();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<DetailForm>({
    id: 0,
    namaField: "",
    tipeField: "",
    tipeData: "",
    unitSatuan: "",
    parent: 0,
    sifat: "",
    min: null,
    max: null,
    keterangan: "",
    order: 0,
    optionForm: [],
  });

  const detail = formData.detailForm[0];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (formData.id) {
        await updateForm(formData.id, formData);
        alert("Data berhasil diperbarui!");
      } else {
        await createForm(formData);
        alert("Data berhasil ditambahkan!");
      }
      // resetForm();
      onClose();
    } catch (error) {
      alert("Gagal mengirim data!");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    removeDetailForm(id);
  };

  const handleAddDetailForm = () => {
    addDetailForm(form);
    setForm({
      id: 0,
      namaField: "",
      tipeField: "",
      tipeData: "",
      unitSatuan: "",
      parent: 0,
      sifat: "",
      min: null,
      max: null,
      keterangan: "",
      order: 0,
      optionForm: [],
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-40 py-10">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex bg-primary-500 justify-between items-center rounded-t-lg px-6 py-2">
          <h2 className="text-3xl font-semibold text-center text-white">
            {modal === "add" ? "Buat" : "Edit"} Jenis Work Order
          </h2>
          <div
            className="hover:bg-gray-500 hover:cursor-pointer rounded-full p-1"
            onClick={onClose}
          >
            <X className="text-white" size={20} />
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="rounded-lg border-2 p-4 bg-gray-100 space-y-2">
            <h3 className="text-2xl font-semibold">Form Jenis Work Order</h3>
            <div className="grid grid-cols-3 gap-8">
              <Input
                label="Jenis Work Order"
                placeholder="Isi jenis workorder..."
                value={formData.nama}
                onChange={(e) => setFormData({ nama: e.target.value })}
              />
              <SingleSelect
                label="KPI (Rencana Tindakan)"
                placeholder="Pilih KPI"
                value={
                  kpiOptions.find(
                    (item) => item.value === String(formData.kpiId)
                  ) || null
                }
                onChange={(selected) =>
                  setFormData({ kpiId: Number(selected?.value) })
                }
                options={kpiOptions}
              />
            </div>
          </div>
          <div className="rounded-lg border-2 p-4 bg-gray-100">
            <div className="bg-gray-50 rounded-lg">
              <div className="flex p-4 justify-between items-center">
                <h3 className="text-2xl font-semibold">List Field Form</h3>
                <div className="w-64">
                  <Input placeholder="cari" />
                </div>
              </div>
              <DraggableTable
                columns={columns({
                  openSubModal,
                  handleDelete,
                })}
                data={formData.detailForm}
                setData={updateDetailFormOrder}
              />
              <div className="grid grid-cols-5">
                <div className="col-span-3 col-start-2 flex items-center gap-4 py-2">
                  <Input
                    placeholder="Isi nama field..."
                    value={form.namaField}
                    onChange={(e) =>
                      setForm({ ...form, namaField: e.target.value })
                    }
                  />
                  <Button
                    variant="thirtiary"
                    size="sm"
                    onClick={handleAddDetailForm}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* {formData.detailForm.length > 0 && (
          )} */}
          <div className="flex justify-end">
            <Button variant="primary" size="md" onClick={handleSubmit}>
              Simpan
            </Button>
          </div>
        </div>
      </div>
      {submodal && <DetailFormModal onClose={closeSubModal} />}
    </div>
  );
}
