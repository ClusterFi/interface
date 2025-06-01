"use client";

import * as React from "react";

import { Heading, Container } from "@/components";
import { Network } from "./Network/Network";

import styles from "./Swap.module.scss";

export const SwapPage: React.FC = () => {
  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        <Heading element="h2" as="h1" className={styles.title}>
          LSDs
        </Heading>
        <div className={styles.grid}>
          <Network isLoading={true} currency={"Ethereum"} name={"Ethereum"} />
          <Network isLoading={false} currency={"Solana"} name={"Solana"} />
        </div>
      </Container>
    </section>
  );
};
