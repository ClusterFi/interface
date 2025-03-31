import { create } from "zustand";
import { CHAINS } from "@/constants";
import { Currency, CurrencyList } from "@/types";

export type GlobalState = {
  chainId: number;
  setChainId: (chainId_: number) => void;

  balances: CurrencyList;
  setBalance: (currency: Currency, balance: number) => void;
};

export const useGlobalStore = create<GlobalState>()((set, get) => ({
  chainId: CHAINS[0].chainId,
  setChainId: (chainId_) => {
    set({
      chainId: chainId_,
    });
  },

  balances: {},
  setBalance: (currency: Currency, balance: number) => {
    const balances = get().balances;
    balances[currency] = balance;

    set({
      balances,
    });
  },
}));
