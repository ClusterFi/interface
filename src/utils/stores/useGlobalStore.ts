import { create } from "zustand";
import { CHAINS } from "@/constants";

export type GlobalState = {
  chainId: number,
  setChainId: (chainId_: number) => void,
};

export const useGlobalStore = create<GlobalState>()((set) => ({
  chainId: CHAINS[0].chainId,

  setChainId: (chainId_) =>
    set(() => ({
      chainId: chainId_
    })),
}));
