export type WorkorderBase = {
  judulPekerjaan: string;
  waktuPenugasan: string;
  estimasiDurasi: number;
  unitWaktu: string;
  estimasiSelesai: string;
  longitude: number | null;
  latitude: number | null;
};

export type Workorder = WorkorderBase & {
  id: number;
  pic: { id: number; nama: string };
  lemburSpl: { id: number; nama: string } | null;
  status: { id: number; nama: string };
  jenisWorkorder: { id: number; nama: string };
  jenisLokasi: { id: number; nama: string };
  tipeWorkorder: { id: number; nama: string };
  penerimaTugas: { id: number; nama: string }[];
};

export type WorkorderResponse = {
  data: Workorder[]; 
  totalPages: number; 
  currentPage: number; 
};

export type WorkorderInput = WorkorderBase & {
  picId: number;
  lemburSplId?: number | null;
  longitude?: number | null;
  latitude?: number | null;
  statusId?: number;
  jenisWorkorderId: number;
  jenisLokasiId: number;
  tipeWorkorderId: number;
  penerimaTugas: number[]; 
};
