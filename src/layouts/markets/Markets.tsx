"use client";

import * as React from "react";
import { useControls } from "leva";

import { Heading, Container, Overview, Section } from "@/components";
import { Market } from "./Market/Market";

import styles from "./Markets.module.scss";

export const MarketsPage: React.FC = () => {
  const controls = useControls({
    ["markets-loading"]: {
      value: false,
      label: "Is loading?",
    },
  });

  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        <Section className={styles.overview}>
          <Overview state={"default"} />
        </Section>
        <Heading element="h2" as="h1" className={styles.title}>
          Markets
        </Heading>
        <div className={styles.grid}>
          <Market
            isLoading={controls["markets-loading"]}
            currency={"Ethereum"}
            name={"Ethereum"}
          />
          <Market
            isLoading={controls["markets-loading"]}
            currency={"Solana"}
            name={"Solana"}
          />
        </div>
      </Container>
    </section>
  );
};
