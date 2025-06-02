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
} from "@/components";
import { formatUSD } from "@/utils";

import Link from "next/link";
import styles from "./Tabs.module.scss";

export const Repay = () => {
  const [value, setValue] = React.useState("1.0");
  const controls = {"repay": "default"} as any;

  return (
    <React.Fragment>
      {(() => {
        switch (controls["repay"]) {
          case "default":
            return (
              <React.Fragment>
                <CustomInput
                  className={styles.input}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  values={{
                    usd: Number(value)
                      ? formatUSD(Number(value) * 1.2)
                      : undefined,
                    balance: 2.5413,
                  }}
                  title={"You pay"}
                  subtitle={<>Wallet balace: 2.65</>}
                  token={{
                    icon: "WrappedStakedETH",
                    name: "wstETH",
                  }}
                  state={"error"}
                />
                <Text size={14} theme={500} className={styles.row}>
                  Health factor
                  <span>1.03</span>
                </Text>
                <div className={styles.buttons}>
                  <Button
                    size={"large"}
                    variant={"purple"}
                    className={styles.button}
                  >
                    <Text size={16} theme={500}>
                      Continue
                    </Text>
                  </Button>
                </div>
              </React.Fragment>
            );
          case "confirm":
            return (
              <React.Fragment>
                <div className={styles.confirm}>
                  <div className={styles.confirmAmount}>
                    <Text size={14} theme={400}>
                      Your withdraw
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
                  className={cx(styles.row, styles.bordered)}
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
                      Approve
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
          case "loading":
          case "succeed":
            return (
              <React.Fragment>
                <div className={styles.status}>
                  {(() => {
                    switch (controls["repay"]) {
                      case "loading":
                        return (
                          <React.Fragment>
                            <div className={styles.statusInner}>
                              <Loader width={60} height={60} />
                            </div>
                            <Heading
                              element="h3"
                              className={styles.statusTitle}
                            >
                              Confirm Repay
                            </Heading>
                          </React.Fragment>
                        );
                      case "succeed":
                        return (
                          <React.Fragment>
                            <div className={styles.statusInner}>
                              <Icon glyph={"Succeed"} width={60} height={60} />
                            </div>
                            <Heading
                              element="h3"
                              className={styles.statusTitle}
                            >
                              Transaction successful
                            </Heading>
                          </React.Fragment>
                        );

                      default:
                        break;
                    }
                  })()}
                  <Text size={16} theme={500} className={styles.statusToken}>
                    <CurrencyIcon
                      currency={"RocketPoolETH"}
                      width={22}
                      height={22}
                    />
                    1.132 rETH
                  </Text>
                  {controls["repay"] === "succeed" && (
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
                  )}
                </div>
                {controls["repay"] === "loading" ? (
                  <Text className={styles.proceed} size={14} theme={400}>
                    Proceed in your wallet
                  </Text>
                ) : (
                  <Button
                    className={styles.back}
                    size="large"
                    variant={"stroke"}
                  >
                    Go back
                  </Button>
                )}
              </React.Fragment>
            );

          default:
            break;
        }
      })()}
    </React.Fragment>
  );
};
