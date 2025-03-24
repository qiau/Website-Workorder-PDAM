import { useState, useEffect } from "react";
import { JenisWorkorder } from "@/types/jenisWorkorderTypes";
import { fetchJenisWorkorders } from "@/services/jenisWorkorderService";

interface WorkorderCache {
  [key: string]: {
    data: JenisWorkorder[];
    totalPages?: number;
  };
}

export const useJenisWorkorder = ( 
  currentPage?: number,
  itemsPerPage?: number,
  search?: string,
  sort?: string,
  all?: boolean,
) => {
  const [data, setData] =  useState<JenisWorkorder[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<WorkorderCache>({});

  const cacheKey = `${currentPage}-${sort}-${search || "no-search"}`;

  const fetchData = async () => { 
    if (!search && cache[cacheKey]) {
      setData(cache[cacheKey].data);
      setTotalPages(cache[cacheKey].totalPages || 1);
      return;
    }

      setLoading(true);
      setError(null); 
      try {
        const response = await fetchJenisWorkorders(
          currentPage,
          itemsPerPage,
          search,
          sort,
          all,
        );
        setData(response.data);
        setTotalPages(response.totalPages);

        if (!search) {
          setCache((prevCache) => ({
            ...prevCache,
            [cacheKey]: response,
          }));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal mengambil data");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, [search, currentPage, sort, all]);

  return { data, totalPages, loading, error, refreshData: fetchData }
}