import * as React from "react";
import cx from "classnames";
import {
  CurrencyIcon,
  CustomInput,
  Button,
  Heading,
  Icon,
  Loader,
  Text,
  Section,
  NetworkSelection,
} from "@/components";
import { formatUSD } from "@/utils";

import Link from "next/link";
import styles from "./Tabs.module.scss";

export const Leverage = () => {
  const [value, setValue] = React.useState("1.0");
  const controls = "default" as any;

  const getStepStatus = (option: string, index: number) => {
    if (option === "default" || option === "step 1") {
      return index === 0 ? "current" : "next";
    }

    if (option === "step 2 - 1" || option === "step 2 - 2") {
      if (index === 0) {
        return "done";
      } else {
        return index === 1 ? "current" : "next";
      }
    }

    if (option === "step 3 - 1" || option === "step 3 - 2") {
      return index <= 1 ? "done" : "current";
    }

    return "done";
  };

  return (
    <React.Fragment>
      <Heading element="h4" className={styles.title}>
        Cross-Chain Loans
      </Heading>
      <div className={styles.steps}>
        <Button
          size="custom"
          variant="gradient-light"
          className={cx(
            styles.step,
            styles[getStepStatus(controls["leverage"], 0)],
          )}
        >
          <Icon glyph={"Info"} width={16} height={16} />
          Step 1{" "}
          <Section className={styles.tooltip}>
            Pick what chain you want to take out the loan on and enter the
            amount
          </Section>
        </Button>
        <Button
          size="custom"
          variant="gradient-light"
          className={cx(
            styles.step,
            styles[getStepStatus(controls["leverage"], 1)],
          )}
        >
          <Icon glyph={"Info"} width={16} height={16} />
          Step 2{" "}
          <Section className={styles.tooltip}>
            Input the wallet address that will be granted the right to take the
            loan on said chain.
          </Section>
        </Button>
        <Button
          size="custom"
          variant="gradient-light"
          className={cx(
            styles.step,
            styles[getStepStatus(controls["leverage"], 2)],
          )}
        >
          <Icon glyph={"Info"} width={16} height={16} />
          Step 3{" "}
          <Section className={styles.tooltip}>
            Review your transaction details to ensure their accuracy before
            submitting.
          </Section>
        </Button>
      </div>
      {(() => {
        switch (controls["leverage"]) {
          case "default":
            return (
              <React.Fragment>
                <CustomInput
                  className={styles.leverageInput}
                  value={0}
                  onChange={() => {}}
                  disabled
                  values={{
                    usd: undefined,
                  }}
                  title={"Borrow amount"}
                />
                <Section
                  className={styles.selectToken}
                  containerClassName={styles.selectTokenContainer}
                >
                  <Text size={14} theme={600}>
                    Chain for loan
                  </Text>
                  <NetworkSelection />
                </Section>
                <div className={styles.buttons}>
                  <Button
                    size={"large"}
                    variant={"purple"}
                    disabled
                    className={styles.button}
                  >
                    <Text size={16} theme={500}>
                      Enter amount
                    </Text>
                  </Button>
                </div>
              </React.Fragment>
            );
          case "step 1":
            return (
              <React.Fragment>
                <CustomInput
                  className={styles.leverageInput}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  values={{
                    usd: Number(value)
                      ? formatUSD(Number(value) * 1.2)
                      : undefined,
                    balance: 2.5413,
                  }}
                  fastOptions
                  title={"You pay"}
                  token={{
                    icon: "WrappedStakedETH",
                    name: "wstETH",
                  }}
                />
                <Section
                  className={styles.selectToken}
                  containerClassName={styles.selectTokenContainer}
                >
                  <Text size={14} theme={600}>
                    Chain for loan
                  </Text>
                  <NetworkSelection />
                </Section>
                <div className={styles.buttons}>
                  <Button
                    size={"large"}
                    variant={"purple"}
                    disabled
                    className={styles.button}
                  >
                    <Text size={16} theme={500}>
                      Approve and continue
                    </Text>
                  </Button>
                </div>
                <Text size={14} theme={500} className={styles.row}>
                  Collateral Value
                  <span>$1,900</span>
                </Text>
                <Text size={14} theme={500} className={styles.row}>
                  Liquidation Point
                  <span>$2,140</span>
                </Text>
                <Text size={14} theme={500} className={styles.row}>
                  Borrow Capacity
                  <span>1,640 USDT</span>
                </Text>
                <Text size={14} theme={500} className={styles.row}>
                  Available to Borrow
                  <span>1,530 USDT</span>
                </Text>
              </React.Fragment>
            );
          case "step 2 - 1":
          case "step 2 - 2":
            return (
              <React.Fragment>
                <Section
                  className={styles.loan}
                  containerClassName={styles.loanContainer}
                >
                  {controls["leverage"] === "step 2 - 1" ? (
                    <React.Fragment>
                      <Heading element="h3" className={styles.loanTitle}>
                        Wallet for the loan
                      </Heading>
                      <Text size={14} theme={400} className={styles.loanText}>
                        Sign using the wallet where you want the loan credit to
                        be deposited.
                      </Text>
                      <Button
                        size="medium"
                        variant={"purple"}
                        className={styles.loanButton}
                      >
                        <Text size={14} theme={500}>
                          Sign the wallet
                        </Text>{" "}
                        <Icon glyph={"Signature"} />
                      </Button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Icon className={styles.loanIcon} glyph={"Succeed"} />
                      <Text
                        size={14}
                        theme={500}
                        className={styles.loanAddress}
                      >
                        1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                      </Text>
                      <Text size={14} theme={400} className={styles.loanNote}>
                        Wallet successfully signed
                      </Text>
                    </React.Fragment>
                  )}
                </Section>
                <div className={styles.buttons}>
                  <Button
                    size={"large"}
                    variant={"purple"}
                    disabled={controls["leverage"] === "step 2 - 1"}
                    className={styles.button}
                  >
                    <Text size={16} theme={500}>
                      Next
                    </Text>
                  </Button>
                  <Button
                    size={"large"}
                    variant={"stroke"}
                    className={styles.button}
                  >
                    <Text size={16} theme={500}>
                      Back
                    </Text>
                  </Button>
                </div>
              </React.Fragment>
            );
          case "step 3 - 1":
            return (
              <React.Fragment>
                <div className={styles.confirm}>
                  <div className={styles.confirmAmount}>
                    <Text size={14} theme={400}>
                      Your borrow
                    </Text>
                    <Heading element="h2" as="div">
                      1.332
                    </Heading>
                    <Text size={12} theme={400}>
                      $3443.44
                    </Text>
                  </div>
                  <Text size={16} theme={500} className={styles.confirmToken}>
                    <CurrencyIcon currency={"Ethereum"} /> ETH
                  </Text>
                </div>
                <Text
                  size={14}
                  theme={500}
                  className={cx(styles.row, styles.bordered, styles.top)}
                >
                  Gas fee
                  <span>0.05$</span>
                </Text>
                <div className={styles.buttons}>
                  <Button
                    size={"large"}
                    variant={"purple"}
                    className={styles.button}
                  >
                    <Text size={16} theme={500}>
                      Confirm borrowing
                    </Text>
                  </Button>
                  <Button
                    size={"large"}
                    variant={"stroke"}
                    className={styles.button}
                  >
                    <Text size={16} theme={500}>
                      Back
                    </Text>
                  </Button>
                </div>
                <Heading element="h4" className={styles.subtitle}>
                  Position Summary
                </Heading>
                <Text size={14} theme={500} className={styles.row}>
                  Collateral Value
                  <span>1250 USDT</span>
                </Text>
                <Text size={14} theme={500} className={styles.row}>
                  Liquidation Point
                  <span>0.0000 USDT</span>
                </Text>
                <Text size={14} theme={500} className={styles.row}>
                  Borrow Capacity
                  <span>1,050.0432 USDT</span>
                </Text>
                <Text size={14} theme={500} className={styles.row}>
                  Available to Borrow
                  <span>1,050.0432 USDT</span>
                </Text>
                <Heading
                  element="h4"
                  className={cx(styles.subtitle, styles.bordered)}
                >
                  Details
                </Heading>
                <Text size={14} theme={500} className={styles.row}>
                  Chain
                  <span>
                    <CurrencyIcon
                      currency={"Ethereum"}
                      width={18}
                      height={18}
                    />{" "}
                    Ethereum mainnet
                  </span>
                </Text>
                <Text size={14} theme={500} className={styles.row}>
                  Wallet address
                  <span>1A1zP1eP...ivfNa</span>
                </Text>
              </React.Fragment>
            );
          case "step 3 - 2":
            return (
              <React.Fragment>
                <div className={styles.status}>
                  <div className={styles.statusInner}>
                    <Loader width={60} height={60} />
                  </div>
                  <Heading element="h3" className={styles.statusTitle}>
                    Confirm borrowing
                  </Heading>
                  <Text size={16} theme={500} className={styles.statusToken}>
                    <CurrencyIcon
                      currency={"RocketPoolETH"}
                      width={22}
                      height={22}
                    />
                    1.132 rETH
                  </Text>
                  <Text size={14} theme={500} className={styles.statusAddress}>
                    <span>To: </span> 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                  </Text>
                </div>
                <Text className={styles.proceed} size={14} theme={400}>
                  Proceed in your wallet
                </Text>
              </React.Fragment>
            );
          case "success":
            return (
              <React.Fragment>
                <div className={styles.status}>
                  <div className={styles.statusInner}>
                    <Icon glyph={"Succeed"} width={60} height={60} />
                  </div>
                  <Heading element="h3" className={styles.statusTitle}>
                    Transaction successful
                  </Heading>
                  <Text size={16} theme={500} className={styles.statusToken}>
                    <CurrencyIcon
                      currency={"RocketPoolETH"}
                      width={22}
                      height={22}
                    />
                    1.132 rETH
                  </Text>
                  <Text size={14} theme={500} className={styles.statusAddress}>
                    <span>To: </span> 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                  </Text>
                  <Link
                    href={"/"}
                    target={"_blank"}
                    className={styles.statusExplorer}
                  >
                    <Text size={12} theme={500}>
                      View in Explorer
                    </Text>
                    <Icon glyph={"Share"} width={12} height={12} />
                  </Link>
                </div>
                <Button className={styles.back} size="large" variant={"stroke"}>
                  Start New Transaction
                </Button>
              </React.Fragment>
            );
          default:
            break;
        }
      })()}
    </React.Fragment>
  );
};
