"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import SingleSelect from "@/components/form/SingleSelect";
import { useFormulirStore } from "@/store/useFormStore";

interface OptionType {
  value: string;
  label: string;
}

const tipeParameterOptions: OptionType[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "geolocator", label: "Geolocator" },
];

const sifatOptions: OptionType[] = [
  { value: "mandatory", label: "Mandatory" },
  { value: "opsional", label: "Opsional" },
];

export default function FormulirBaruPage() {
  const {
    judul,
    fieldSlug,
    tipeParameter,
    sifat,
    unitSatuan,
    min,
    max,
    parentField,
    panjangMaksimal,
    keterangan,
    setFormData,
  } = useFormulirStore();

  return (
    <div className="flex-col px-20">
      <div className="relative flex font-semibold ">
        <Link href="/admin/master-elemen/formulir-baru">
          <button className="px-4 py-2 rounded-t-lg absolute left-3 bg-success-500 text-primary-500  z-10">
            Elemen Formulir
          </button>
        </Link>
        <Link href="/admin/master-elemen/formulir-baru/detail">
          <button className="px-4 py-2 rounded-t-lg absolute left-36 bg-primary-100 text-primary-500 hover:bg-grey-300 z-0">
            Detail Elemen Formulir
          </button>
        </Link>
      </div>
      <div className="w-full mt-10 p-6 justify-center bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl font-semibold mb-4">Elemen Formulir Baru</h2>
        <form className="grid grid-cols-3 gap-y-4 gap-x-16">
          <Input
            label="Judul"
            placeholder="isi Judul"
            value={judul}
            onChange={(e) => setFormData({ judul: e.target.value })}
          />
          <Input
            label="Field Slug"
            className="bg-gray-100"
            placeholder="field_slug"
            value={fieldSlug}
            onChange={(e) => setFormData({ fieldSlug: e.target.value })}
          />
          <SingleSelect
            label="Tipe Parameter"
            placeholder="Text/Number/Geolocator"
            value={tipeParameter}
            onChange={(value) => setFormData({ tipeParameter: value })}
            options={tipeParameterOptions}
          />
          <Input
            label="Unit/Satuan"
            placeholder="isi unit/satuan..."
            value={unitSatuan}
            onChange={(e) => setFormData({ unitSatuan: e.target.value })}
          />
          <div className="flex gap-8">
            <Input
              type="number"
              label="Min"
              min={0}
              placeholder="isi min"
              value={min ?? ""}
              onChange={(e) =>
                setFormData({
                  min: e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
            <Input
              type="number"
              label="Max"
              min={0}
              placeholder="isi max"
              value={max ?? ""}
              onChange={(e) =>
                setFormData({
                  max: e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          </div>
          <Input
            label="Parent Field"
            placeholder="isi parent field..."
            value={parentField}
            onChange={(e) => setFormData({ parentField: e.target.value })}
          />
          <Input
            type="number"
            label="Panjang Maksimal"
            min={0}
            placeholder="panjang maksimal..."
            value={panjangMaksimal ?? ""}
            onChange={(e) =>
              setFormData({
                panjangMaksimal:
                  e.target.value === "" ? null : Number(e.target.value),
              })
            }
          />
          <SingleSelect
            label="Sifat"
            placeholder="Mandatory/Optional"
            value={sifat}
            onChange={(value) => setFormData({ sifat: value })}
            options={sifatOptions}
          />
          <Input
            label="Keterangan"
            placeholder="isi keterangan"
            value={keterangan ?? ""}
            onChange={(e) =>
              setFormData({
                keterangan:
                  e.target.value.trim() === "" ? null : e.target.value,
              })
            }
          />
          <div className="col-span-3 flex justify-end">
            <Link href="/admin/master-elemen/formulir-baru/detail">
              <Button type="button" variant="thirtiary" size="md">
                Lanjut Isi Detail
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
