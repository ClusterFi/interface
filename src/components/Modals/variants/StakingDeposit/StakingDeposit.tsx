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
  const [value, setValue] = React.useState("");

  return (
    <ModalLayout
      title={props.token + " Deposit"}
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
