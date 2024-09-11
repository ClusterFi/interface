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
  const [value, setValue] = React.useState("");

  return (
    <ModalLayout
      title={props.token + " Withdraw"}
      modalClassName={styles.modal}
      isTitleVisible
      {...rest}
    >
      <div className={styles.content}>
        <div className={styles.head}>
          <Text size={14} theme={400} className={styles.token}>
            <CurrencyIcon currency={"Cluster"} width={20} height={20} /> CLR-LP
          </Text>
          <Text size={12} theme={400} className={styles.balance}>
            Available: <span>2540,13</span>
          </Text>
        </div>
        <CustomInput
          className={styles.input}
          value={value}
          USDValue={formatUSD(Number(value) * 1.2)}
          onClickMax={() => setValue("1000.00")}
          placeholder={"0.00"}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className={styles.submit} size={"large"} variant={"purple"}>
          Deposit
        </Button>
      </div>
    </ModalLayout>
  );
};
