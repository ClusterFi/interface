"use client";

import * as React from "react";

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
import { useModalsStore } from "@/utils/stores";

export const LoansPage: React.FC = () => {
  const { openModal } = useModalsStore();

  const controls = "Loans" as any;

  const onClickReadMore = () =>
    openModal("ReadMore", {
      title: "Cross chain loans read more",
      content: [
        `Deposit collateral from the list.`,
        <>
          {`Pick what chain you want to take`}
          <br />
          {`out the loan on.`}
        </>,
        `Input the wallet address that will be granted the right to take the loan on said chain.`,
        `That's it!  Simply connect to our app using the specified wallet and be able to borrow any supported asset.`,
      ],
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
            onClick={onClickReadMore}
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
            switch (controls["loans-state"]) {
              case "Loans":
                return <Loans />;
              case "Wallet1":
              case "Wallet2":
                return <Wallet variant={controls["loans-state"]} />;
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
