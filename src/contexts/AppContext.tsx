import { fetchSolBalance, isSolanaChain } from "@/utils";
import { useGlobalStore } from "@/utils/stores";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance, useConnectorClient } from "wagmi";

interface IAppContextProps {
  isSolana: boolean;
  account: string | undefined;
}

export const AppContext = createContext<IAppContextProps>({
  isSolana: false,
  account: undefined,
});

export const AppContextProvider = (props: PropsWithChildren) => {

  const { chainId, setBalance } = useGlobalStore();
  const { publicKey: solAddr } = useWallet();

  const { address: ethAddr } = useAccount();
  const { data: ethBalance } = useBalance({
    address: ethAddr
  });

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

  useEffect(() => {
    (async () => {
      if (solAddr) {
        const balance = await fetchSolBalance(solAddr);
        setBalance("Solana", balance);
      }
      else {
        setBalance("Solana", 0);
      }
    })();

  }, [
    solAddr
  ])

  useEffect(() => {
    if (ethBalance) {
      const balance = parseFloat(formatEther(ethBalance.value));
      setBalance("Ethereum", balance);
    }
    else {
      setBalance("Ethereum", 0);
    }
  }, [
    ethBalance
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