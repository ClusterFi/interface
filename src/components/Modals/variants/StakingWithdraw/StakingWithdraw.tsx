import * as React from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { ModalProps } from "@/components/Modals/Modals";
import { Button, CurrencyIcon, Icon, Text } from "@/components/shared";
import styles from "./StakingWithdraw.module.scss";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { formatUSD } from "@/utils";

export type StakingWithdrawProps = {
  token: string;
};

type StakingWithdraw = ModalProps & {
  props: StakingWithdrawProps;
};

export const StakingWithdraw: React.FC<StakingWithdraw> = ({
  props,
  ...rest
}) => {
  const [value, setValue] = React.useState("1.1");

  return (
    <ModalLayout
      title={props.token + " Withdraw"}
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
        <Button className={styles.submit} size={"large"} variant={"purple"}>
          Deposit
        </Button>
      </div>
    </ModalLayout>
  );
};
