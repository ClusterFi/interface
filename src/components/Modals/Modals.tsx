import * as React from 'react';
import { useModalsStore } from '@/utils/stores';

import {
  Borrow,
  ReadMore,
  ReadMoreProps,
  StakingDeposit,
  StakingDepositProps,
  StakingWithdraw,
  StakingWithdrawProps,
  TreasurySwap,
  TreasurySwapProps,
  ConnectWallet,
  ConnectWalletProps,
  SelectToken,
  SelectTokenProps,
  Swap,
  SwapProps,
  SwitchWallet,
  SwitchWalletProps,
  Wallet,
  WalletProps,
  TabsModalProps,
  TabsModal,
  LoansProps,
  Loans,
  Supply,
  SupplyProps,
} from '@/components/Modals/variants';
import { BorrowProps } from './variants/Borrow/Borrow';

export type ModalPropsMap = {
  ReadMore: ReadMoreProps;
  StakingDeposit: StakingDepositProps;
  StakingWithdraw: StakingWithdrawProps;
  TreasurySwap: TreasurySwapProps;
  ConnectWallet: ConnectWalletProps;
  SelectToken: SelectTokenProps;
  Swap: SwapProps;
  SwitchWallet: SwitchWalletProps;
  Wallet: WalletProps;
  TabsModal: TabsModalProps;
  Loans: LoansProps;
  Borrow: BorrowProps;
  Supply: SupplyProps;
};
export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export type ModalVariants = keyof ModalPropsMap;
export type TModals = Record<
  ModalVariants,
  React.FC<ModalProps & { props: any }>
>;

const modalsByName: TModals = {
  Borrow,
  ReadMore,
  StakingDeposit,
  StakingWithdraw,
  TreasurySwap,
  ConnectWallet,
  SelectToken,
  Swap,
  SwitchWallet,
  Wallet,
  TabsModal,
  Loans,
  Supply,
} as const;

export const Modals: React.FC = () => {
  const { activeModal, closeModal } = useModalsStore();

  return Object.entries(modalsByName).map(([name, Modal]) => {
    const isActive = activeModal?.name === name;

    if (!isActive) return null;

    return (
      <Modal
        key={name}
        open={isActive}
        onOpenChange={closeModal}
        props={activeModal?.props}
      />
    );
  });
};
