import { api } from "@/lib/api";
import { Form, FormInput } from "@/types/formTypes";
import { toCamelCase, toSnakeCase } from "@/utils/caseFormatter";


export const getForm = async (): Promise<Form[]> => {
   try {
      const response = await api.get<Form[]>("/form");
      return response.data;
    } catch (error) {
      console.error("Error fetching Form:", error);
      throw new Error("Gagal mengambil data Form");
    }
};

export const createForm = async (data: FormInput): Promise<Form> => {
  try {
    const formattedData = toSnakeCase(data);
    const response = await api.post<Form>("/form", formattedData);
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw new Error("Gagal menyimpan Formulir.");
  }
};

export const getFormById = async (id: number): Promise<Form> => {
  try {
    const response = await api.get<Form>(`/form/${id}`);
    const formattedData = toCamelCase(response.data);
    return formattedData;
  } catch (error) {
    console.error("Error fetching form by ID:", error);
    throw new Error("Gagal mengambil data formulir berdasarkan ID.");
  }
};

export const updateForm = async (id: number, data: FormInput) => {
  try {
    const formattedData = toSnakeCase(data);
    const response = await api.put(`/form/${id}`, formattedData);
    return response.data;
  } catch (error) {
    console.error("Error updating form:", error);
    throw new Error("Gagal memperbarui Formulir.");
  }
};

export const deleteForm = async (id: number): Promise<void> => {
  try {
    await api.delete(`/form/${id}`);
  } catch (error) {
    console.error("Error deleting form:", error);
    throw new Error("Gagal menghapus form");
  }
};
