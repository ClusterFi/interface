"use client";

import * as React from "react";
import cx from "classnames";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import {
  ModalProps,
  WalletIcon,
  Heading,
  Button,
  Icon,
  Text,
  CurrencyIcon,
} from "@/components";
import Link from "next/link";
import styles from "./GetLSDs.module.scss";
import Image from "next/image";
import { useControls } from "leva";
import { Form } from "./components/Form";
import { ConfirmSwap } from "./components/ConfirmSwap";
import { Status } from "./components/Status";

export type GetLSDsProps = null;

type GetLSDs = ModalProps & {
  props: GetLSDsProps;
};

export const GetLSDs: React.FC<GetLSDs> = ({ props, ...rest }) => {
  const controls = useControls({
    ["lsds-state"]: {
      options: [
        "Form",
        "Confirm-Swap",
        "Confirm-Loading",
        "Status-Loading",
        "Status-Succeed",
        "Status-Error",
      ],
      label: "Get LSDs Modal state",
    },
  });

  const isTitleVisible =
    controls["lsds-state"] === "Form" ||
    controls["lsds-state"] === "Confirm-Swap" ||
    controls["lsds-state"] === "Confirm-Loading";
  const modalTitle =
    controls["lsds-state"] === "Form" ? "Get wstETH" : "Confirm Swap";

  return (
    <ModalLayout title={modalTitle} isTitleVisible={isTitleVisible} {...rest}>
      <div className={styles.content}>
        {(() => {
          switch (controls["lsds-state"]) {
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
