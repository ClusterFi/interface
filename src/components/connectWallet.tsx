import { Account } from "@/account";
import { useAccount } from "wagmi";
import { WalletOptions } from "./walletOptions";

export function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) {
    return <Account />;
  }
  return <WalletOptions />;
}
