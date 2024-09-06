import * as React from "react";

import { Heading, Section, Button, Text, Icon } from "@/components";
import styles from "./Wallet.module.scss";

type WalletProps = {
  variant: "Wallet1" | "Wallet2";
};

export const Wallet: React.FC<WalletProps> = ({ variant }) => {
  return (
    <Section className={styles.base}>
      <Heading className={styles.title} element="h3" as="h2">
        Wallet for the loan
      </Heading>
      <div className={styles.box}>
        {(() => {
          switch (variant) {
            case "Wallet1":
              return (
                <React.Fragment>
                  <Text className={styles.text} size={14} theme={400}>
                    Sign using the wallet where you want the loan credit to be
                    deposited.
                  </Text>
                  <Button
                    className={styles.sign}
                    size={"medium"}
                    variant={"purple"}
                  >
                    <Text size={14} theme={600}>
                      Sign the wallet
                    </Text>
                    <Icon glyph={"Signature"} width={16} height={16} />
                  </Button>
                </React.Fragment>
              );
            case "Wallet2":
              return (
                <React.Fragment>
                  <div className={styles.wallet}>
                    <Text size={14} theme={600}>
                      1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                      <Icon glyph={"Check"} width={16} height={16} />
                    </Text>
                  </div>
                  <Text className={styles.text} size={14} theme={400}>
                    Wallet successfully signed
                  </Text>
                </React.Fragment>
              );
            default:
              return null;
          }
        })()}
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          size={"large"}
          variant={"purple"}
          disabled={variant === "Wallet1"}
        >
          Next
        </Button>
        <Button className={styles.button} size={"large"} variant={"stroke"}>
          Back
        </Button>
      </div>
    </Section>
  );
};
