// export type MonitoringForm = {
//   id: number;
//   jenisWorkorder: {
//     id: number;
//     nama: string;
//   };
//   jumlahKomponen: number;
// };

export type OptionForm = {
  id: number;
  detailFormId: number;
  namaOpsi: string;
  parent: number;
  order: number;
};

export type DetailForm = {
  id: number;
  namaField: string;
  tipeField: string;
  tipeData: string;
  unitSatuan: string | null;
  sifat: string;
  min: number | null;
  max: number | null;
  parent: number;
  keterangan: string | null;
  order: number;
  optionForm: OptionForm[];
};

export type Form = {
  id : number;
  nama: string;
  kpiId: number | null;
  detailForm: DetailForm[];
}

export type FormInput = Omit<Form, "id">;
export type DetailFormInput = Omit<DetailForm, "id">;
export type OptionFormInput = Omit<OptionForm, "id">;

