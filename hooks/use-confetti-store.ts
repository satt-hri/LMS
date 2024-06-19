import { create } from "zustand";

type ConfettiStore = {
  isOpen: boolean;
  onOen: () => void;
  onClose: () => void;
};
//紙吹雪
export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  onOen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
