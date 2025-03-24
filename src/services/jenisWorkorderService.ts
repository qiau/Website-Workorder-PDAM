import { api } from "@/lib/api";
import { JenisWorkorder, JenisWorkorderInput, JenisWorkorderResponse } from "@/types/jenisWorkorderTypes";
import { toCamelCase } from "@/utils/caseFormatter";

export const fetchJenisWorkorders = async (page?: number, limit?: number, search?: string, sort?: string, all?: boolean): Promise<JenisWorkorderResponse> => {
  try {
    const params: Record<string, any> = {};
    if (all) {
      params.all = true;
    } else {
      if (page !== undefined) params.page = page;
      if (limit !== undefined) params.limit = limit;
    }
    if (search) params.search = search;
    if (sort) params.sort = sort;

    const response = await api.get<JenisWorkorderResponse>("/jenis-workorder", {params});
    return toCamelCase(response.data);
  } catch (error) {
    console.error("Error fetching jenis workorder:", error);
    return { data: [], totalPages: 0, currentPage: 0 };
  }
};

// export const getJenisWorkorderById = async (id: number): Promise<JenisWorkorder> => {
//   try {
//     const response = await api.get<JenisWorkorder>(`/jenis-workorder/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching jenis workorder with ID ${id}:`, error);
//     throw new Error(`Gagal mengambil jenis workorder dengan ID ${id}.`);
//   }
// };

export const createJenisWorkorder = async (data: JenisWorkorderInput): Promise<JenisWorkorder> => {
  try {
    const response = await api.post<JenisWorkorder>("/jenis-workorder", data);
    return response.data;
  } catch (error) {
    console.error("Error creating jenis workorder:", error);
    throw new Error("Gagal menambah jenis workorder.");
  }
};

export const updateJenisWorkorder = async (id: number, data: JenisWorkorderInput): Promise<JenisWorkorder> => {
  try {
    const response = await api.put<JenisWorkorder>(`/jenis-workorder/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating jenis workorder:", error);
    throw new Error("Gagal memperbarui jenis workorder.");
  }
};

export const deleteJenisWorkorder = async (id: number): Promise<void> => {
  try {
    await api.delete(`/jenis-workorder/${id}`);
  } catch (error) {
    console.error("Error deleting jenis workorder:", error);
    throw new Error("Gagal menghapus jenis workorder.");
  }
};