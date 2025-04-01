import * as React from "react";

import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { ModalProps } from "@/components";

import styles from "./Loans.module.scss";
import { Leverage } from "@/layouts/single-market/components/Tabs/Leverage";

export type LoansProps = null;

type Loans = ModalProps & {
	props: null;
};

export const Loans: React.FC<Loans> = ({ props, ...rest }) => {
	return (
		<ModalLayout contentClassName={styles.content} title={"Cross-Chain Loans"} isSwipeable {...rest}>
			<div className={styles.container}>
				<Leverage />
			</div>
		</ModalLayout>
	);
};
