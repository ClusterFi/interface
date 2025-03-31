import * as React from "react";
import { useModalsStore } from "@/utils/stores";

import { ReadMore, ReadMoreProps, StakingDeposit, StakingDepositProps, StakingWithdraw, StakingWithdrawProps, TreasurySwap, TreasurySwapProps, ConnectWallet, ConnectWalletProps, SelectToken, SelectTokenProps, Swap, SwapProps, SwitchWallet, SwitchWalletProps, Wallet, WalletProps } from "@/components/Modals/variants";

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
};
export type ModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};
export type ModalVariants = keyof ModalPropsMap;
export type TModals = Record<ModalVariants, React.FC<ModalProps & { props: any }>>;

const modalsByName: TModals = {
	ReadMore,
	StakingDeposit,
	StakingWithdraw,
	TreasurySwap,
	ConnectWallet,
	SelectToken,
	Swap,
	SwitchWallet,
	Wallet,
} as const;

export const Modals: React.FC = () => {
	const { activeModal, closeModal } = useModalsStore();

	return Object.entries(modalsByName).map(([name, Modal]) => {
		const isActive = activeModal?.name === name;

		if (!isActive) return null;

		return <Modal key={name} open={isActive} onOpenChange={closeModal} props={activeModal?.props} />;
	});
};
