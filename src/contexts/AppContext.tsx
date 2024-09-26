import { isSolanaChain } from "@/utils";
import { useGlobalStore } from "@/utils/stores";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

interface IAppContextProps {
  isSolana: boolean;
  account: string | undefined;
}

export const AppContext = createContext<IAppContextProps>({
  isSolana: false,
  account: undefined,
});

export const AppContextProvider = (props: PropsWithChildren) => {

  const { chainId } = useGlobalStore();
  const { publicKey: solAddr } = useWallet();
  const { address: ethAddr } = useAccount();

  const isSolana = useMemo(() => {
    return isSolanaChain(chainId);
  }, [
    chainId
  ]);

  const account = React.useMemo(() => {
    if (isSolana) {
      return solAddr?.toBase58();
    }
    else {
      return ethAddr;
    }
  }, [
    isSolana,
    solAddr,
    ethAddr
  ])

  return (
    <>
      <AppContext.Provider value={{
        isSolana,
        account,
      }}>
        {props.children}
      </AppContext.Provider>
    </>
  );
}