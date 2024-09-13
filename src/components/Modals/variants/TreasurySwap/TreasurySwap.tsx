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
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
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
        <div className={styles.head}>
          <Button
            onClick={() => openModal("SelectToken", null)}
            size={"custom"}
            variant={"custom"}
            className="tokenWrap"
          >
            <Text size={14} theme={400} className={styles.token}>
              <CurrencyIcon currency={"Ethereum"} width={20} height={20} />
              ETH
              <Icon glyph={"Anchor"} width={16} height={16} />
            </Text>
          </Button>
          <Text size={12} theme={400} className={styles.balance}>
            Available: <span>{formatCoin(45000)}</span>
          </Text>
        </div>
        <CustomInput
          className={styles.input}
          value={value2}
          USDValue={formatUSD(Number(value2) * 1.2)}
          onClickMax={() => setValue2("1000.00")}
          placeholder={"0.00"}
          onChange={(e) => setValue2(e.target.value)}
        />
        <div className={styles.head}>
          <Text size={14} theme={400} className={styles.token}>
            <CurrencyIcon currency={"Cluster"} width={20} height={20} /> CLR-LP
          </Text>
          <Text size={12} theme={400} className={styles.balance}>
            Available: <span>{formatCoin(1.06)}</span>
          </Text>
        </div>
        <CustomInput
          className={styles.input}
          value={value1}
          USDValue={formatUSD(Number(value1) * 1.2)}
          onClickMax={() => setValue1("1000.00")}
          placeholder={"0.00"}
          onChange={(e) => setValue1(e.target.value)}
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
