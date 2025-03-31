"use client";

import * as React from "react";
import { useControls } from "leva";

import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { ModalProps } from "@/components";

import { Form } from "./components/Form";
import { ConfirmSwap } from "./components/ConfirmSwap";
import { Status } from "./components/Status";

import styles from "./Swap.module.scss";

export type SwapProps = null;

type Swap = ModalProps & {
	props: SwapProps;
};

export const Swap: React.FC<Swap> = ({ props, ...rest }) => {
	const controls = useControls({
		["swap-state"]: {
			options: ["Form", "Confirm-Swap", "Confirm-Loading", "Status-Loading", "Status-Succeed", "Status-Error"],
			label: "Get LSDs Modal state",
		},
	});

	const isTitleVisible = controls["swap-state"] === "Form" || controls["swap-state"] === "Confirm-Swap" || controls["swap-state"] === "Confirm-Loading";
	const modalTitle = controls["swap-state"] === "Form" ? "Get wstETH" : "Confirm Swap";

	return (
		<ModalLayout title={modalTitle} isTitleVisible={isTitleVisible} {...rest}>
			<div className={styles.content}>
				{(() => {
					switch (controls["swap-state"]) {
						case "Form":
							return <Form />;
						case "Confirm-Swap":
							return <ConfirmSwap isLoading={false} />;
						case "Confirm-Loading":
							return <ConfirmSwap isLoading />;
						case "Status-Loading":
							return <Status state={"loading"} />;
						case "Status-Succeed":
							return <Status state={"succeed"} />;
						case "Status-Error":
							return <Status state={"error"} />;
						default:
							console.warn("Unreachable branch!");
							return null;
					}
				})()}
			</div>
		</ModalLayout>
	);
};
