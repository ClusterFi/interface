import { useReadContracts } from "wagmi";
import { type Abi } from "viem";
import { ABIS } from "../abi/abis";
import { useGetAllMarkets } from "./useGetAllMarkets";

type Address = `0x${string}`;

type SupplyInfo = {
  cToken: Address;
  balance: bigint;
};

type BorrowInfo = {
  cToken: Address;
  currentBalance: bigint;
  storedBalance: bigint;
};

export const useUserData = (chainId: number, userAddress?: Address) => {
  const { data: markets, isPending: isMarketsPending } =
    useGetAllMarkets(chainId);

  const cTokenAddresses = (markets ?? []) as Address[];
  const enabled = !!userAddress && cTokenAddresses.length > 0;

  const supplyContracts = enabled
    ? cTokenAddresses.map((cToken) => ({
        address: cToken,
        abi: ABIS.CTokenABI as Abi,
        functionName: "balanceOf" as const,
        args: [userAddress!],
      }))
    : [];

  const borrowCurrentContracts = enabled
    ? cTokenAddresses.map((cToken) => ({
        address: cToken,
        abi: ABIS.CTokenABI as Abi,
        functionName: "borrowBalanceCurrent" as const,
        args: [userAddress!],
      }))
    : [];

  const borrowStoredContracts = enabled
    ? cTokenAddresses.map((cToken) => ({
        address: cToken,
        abi: ABIS.CTokenABI as Abi,
        functionName: "borrowBalanceStored" as const,
        args: [userAddress!],
      }))
    : [];

  const supplyResult = useReadContracts({
    contracts: supplyContracts,
    query: {
      enabled,
    },
  });

  const borrowCurrentResult = useReadContracts({
    contracts: borrowCurrentContracts,
    query: {
      enabled,
    },
  });

  const borrowStoredResult = useReadContracts({
    contracts: borrowStoredContracts,
    query: {
      enabled,
    },
  });

  const supplies: SupplyInfo[] =
    enabled && supplyResult.data
      ? supplyResult.data.map((res, idx) => ({
          cToken: cTokenAddresses[idx],
          balance:
            res.status === "success" ? (res.result as bigint) : BigInt(0),
        }))
      : [];

  const borrows: BorrowInfo[] =
    enabled && borrowCurrentResult.data && borrowStoredResult.data
      ? borrowCurrentResult.data.map((currentRes, idx) => {
          const storedRes = borrowStoredResult.data[idx];
          const currentBalance =
            currentRes.status === "success"
              ? (currentRes.result as bigint)
              : BigInt(0);
          const storedBalance =
            storedRes.status === "success"
              ? (storedRes.result as bigint)
              : BigInt(0);

          return {
            cToken: cTokenAddresses[idx],
            currentBalance,
            storedBalance,
          };
        })
      : [];

  return {
    supplies,
    borrows,
    isPending:
      isMarketsPending ||
      supplyResult.isPending ||
      borrowCurrentResult.isPending ||
      borrowStoredResult.isPending,
    error:
      supplyResult.error ||
      borrowCurrentResult.error ||
      borrowStoredResult.error,
  };
};
