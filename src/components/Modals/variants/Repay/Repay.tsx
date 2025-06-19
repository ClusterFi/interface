"use client";

import * as React from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Button, ModalProps, Text, CurrencyIcon } from "@/components";

import styles from "../BorrowRepay/BorrowRepay.module.scss"; // Reuse existing styles

import { useApproveToken } from "@/utils/evm/hooks/useApproveToken";
import { useAllowance } from "@/utils/evm/hooks/useAllowance";
import { useRepayBorrow } from "@/utils/evm/hooks/useRepayBorrow";
import { Currency } from "@/types";
import { Confirming } from "@/components/shared/Confirming/Confirming";

export type RepayProps = {
  cb: () => void;
  chain: {
    name: string;
    icon: Currency;
    chainId: number;
  };
  asset: {
    name: string;
    icon: Currency;
    address: `0x${string}`;
    decimals: number;
  };
  cTokenAddress: `0x${string}`;
  amount: bigint;
};

type Repay = ModalProps & {
  props: RepayProps;
};

export const Repay: React.FC<Repay> = ({ props, ...rest }) => {
  const { chain, asset, cTokenAddress, amount } = props;
  const { address: userAddress } = useAccount();

  const formattedAmount = parseFloat(
    formatUnits(amount, asset.decimals),
  ).toFixed(3);

  const {
    allowance,
    isLoading: isAllowanceLoading,
    refetch: refetchAllowance,
  } = useAllowance({
    token: asset.address,
    owner: userAddress,
    spender: cTokenAddress,
  });

  const needsApproval = allowance < amount;

  const {
    approve,
    isPending: isApproving,
    isConfirming: isConfirmingApprove,
  } = useApproveToken({
    token: asset.address,
    spender: cTokenAddress,
    amount: amount,
  });

  const {
    repay,
    isPending: isRepaying,
    isConfirming: isConfirmingRepay,
    hash,
    status: repayStatus,
  } = useRepayBorrow(cTokenAddress);

  useEffect(() => {
    if (!isConfirmingRepay && hash) {
      rest.onOpenChange(false);
    }
  }, [isConfirmingRepay, hash, rest]);

  useEffect(() => {
    if (!isConfirmingApprove && !isApproving) {
      refetchAllowance?.();
    }
  }, [isConfirmingApprove, isApproving, refetchAllowance]);

  useEffect(() => {
    if (repayStatus === "success") {
      if (typeof props.cb === "function") {
        props.cb();
      }
    }
  }, [props, props.cb, repayStatus]);

  return (
    <ModalLayout title="Repay Loan" isSwipeable {...rest}>
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Repay Borrow
        </Text>
        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Chain
          </Text>
          <div className={styles.staticBox}>
            <CurrencyIcon currency={chain.icon} width={24} height={24} />
            <Text size={14} theme={500}>
              {chain.name}
            </Text>
          </div>
        </div>
        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Asset
          </Text>
          <div className={styles.staticBox}>
            <CurrencyIcon currency={asset.icon} width={24} height={24} />
            <Text size={14} theme={500}>
              {asset.name}
            </Text>
          </div>
        </div>
        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Amount to repay
          </Text>
          <div className={styles.staticBox}>
            <Text size={16} theme={600}>
              {formattedAmount} {asset.name}
            </Text>
          </div>
        </div>
        <Button
          size="large"
          variant="purple"
          className={styles.button}
          onClick={needsApproval ? approve : () => repay(amount)}
          disabled={
            isAllowanceLoading ||
            isApproving ||
            isConfirmingApprove ||
            isRepaying ||
            isConfirmingRepay
          }
        >
          {needsApproval ? (
            isApproving ? (
              "Waiting for Wallet..."
            ) : isConfirmingApprove ? (
              <Confirming />
            ) : (
              "Approve"
            )
          ) : isRepaying ? (
            "Waiting for Wallet..."
          ) : isConfirmingRepay ? (
            <Confirming />
          ) : (
            "Repay"
          )}
        </Button>
      </div>
    </ModalLayout>
  );
};
