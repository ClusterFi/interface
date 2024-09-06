"use client";

import * as React from "react";
import { useControls } from "leva";

import {
  Heading,
  Container,
  Button,
  CurrencySelection,
  Icon,
  Text,
} from "@/components";

import { Borrow, Loans, Wallet } from "./components";

import styles from "./Loans.module.scss";

export const LoansPage: React.FC = () => {
  const controls = useControls({
    ["Page-State"]: {
      options: ["Loans", "Wallet1", "Wallet2", "Borrow"],
      value: "Loans",
    },
  });

  return (
    <section className={styles.base}>
      <Container className={styles.container}>
        <Heading element="h2" as="h1" className={styles.title}>
          Cross-Chain Loans
          <Button
            className={styles.more}
            size={"small"}
            variant={"gradient-light"}
          >
            <Text size={12} theme={600}>
              Read More
            </Text>
            <Icon glyph={"Lamp"} width={15} height={15} />
          </Button>
        </Heading>
        <div className={styles.grid}>
          <CurrencySelection variant={"gradient"} />
          {(() => {
            switch (controls["Page-State"]) {
              case "Loans":
                return <Loans />;
              case "Wallet1":
              case "Wallet2":
                return <Wallet variant={controls["Page-State"]} />;
              case "Borrow":
                return <Borrow />;
              default:
                return null;
            }
          })()}
        </div>
      </Container>
    </section>
  );
};
