import { ApartmentStatus } from "@/types/apartment.types";
import { create } from "zustand";

export type ModalType =
  | "activate"
  | "archive"
  | "delete-apartment"
  | "logout"
  | "edit-profile";

interface IData {
  apartmentId?: string | null;
  apartmentStatus?: ApartmentStatus | null;
}

interface UIState {
  modalType: ModalType | null;
  data: IData | null;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openModal: (type: ModalType, apartmentId?: IData | null) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  modalType: null,
  isSidebarOpen: false,
  data: null,
  openModal: (type, data = null) =>
    set({
      modalType: type,
      data,
    }),
  closeModal: () =>
    set({
      modalType: null,
      data: null,
    }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
