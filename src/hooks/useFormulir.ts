import { useState, useEffect } from "react";
import { getJenisWorkorder } from "@/services/jenisWorkorderService";
import { MonitoringForm } from "@/types/formTypes";
import { getForm } from "@/services/formService";

interface Option {
  value: any;
  label: any;
}

export function useFormulir() {
  const [data, setData] = useState<MonitoringForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchJenisWorkorder() {
      try {
        const response = await getJenisWorkorder();
        setOptions(response.map((item: any) => ({
          value: item.id,
          label: item.nama,
        })));
      } catch (err) {
        setError("Gagal mengambil data jenis workorder");
      }
    }
    fetchJenisWorkorder();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getForm();
        setData(response);
      } catch (err) {
        setError("Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, setData, loading, error, options };
}
