import { create } from "zustand";
import { type ModalPropsMap, type ModalVariants } from "@/components";

type ActiveModal<T extends ModalVariants> = {
  name: T;
  props: ModalPropsMap[T];
};

export type ModalsState = {
  activeModal: ActiveModal<ModalVariants> | null;
  openModal: <T extends ModalVariants>(
    name: T,
    props: ModalPropsMap[T],
  ) => void;
  closeModal: () => void;
};

export const useModalsStore = create<ModalsState>()((set) => ({
  activeModal: null,
  openModal: (name, props) =>
    set(() => ({
      activeModal: {
        name,
        props,
      },
    })),

  closeModal: () =>
    set(() => ({
      activeModal: null,
    })),
}));
