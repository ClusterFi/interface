import * as React from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import {
  CustomInput,
  Text,
  ModalProps,
  CurrencyIcon,
  Button,
  Icon,
} from "@/components";
import { formatUSD } from "@/utils";
import styles from "./StakingDeposit.module.scss";

export type StakingDepositProps = {
  token: string;
};

type StakingDeposit = ModalProps & {
  props: StakingDepositProps;
};

export const StakingDeposit: React.FC<StakingDeposit> = ({
  props,
  ...rest
}) => {
  const [value, setValue] = React.useState("1.1");

  return (
    <ModalLayout
      title={props.token + " Deposit"}
      modalClassName={styles.modal}
      isTitleVisible
      {...rest}
    >
      <div className={styles.content}>
        <CustomInput
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          values={{
            usd: Number(value) ? formatUSD(Number(value) * 1.2) : undefined,
            balance: 2.5413,
          }}
          title={"You pay"}
          token={{
            icon: "WrappedStakedETH",
            name: "wstETH",
          }}
        />
        <Text size={14} theme={500} className={styles.row}>
          Net APR
          <span>
            <Icon glyph={"Info"} width={12} height={12} /> 2.42%
          </span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Earn
          <span>ETH+aMTT</span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Gas fee
          <span>$1.34</span>
        </Text>
        <Button className={styles.submit} size={"large"} variant={"purple"}>
          Deposit
        </Button>
      </div>
    </ModalLayout>
  );
};
