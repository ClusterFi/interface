import * as React from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Button, ModalProps, Text, CurrencyIcon } from "@/components";
import styles from "./Withdraw.module.scss";
import cx from "classnames";
import { AmountInput } from "@/components/AmountInput/AmountInput";
import { Currency } from "@/types";
import { formatUnits } from "viem";
import { useRedeem } from "@/utils/evm/hooks/useRedeem";
import { useModalsStore } from "@/utils/stores";

export type WithdrawProps = {
  chain: {
    name: string;
    icon: Currency;
  };
  asset: {
    name: string;
    icon: Currency;
  };
  amount: bigint;
  marketInfo: {
    cTokenDecimals: number;
    underlyingDecimals: number;
    name: string;
  };
  cTokenAddress: `0x${string}`;
};

type Withdraw = ModalProps & {
  props: WithdrawProps;
};

export const Withdraw: React.FC<Withdraw> = ({ props, ...rest }) => {
  const { chain, asset, amount, marketInfo, cTokenAddress } = props;
  const [inputAmount, setInputAmount] = React.useState("");
  const { redeem, isPending, isConfirming, hash } = useRedeem(cTokenAddress);
  const { closeModal } = useModalsStore();

  const supply = Number(formatUnits(amount, marketInfo.cTokenDecimals));
  const parsedAmount = parseFloat(inputAmount);
  const isDisabled =
    !inputAmount ||
    isNaN(parsedAmount) ||
    parsedAmount > supply ||
    isPending ||
    isConfirming;

  React.useEffect(() => {
    if (hash) {
      closeModal();
    }
  }, [hash, closeModal]);

  const handleWithdraw = async () => {
    if (isDisabled) return;
    await redeem(inputAmount, marketInfo.underlyingDecimals);
  };

  const handleMaxClick = () => {
    setInputAmount(supply.toFixed(marketInfo.cTokenDecimals));
  };

  return (
    <ModalLayout title="Withdraw Asset" isSwipeable {...rest}>
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Withdraw Asset
        </Text>
        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Chain
          </Text>
          <div className={styles.staticBox}>
            <CurrencyIcon currency={chain.icon} width={24} height={24} />
            <Text size={14} theme={500}>
              {chain.name}
            </Text>
          </div>
        </div>
        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Asset
          </Text>
          <div className={styles.staticBox}>
            <CurrencyIcon currency={asset.icon} width={24} height={24} />
            <Text size={14} theme={500}>
              {asset.name}
            </Text>
          </div>
        </div>
        <div className={cx("base", styles.inputWrapper)}>
          <div className="head">
            <Text size={14} theme={400} className="title">
              Amount
            </Text>
          </div>
          <div className={styles.inputContainer}>
            <AmountInput
              value={inputAmount}
              onChange={setInputAmount}
              label="Enter amount"
            />
            <Button
              size="small"
              variant="stroke"
              onClick={handleMaxClick}
              disabled={isPending || isConfirming}
              className={styles.maxButton}
            >
              <Text size={12} theme={500}>
                MAX
              </Text>
            </Button>
          </div>
          <Text size={12} theme={400} className={styles.balanceText}>
            Your supplies: {supply.toFixed(2)} {asset.name}
          </Text>
        </div>

        <Button
          size="large"
          variant="purple"
          className={styles.button}
          disabled={isDisabled}
          onClick={handleWithdraw}
        >
          {isPending
            ? "Processing..."
            : isConfirming
              ? "Confirming..."
              : "Withdraw"}
        </Button>
      </div>
    </ModalLayout>
  );
};
