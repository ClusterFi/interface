'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { formatUnits } from 'viem';

import { ModalLayout } from '@/components/Modals/ModalLayout/ModalLayout';
import { Button, ModalProps, Text, CurrencyIcon } from '@/components';

import styles from './BorrowRepay.module.scss';

import { useApproveToken } from '@/utils/evm/hooks/useApproveToken';
import { useAllowance } from '@/utils/evm/hooks/useAllowance';
import { useRepayLoanCrossChain } from '@/utils/evm/hooks/useRepayLoanCrossChain';
import { Currency } from '@/types';

export type BorrowRepayProps = {
  destinationChain: {
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
  clgAddress: `0x${string}`;
  borrower: `0x${string}`;
  amount: bigint;
};

type BorrowRepay = ModalProps & {
  props: BorrowRepayProps;
};

export const BorrowRepay: React.FC<BorrowRepay> = ({ props, ...rest }) => {
  const { destinationChain, asset, clgAddress, borrower, amount } = props;
  const { address: userAddress } = useAccount();

  const formattedAmount = parseFloat(formatUnits(amount, asset.decimals)).toFixed(3);
  const parsedAmount = amount;

  const { allowance, isLoading: isAllowanceLoading } = useAllowance({
    token: asset.address,
    owner: userAddress,
    spender: clgAddress,
  });

  const needsApproval = allowance < parsedAmount;

  const {
    approve,
    isPending: isApproving,
    isConfirming: isConfirmingApprove,
  } = useApproveToken({
    token: asset.address,
    spender: clgAddress,
  });

  const {
    repay,
    isPending: isRepaying,
    isConfirming: isConfirmingRepay,
    hash,
  } = useRepayLoanCrossChain(clgAddress, destinationChain.chainId, asset.address, borrower);

  useEffect(() => {
    if (hash && !isConfirmingRepay) {
      rest.onOpenChange(false);
    }
  }, [hash, isConfirmingRepay, rest]);

  return (
      <ModalLayout title="Repay Loan" isSwipeable {...rest}>
        <div className={styles.content}>
          <Text size={16} theme={600} className={styles.title}>
            Cross Chain Repayment
          </Text>
          <div className={styles.field}>
            <Text size={14} theme={400} className={styles.label}>Destination Chain</Text>
            <div className={styles.staticBox}>
              <CurrencyIcon currency={destinationChain.icon} width={24} height={24} />
              <Text size={14} theme={500}>{destinationChain.name}</Text>
            </div>
          </div>
          <div className={styles.field}>
            <Text size={14} theme={400} className={styles.label}>Asset</Text>
            <div className={styles.staticBox}>
              <CurrencyIcon currency={asset.icon} width={24} height={24} />
              <Text size={14} theme={500}>{asset.name}</Text>
            </div>
          </div>
          <div className={styles.field}>
            <Text size={14} theme={400} className={styles.label}>Amount to repay</Text>
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
              onClick={needsApproval ? approve : () => repay(parsedAmount)}
              disabled={
                  isAllowanceLoading ||
                  isApproving ||
                  isConfirmingApprove ||
                  isRepaying ||
                  isConfirmingRepay
              }
          >
            {needsApproval
                ? isApproving
                    ? 'Waiting for Wallet...'
                    : isConfirmingApprove
                        ? 'Confirming...'
                        : 'Approve'
                : isRepaying
                    ? 'Waiting for Wallet...'
                    : isConfirmingRepay
                        ? 'Confirming...'
                        : 'Repay'}
          </Button>
        </div>
      </ModalLayout>
  );
};
