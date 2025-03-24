"use client";
import { useState, useEffect } from "react";
import { useJenisWO } from "@/store/useJenisWOStore";
import { X } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import {
  sifatOptions,
  tipeDataOptions,
  tipeFieldOptions,
} from "@/constants/options";
import { DraggableTable } from "@/components/table/DraggableTable";
import { columns } from "./columns";
import { DetailForm, OptionForm } from "@/types/formTypes";
import { Button } from "@/components/ui/button";
import SingleSelect from "@/components/form/SingleSelect";

interface DetailFormModalProps {
  onClose: () => void;
}

export default function DetailFormModal({ onClose }: DetailFormModalProps) {
  const {
    formData,
    setFormData,
    addDetailForm,
    updateDetailForm,
    removeDetailForm,
    addOptionForm,
    updateOptionForm,
    removeOptionForm,
  } = useJenisWO();

  const [detailForm, setDetailForm] = useState<DetailForm>({
    id: 0,
    namaField: "",
    tipeField: "",
    tipeData: "",
    unitSatuan: "",
    parent: 0,
    sifat: "",
    min: null,
    max: null,
    keterangan: null,
    order: 0,
    optionForm: [],
  });

  const [option, setOption] = useState<OptionForm[]>([]);

  useEffect(() => {
    setDetailForm((prev) => ({
      ...prev,
      order: formData.detailForm.length + 1,
    }));
  }, [formData.detailForm]);

  const addOption = () => {
    setOption([
      ...option,
      {
        id: 0,
        detailFormId: detailForm.id,
        namaOpsi: "",
        parent: 0,
        order: option.length + 1,
      },
    ]);
  };

  const handleAddDetailForm = () => {
    addDetailForm(detailForm);
    setDetailForm({
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
      order: formData.detailForm.length + 1,
      optionForm: [],
    });
  };

  const handleEdit = (id: number) => {
    console.log("Edit", id);
  };
  const handleDelete = (id: number) => {
    console.log("Delete", id);
  };

  // const [form, setForm] = useState<OptionForm>({
  //   id: 0,
  //   detailFormId: 0,
  //   namaOpsi: "",
  //   parent: 0,
  //   order: formData.detailForm.length + 1,
  // });

  // const handleAddOptionForm = () => {
  //   addOptionForm(form.detailFormId, form);
  //   setForm({
  //     id: 0,
  //     detailFormId: 0,
  //     namaOpsi: "",
  //     parent: 0,
  //     order: formData.detailForm.length + 1,
  //   });
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-80 py-10">
      <div className="bg-white rounded-lg shadow-lg p-5 space-y-5">
        <div className="flex items-center rounded-t-lg relative">
          <h2 className="text-3xl font-semibold text-black flex-grow text-center">
            Detail Field
          </h2>
          <div
            className="hover:bg-gray-200 hover:cursor-pointer rounded-full p-1 ml-auto"
            onClick={onClose}
          >
            <X className="text-black" size={20} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-8 gap-y-3">
          <Input label="Jenis Work Order" value={formData.nama} disabled />
          <Input
            label="Nama Field"
            placeholder="Masukkan nama..."
            value={detailForm.namaField}
            onChange={(e) =>
              setDetailForm({ ...detailForm, namaField: e.target.value })
            }
          />
          <SingleSelect
            label="Tipe Parameter"
            placeholder="Text Field / Dropdown"
            value={
              tipeFieldOptions.find(
                (item) => item.value === String(detailForm.tipeField)
              ) || null
            }
            onChange={(selected) =>
              setDetailForm({ ...detailForm, tipeField: selected?.value })
            }
            options={tipeFieldOptions}
          />
          <SingleSelect
            label="Tipe Data"
            placeholder="String/Number/Date"
            value={
              tipeDataOptions.find(
                (item) => item.value === String(detailForm.tipeData)
              ) || null
            }
            onChange={(selected) =>
              setDetailForm({ ...detailForm, tipeData: selected?.value })
            }
            options={tipeDataOptions}
          />
          <Input
            label="Satuan Unit"
            placeholder="cm/m/pcs"
            value={detailForm.unitSatuan || ""}
            onChange={(e) =>
              setDetailForm({ ...detailForm, unitSatuan: e.target.value })
            }
          />
          <SingleSelect
            label="Sifat"
            placeholder="Mandatory/Opsional"
            value={
              sifatOptions.find(
                (item) => item.value === String(detailForm.sifat)
              ) || null
            }
            onChange={(selected) =>
              setDetailForm({ ...detailForm, sifat: selected?.value })
            }
            options={sifatOptions}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Minimal"
              placeholder="min"
              value={detailForm.min || ""}
              onChange={(e) =>
                setDetailForm({ ...detailForm, min: Number(e.target.value) })
              }
            />
            <Input
              label="Maksimal"
              placeholder="max"
              value={detailForm.max || ""}
              onChange={(e) =>
                setDetailForm({ ...detailForm, max: Number(e.target.value) })
              }
            />
          </div>
          <SingleSelect
            label="Parent Field"
            placeholder="Pilih parent field"
            value={
              tipeFieldOptions.find(
                (item) => item.value === String(detailForm.tipeField)
              ) || null
            }
            onChange={(selected) =>
              setDetailForm({ ...detailForm, tipeField: selected?.value })
            }
            options={[]}
          />
          <Input
            label="Keterangan"
            placeholder="Isi keterangan..."
            value={detailForm.keterangan || ""}
            onChange={(e) =>
              setDetailForm({ ...detailForm, keterangan: e.target.value })
            }
          />
        </div>
        {detailForm.tipeField === "dropdown" && (
          <>
            <div className="bg-gray-100 rounded-lg">
              <div className="flex p-4 justify-between items-center">
                <h3 className="text-2xl font-semibold">Detail Form</h3>
                <div className="w-64">
                  <Input placeholder="cari" />
                </div>
              </div>
              <DraggableTable
                columns={columns({
                  handleEdit,
                  handleDelete,
                })}
                data={option}
                setData={setOption}
              />
              <div className="grid grid-cols-5">
                <div className="col-span-3 col-start-2 flex items-center gap-4 py-2">
                  <Input
                    placeholder="Isi nama field..."
                    value={detailForm.namaField}
                    onChange={(e) =>
                      setDetailForm({
                        ...detailForm,
                        namaField: e.target.value,
                      })
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
          </>
        )}
        <div className="flex justify-end">
          <Button variant="primary" size="md">
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
