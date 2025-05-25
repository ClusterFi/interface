import * as React from "react";
import cx from "classnames";
import {
  Button,
  CurrencyIcon,
  CustomInput,
  Heading,
  Icon,
  Loader,
  Switcher,
  Text,
} from "@/components";
import { formatUSD } from "@/utils";
import { useControls } from "leva";

import Link from "next/link";
import styles from "./Tabs.module.scss";

export const Deposit = () => {
  const [value, setValue] = React.useState("");
  const controls = useControls({
    deposit: {
      options: [
        "default",
        "confirm",
        "confirm-loading",
        "loading",
        "succeed",
        "error",
      ],
      label: "Deposit state:",
    },
  });

  return (
    <React.Fragment>
      {(() => {
        switch (controls["deposit"]) {
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
                  token={{
                    icon: "WrappedStakedETH",
                    name: "wstETH",
                  }}
                />
                <Text size={14} theme={500} className={styles.row}>
                  Enable collateral
                  <span>
                    <Switcher targetValue={false} onSwitch={() => {}} />
                  </span>
                </Text>
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
          case "confirm-loading":
            return (
              <React.Fragment>
                <div className={styles.confirm}>
                  <div className={styles.confirmAmount}>
                    <Text size={14} theme={400}>
                      Your deposit
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
                {controls["deposit"] === "confirm" ? (
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
                ) : (
                  <div className={styles.confirmLoading}>
                    <div className={styles.confirmLoadingInner}>
                      <Loader width={60} height={60} />
                      <CurrencyIcon
                        currency={"RocketPoolETH"}
                        width={40}
                        height={40}
                        className={styles.confirmLoadingIcon}
                      />
                    </div>
                    <Heading
                      className={styles.confirmLoadingTitle}
                      element="h3"
                    >
                      Approve in wallet
                    </Heading>
                  </div>
                )}
              </React.Fragment>
            );
          case "loading":
          case "succeed":
          case "error":
            return (
              <React.Fragment>
                <div className={styles.status}>
                  {(() => {
                    switch (controls["deposit"]) {
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
                              Confirm depositing
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
                      case "error":
                        return (
                          <React.Fragment>
                            <div className={styles.statusInner}>
                              <Icon glyph={"Error"} width={60} height={60} />
                            </div>
                            <Heading
                              element="h3"
                              className={styles.statusTitle}
                            >
                              Something went wrong
                            </Heading>
                          </React.Fragment>
                        );

                      default:
                        break;
                    }
                  })()}
                  {controls["deposit"] !== "error" && (
                    <Text size={16} theme={500} className={styles.statusToken}>
                      <CurrencyIcon
                        currency={"RocketPoolETH"}
                        width={22}
                        height={22}
                      />
                      1.132 rETH
                    </Text>
                  )}
                  {controls["deposit"] === "succeed" && (
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
                {controls["deposit"] === "loading" ? (
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
