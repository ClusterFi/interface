import * as React from "react";
import styles from "../Swap.module.scss";
import {
  Button,
  CurrencyIcon,
  Heading,
  Icon,
  Loader,
  Text,
} from "@/components/shared";
import Link from "next/link";

type StatusProps = {
  state: "loading" | "succeed" | "error";
};

export const Status: React.FC<StatusProps> = ({ state }) => {
  switch (state) {
    case "loading":
    case "succeed":
      return (
        <div className={styles.container}>
          <div className={styles.inner}>
            {state === "loading" ? (
              <Loader width={60} height={60} />
            ) : (
              <Icon glyph={"Succeed"} width={60} height={60} />
            )}
            <Heading element="h3" className={styles.innerTitle}>
              {state === "loading" ? "Confirm Swap" : "Swap submitted"}
            </Heading>
            <div className={styles.swap}>
              <Text size={16} theme={500} className={styles.swapItem}>
                <CurrencyIcon currency={"Ethereum"} width={22} height={22} />
                1.132 ETH
              </Text>
              <Icon glyph={"Arrow"} width={24} height={24} />
              <Text size={16} theme={500} className={styles.swapItem}>
                <CurrencyIcon currency={"WrappedEETH"} width={22} height={22} />
                1.0632 wstETH
              </Text>
            </div>
          </div>
          <Text size={12} theme={500} className={styles.note}>
            {state === "loading" ? (
              "Proceed in your wallet"
            ) : (
              <Link href={"/"} target={"_blank"}>
                View in Explorer <Icon glyph={"Share"} width={12} height={12} />
              </Link>
            )}
          </Text>
        </div>
      );
    case "error":
      return (
        <div className={styles.container}>
          <Icon
            className={styles.errorIcon}
            glyph={"Error"}
            width={60}
            height={60}
          />
          <Heading element="h3" className={styles.errorTitle}>
            Something went wrong
          </Heading>
          <Button
            className={styles.errorButton}
            size={"large"}
            variant={"stroke"}
          >
            Back
          </Button>
        </div>
      );
    default:
      return null;
  }
};
