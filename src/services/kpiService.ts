import { api } from "@/lib/api";
import { Kpi } from "@/types/kpiTypes";

export const fetchKpi = async (): Promise<Kpi[]> => {
 try{
    const response = await api.get<Kpi[]>("/kpi");
    return response.data;
 } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Gagal mengambil data user.");
  }
}