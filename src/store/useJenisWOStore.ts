import { create } from "zustand";
import { DetailForm, DetailFormInput, Form, FormInput, OptionForm, OptionFormInput } from "@/types/formTypes";

interface JenisWO
 {
  formData: Form;
  setFormData: (data: Partial<FormInput>) => void;
  addDetailForm: (detail: DetailFormInput) => void;
  updateDetailForm: (id: number, updatedDetail: Partial<DetailForm>) => void;
  updateDetailFormOrder:(updatedDetails: DetailForm[]) => void;
  removeDetailForm: (id: number) => void;
  addOptionForm: (detailId: number, option: OptionFormInput) => void;
  updateOptionForm: (detailId: number, optionId: number, updatedOption: Partial<OptionForm>) => void;
  removeOptionForm: (detailId: number, optionId: number) => void;
  resetForm: () => void;
}

export const useJenisWO
 = create<JenisWO
>((set) => ({
  formData: {
    id: 0,
    nama: "",
    kpiId: null,
    detailForm: [],
  },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  addDetailForm: (detail) =>
    set((state) => ({
      formData: {
        ...state.formData,
        detailForm: [
          ...state.formData.detailForm,
          { ...detail, id: Date.now() },
        ],
      },
    })),

  updateDetailForm: (id, updatedDetail) =>
    set((state) => ({
      formData: {
        ...state.formData,
        detailForm: state.formData.detailForm.map((detail) =>
          detail.id === id ? { ...detail, ...updatedDetail } : detail
        ),
      },
    })),

  updateDetailFormOrder: (updatedDetails) =>
    set((state) => ({
      formData: {
        ...state.formData,
        detailForm: updatedDetails,
      },
    })),

  removeDetailForm: (id) =>
    set((state) => ({
      formData: {
        ...state.formData,
        detailForm: state.formData.detailForm.filter((detail) => detail.id !== id),
      },
    })),

  addOptionForm: (detailId, option) =>
    set((state) => ({
      formData: {
        ...state.formData,
        detailForm: state.formData.detailForm.map((detail) =>
          detail.id === detailId
            ? {
                ...detail,
                optionForm: [
                  ...detail.optionForm,
                  { ...option, id: Date.now() }, 
                ],
              }
            : detail
        ),
      },
    })),

  updateOptionForm: (detailId, optionId, updatedOption) =>
    set((state) => ({
      formData: {
        ...state.formData,
        detailForm: state.formData.detailForm.map((detail) =>
          detail.id === detailId
            ? {
                ...detail,
                optionForm: detail.optionForm.map((option) =>
                  option.id === optionId ? { ...option, ...updatedOption } : option
                ),
              }
            : detail
        ),
      },
    })),

  removeOptionForm: (detailId, optionId) =>
    set((state) => ({
      formData: {
        ...state.formData,
        detailForm: state.formData.detailForm.map((detail) =>
          detail.id === detailId
            ? {
                ...detail,
                optionForm: detail.optionForm.filter((option) => option.id !== optionId),
              }
            : detail
        ),
      },
    })),

  resetForm: () =>
    set({
      formData: {
        id: 0,
        nama: "",
        kpiId: null,
        detailForm: [],
      },
    }),
}));
