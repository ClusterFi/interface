"use client";

import * as React from "react";
import { useControls } from "leva";

import { Heading, Container } from "@/components";
import { Network } from "./Network/Network";

import styles from "./Get.module.scss";

export const GetPage: React.FC = () => {
  const controls = useControls({
    ["get-loading"]: {
      value: false,
      label: "Is loading?",
    },
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

  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        <Heading element="h2" as="h1" className={styles.title}>
          LSDs
        </Heading>
        <div className={styles.grid}>
          <Network
            isLoading={controls["get-loading"]}
            currency={"Ethereum"}
            name={"Ethereum network"}
          />
          <Network
            isLoading={controls["get-loading"]}
            currency={"Solana"}
            name={"Solana network"}
          />
        </div>
      </Container>
    </section>
  );
};
