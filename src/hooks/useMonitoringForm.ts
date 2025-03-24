import { useState, useEffect } from "react";
import { MonitoringForm } from "@/types/formTypes";
import { getForm } from "@/services/formService";

export function useMonitoringForm() {
  const [data, setData] = useState<MonitoringForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await getForm();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengambil data");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refreshData: fetchData };
}
