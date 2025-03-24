import { api } from "@/lib/api";
import { WorkorderInput, WorkorderResponse } from "@/types/workorderTypes";
import { toCamelCase, toSnakeCase } from "@/utils/caseFormatter";

export const fetchWorkorders = async  ( type: number, page: number, limit: number, search: string): Promise<WorkorderResponse> => {
  try {
    const response = await api.get<WorkorderResponse>("/workorder", {
      params: {
        type,
        page,
        limit,
        search,
      },
    }); 
    return toCamelCase(response.data);
  } catch (error) {
    console.error("Error fetching work orders:", error);
    return { data: [], totalPages: 0, currentPage: 0 };
  }
};

export const createWorkorder = async (data: WorkorderInput) => {
  try {
    const formattedData = toSnakeCase(data);
    const response = await api.post("/workorder", formattedData);
    return response.data;
  } catch (error) {
    console.error("Error creating workorder:", error);
    throw new Error("Gagal menambah workorder.");
  }
};