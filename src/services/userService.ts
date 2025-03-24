import { api } from "@/lib/api";
import { User } from "@/types/userTypes";

export const getUser = async (): Promise<User[]> => {
 try{
    const response = await api.get<User[]>("/user");
    return response.data;
 } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Gagal mengambil data user.");
  }
}