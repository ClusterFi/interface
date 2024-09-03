"use client";

import * as React from "react";
import { useControls } from "leva";

import { Heading, Container } from "@/components";
import { Network } from "./Network/Network";

import styles from "./Get.module.scss";

export const GetPage: React.FC = () => {
  const controls = useControls({
    ["Is-Loading?"]: false,
  });

  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        <Heading element="h2" as="h1" className={styles.title}>
          LSDs
        </Heading>
        <div className={styles.grid}>
          <Network
            isLoading={controls["Is-Loading?"]}
            currency={"Ethereum"}
            name={"Ethereum network"}
          />
          <Network
            isLoading={controls["Is-Loading?"]}
            currency={"Solana"}
            name={"Solana network"}
          />
        </div>
      </Container>
    </section>
  );
};
