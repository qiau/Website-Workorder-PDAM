import { create } from "zustand";
import { DetailForm, Form, OptionForm } from "@/types/formTypes";

interface FormStore {
  formData: Form;
  setFormData: (data: Partial<Form>) => void;
  addDetailForm: (detail: DetailForm) => void;
  updateDetailForm: (id: number, updatedDetail: Partial<DetailForm>) => void;
  removeDetailForm: (id: number) => void;
  addOptionForm: (detailId: number, option: OptionForm) => void;
  updateOptionForm: (detailId: number, optionId: number, updatedOption: Partial<OptionForm>) => void;
  removeOptionForm: (detailId: number, optionId: number) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formData: {
    id: null,
    jenisWorkorderId: null,
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
        detailForm: [...state.formData.detailForm, detail],
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
            ? { ...detail, optionForm: [...detail.optionForm, option] }
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
        id: null,
        jenisWorkorderId: null,
        detailForm: [],
      },
    }),
}));
