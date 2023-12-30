import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalContext {
    isModalOpen: boolean;
    currentModal: keyof ModalMap | null;
    openModal: (modalKey: keyof ModalMap) => void;
    closeModal: () => void;
}

export interface ModalMap {
    profile: JSX.Element;
    contact: JSX.Element;   
}

const useModalContext = create<ModalContext>()(
  immer((set) => ({
    isModalOpen: false,
    currentModal: null,
    openModal: (modalKey) =>
      set((state) => {
        state.isModalOpen = true;
        state.currentModal = modalKey;
      }),
    closeModal: () =>
      set((state) => {
        state.isModalOpen = false;
        state.currentModal = null;
      }),
  }))
);

export default useModalContext;