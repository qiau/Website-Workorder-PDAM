export type JenisWorkorder = {
  id: number;
  nama: string;
  kpiId?: number;
  kpi: { id: number; nama: string };
};

export type JenisWorkorderResponse = {
  data: JenisWorkorder[]; 
  totalPages: number; 
  currentPage: number; 
};

export type JenisWorkorderInput = Omit<JenisWorkorder, "id">;
