import * as React from "react";
import { useEffect, useState } from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Button, ModalProps, Text, CurrencyIcon } from "@/components";
import styles from "./Supply.module.scss";
import cx from "classnames";
import { AmountInput } from "@/components/AmountInput/AmountInput";
import { Currency } from "@/types";
import { useAccount } from "wagmi";
import { useAllowance } from "@/utils/evm/hooks/useAllowance";
import { useApproveToken } from "@/utils/evm/hooks/useApproveToken";
import { useSupply } from "@/utils/evm/hooks/useSupply";

export type SupplyProps = {
  underlyingDecimals: number;
  underlyingBalance: string | undefined;
  underlyingAddress: `0x${string}`;
  spenderAddress: `0x${string}`;
  chain: {
    name: string;
    icon: Currency;
  };
  asset: {
    name: string;
    icon: Currency;
  };
};

type Supply = ModalProps & {
  props: SupplyProps;
};

export const Supply: React.FC<Supply> = ({ props, ...rest }) => {
  const {
    supply,
    isPending: isSupplying,
    isConfirming: isSupplyingConfirming,
    hash,
  } = useSupply(props.spenderAddress);

  const [amount, setAmount] = useState("");

  const handleSupply = () => {
    const parsed = parseFloat(amount);
    if (!isNaN(parsed)) {
      const multiplier = 10 ** props.underlyingDecimals;
      const value = BigInt(Math.floor(parsed * multiplier));
      supply(value);
    }
  };

  const { chain, asset } = props;
  const account = useAccount();

  const parsedBalance = parseFloat(props.underlyingBalance || "0");
  const parsedAmount = parseFloat(amount);
  const isDisabled =
    !amount || isNaN(parsedAmount) || parsedAmount > parsedBalance;

  const { allowance, isLoading: isAllowanceLoading } = useAllowance({
    token: props.underlyingAddress,
    owner: account.address,
    spender: props.spenderAddress,
  });

  let value = BigInt(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  );
  if (!isNaN(parsedAmount)) {
    const multiplier = 10 ** props.underlyingDecimals;
    value = BigInt(Math.floor(parsedAmount * multiplier));
  }

  const needsApproval = allowance === BigInt(0);

  const {
    approve,
    isPending: isApproving,
    isConfirming: isApprovingConfirming,
  } = useApproveToken({
    token: props.underlyingAddress,
    spender: props.spenderAddress,
    amount: value,
  });

  useEffect(() => {
    if (!isSupplyingConfirming && hash) {
      rest.onOpenChange(false);
    }
  }, [isSupplyingConfirming, hash, rest]);

  return (
    <ModalLayout title="Supply Asset" isSwipeable {...rest}>
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Supply Asset
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
          <AmountInput
            value={amount}
            onChange={setAmount}
            label="Enter amount"
          />
          <Text size={12} theme={400} className={styles.balanceText}>
            Your balance: {parsedBalance.toFixed(2)} {asset.name}
          </Text>
        </div>

        {needsApproval ? (
          <Button
            size="large"
            variant="purple"
            className={styles.button}
            onClick={approve}
            disabled={isApproving || isApprovingConfirming}
          >
            {isApproving
              ? "Waiting for Wallet..."
              : isApprovingConfirming
                ? "Confirming..."
                : "Approve"}
          </Button>
        ) : (
          <Button
            size="large"
            variant="purple"
            className={styles.button}
            disabled={isDisabled || isSupplying || isSupplyingConfirming}
            onClick={handleSupply}
          >
            {isSupplying
              ? "Waiting for Wallet..."
              : isSupplyingConfirming
                ? "Confirming..."
                : "Supply"}
          </Button>
        )}
      </div>
    </ModalLayout>
  );
};
