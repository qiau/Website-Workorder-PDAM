import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import SingleSelect from "./SingleSelect";
import { jenisLokasiOptions, unitOptions } from "@/constants/options";
import MapField from "./MapField";
import MultiSelect from "./MultiSelect";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import { calculateEndDate, formatDate } from "@/utils/dateFormatter";
import { useJenisWorkorder } from "@/hooks/useJenisWorkorder";

type WorkorderFormProps = {
  onOpenSubmitModal: (data: any) => void;
  type: 1 | 2;
};

const WorkorderForm: React.FC<WorkorderFormProps> = ({
  onOpenSubmitModal,
  type,
}) => {
  const picId = 1;
  const jenisWorkorderData = useJenisWorkorder();
  const jenisWorkorderOptions = jenisWorkorderData.data.map((item) => ({
    value: String(item.id),
    label: item.nama,
  }));
  const userData = useUser();
  const userOptions = userData.data.map((item) => ({
    value: String(item.id),
    label: item.email,
  }));
  const [judulPekerjaan, setJudulPekerjaan] = useState("");
  const [jenisWorkorderId, setJenisWorkorderId] = useState<number | null>(null);
  const [jenisLokasiId, setJenisLokasiId] = useState<number | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const dateTime = `${startDate} ${startTime}:00`;
  const [estimasiDurasi, setEstimasiDurasi] = useState<number | null>(null);
  const [unit, setUnit] = useState(type === 2 ? "Jam" : "");
  const [endDate, setEndDate] = useState("");
  const [petugasId, setPetugasId] = useState<number[]>([]);

  useEffect(() => {
    const newEndDate = calculateEndDate(
      startDate,
      startTime,
      estimasiDurasi,
      unit
    );
    setEndDate(newEndDate);
  }, [startDate, startTime, estimasiDurasi, unit]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSubmitModal({
      judulPekerjaan,
      waktuPenugasan: dateTime,
      estimasiDurasi,
      unitWaktu: unit,
      estimasiSelesai: formatDate(endDate),
      longitude: location?.lng,
      latitude: location?.lat,
      picId,
      jenisWorkorderId,
      jenisLokasiId,
      tipeWorkorderId: type,
      penerimaTugas: petugasId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
      <Input
        label="Judul Pekerjaan"
        placeholder="isi Judul"
        value={judulPekerjaan}
        onChange={(e) => setJudulPekerjaan(e.target.value)}
      />
      <SingleSelect
        label="Jenis Workorder"
        placeholder="Pilih jenis workorder"
        value={
          jenisWorkorderOptions.find(
            (item) => item.value === String(jenisWorkorderId)
          ) || null
        }
        onChange={(selected) =>
          setJenisWorkorderId(selected ? Number(selected.value) : null)
        }
        options={jenisWorkorderOptions}
      />
      <SingleSelect
        label="Jenis Lokasi"
        placeholder="Statis/Dinamis"
        value={
          jenisLokasiOptions.find(
            (item) => item.value === String(jenisLokasiId)
          ) || null
        }
        onChange={(selected) =>
          setJenisLokasiId(selected ? Number(selected.value) : null)
        }
        options={jenisLokasiOptions}
      />
      {jenisLokasiId !== 1 && (
        <div className="col-span-3">
          <MapField onLocationSelect={handleLocationSelect} showSearch={true} />
          {location && (
            <div className="mt-2 flex justify-end space-x-3 text-sm font-medium text-gray-400">
              <p>Long {location.lng}</p>
              <p>Lat {location.lat}</p>
            </div>
          )}
        </div>
      )}
      <div className="flex col-span-3 w-full gap-4">
        <div className="border-2 p-4 rounded-lg col-span-3 w-full space-y-2">
          <h2 className="text-base font-medium text-primary-500">
            Estimasi Waktu WO Normal
          </h2>
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">Mulai</h3>
            <div className="flex gap-2">
              <Input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                type="time"
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">Estimasi</h3>
            <div className="flex gap-2">
              <Input
                className="w-16"
                placeholder="0"
                value={estimasiDurasi || ""}
                onChange={(e) =>
                  setEstimasiDurasi(
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              />
              {type === 2 ? (
                <Input className="w-16" disabled value="Jam" />
              ) : (
                <SingleSelect
                  variant="clear"
                  placeholder="H/J/B"
                  value={
                    unitOptions.find((item) => item.value === unit) || null
                  }
                  onChange={(selected) =>
                    setUnit(selected ? selected.value : "")
                  }
                  options={unitOptions}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">Selesai</h3>
            <div className="flex gap-2">
              <p className="text-gray-400 text-md">
                {endDate || "Pilih waktu mulai dan estimasi"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-2 p-4 rounded-lg col-span-3 w-full space-y-2">
          <h2 className="text-md font-medium text-primary-500">Petugas</h2>
          <MultiSelect
            placeholder="Cari petugas..."
            value={userOptions.filter((item) =>
              petugasId.includes(Number(item.value))
            )}
            onChange={(selected) =>
              setPetugasId(selected.map((item) => Number(item.value)))
            }
            options={userOptions}
          />
        </div>
      </div>
      <div className="col-span-3 flex justify-end">
        <Button type="submit" variant="thirtiary" size="md">
          Ajukan
        </Button>
      </div>
    </form>
  );
};

export default WorkorderForm;
