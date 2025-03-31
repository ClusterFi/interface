import * as React from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import {
  Button,
  CurrencyIcon,
  Text,
  CustomInput,
  ModalProps,
  Icon,
} from "@/components";
import { formatCoin, formatUSD } from "@/utils";
import { useModalsStore } from "@/utils/stores";
import styles from "./TreasurySwap.module.scss";

export type TreasurySwapProps = null;

type TreasurySwap = ModalProps & {
  props: TreasurySwapProps;
};

export const TreasurySwap: React.FC<TreasurySwap> = ({ props, ...rest }) => {
  const [value1, setValue1] = React.useState("1.43");
  const [value2, setValue2] = React.useState("0.43");
  const { openModal } = useModalsStore();

  return (
    <ModalLayout title={"Treasury swap"} isTitleVisible {...rest}>
      <div className={styles.content}>
        <Text size={14} theme={400} className={styles.text}>
          Congratulations! Now every 1 aMTT entitles you to buy 2 CLR for the
          price of 1.
        </Text>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Text size={12} theme={500} className={styles.title}>
              aMTT available
            </Text>
            <Text size={16} theme={500} className={styles.info}>
              80 aMTT
            </Text>
          </li>
          <li className={styles.item}>
            <Text size={12} theme={500} className={styles.title}>
              CLR price
            </Text>
            <Text size={16} theme={500} className={styles.info}>
              $0.48
            </Text>
          </li>
          <li className={styles.item}>
            <Text size={12} theme={500} className={styles.title}>
              Discount
            </Text>
            <Text size={16} theme={500} className={styles.info}>
              -50%
            </Text>
          </li>
        </ul>
        <CustomInput
          className={styles.input}
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          values={{
            usd: Number(value2) ? formatUSD(Number(value2) * 1.2) : undefined,
            balance: 2.5413,
          }}
          title={"You pay"}
          token={{
            icon: "WrappedStakedETH",
            name: "wstETH",
            changable: true,
          }}
        />
        <CustomInput
          className={styles.input}
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          values={{
            usd: Number(value1) ? formatUSD(Number(value1) * 1.2) : undefined,
            balance: 2.5413,
          }}
          title={"You pay"}
          token={{
            icon: "WrappedStakedETH",
            name: "wstETH",
          }}
        />
        <Text size={14} theme={500} className={styles.row}>
          You save
          <span>0</span>
        </Text>
        <Text size={14} theme={500} className={styles.row}>
          Gas fee
          <span>0</span>
        </Text>
        <Button className={styles.submit} size={"large"} variant={"purple"}>
          Approve
        </Button>
      </div>
    </ModalLayout>
  );
};
