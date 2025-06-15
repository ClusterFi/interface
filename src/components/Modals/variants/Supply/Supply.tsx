import * as React from "react";
import { useEffect, useState } from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Button, ModalProps, Text, CurrencyIcon } from "@/components";
import styles from "./Supply.module.scss";
import cx from "classnames";
import { AmountInput } from "@/components/AmountInput/AmountInput";
import { Currency } from "@/types";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { useAllowance } from "@/utils/evm/hooks/useAllowance";
import { useApproveToken } from "@/utils/evm/hooks/useApproveToken";
import { useSupply } from "@/utils/evm/hooks/useSupply";
import { getChainById } from "@/constants";

export type SupplyProps = {
  underlyingDecimals: number;
  underlyingBalance: string | undefined;
  underlyingAddress: `0x${string}`;
  spenderAddress: `0x${string}`;
  chain: {
    name: string;
    icon: Currency;
    chainId?: number;
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
  const walletChainId = useChainId();
  const { switchChain } = useSwitchChain();
  const account = useAccount();

  // Get the target chain ID from the chain name
  const targetChainId = React.useMemo(() => {
    if (props.chain.chainId) return props.chain.chainId;
    
    // Fallback: determine chain ID from chain name
    if (props.chain.name.toLowerCase().includes('arbitrum')) {
      return 421614; // Arbitrum Sepolia
    } else if (props.chain.name.toLowerCase().includes('ethereum') || props.chain.name.toLowerCase().includes('sepolia')) {
      return 11155111; // Ethereum Sepolia
    }
    return 11155111; // Default to Ethereum Sepolia
  }, [props.chain]);

  const isWrongNetwork = account.isConnected && walletChainId !== targetChainId;

  const handleNetworkSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: targetChainId });
    }
  };

  const handleSupply = () => {
    if (isWrongNetwork) {
      handleNetworkSwitch();
      return;
    }
    
    const parsed = parseFloat(amount);
    if (!isNaN(parsed)) {
      const multiplier = 10 ** props.underlyingDecimals;
      const value = BigInt(Math.floor(parsed * multiplier));
      supply(value);
    }
  };

  const { chain, asset } = props;

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

  const targetChain = getChainById(targetChainId);
  const currentChain = getChainById(walletChainId);

  return (
    <ModalLayout title="Supply Asset" isSwipeable {...rest}>
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Supply Asset
        </Text>
        
        {isWrongNetwork && (
          <div className={styles.networkWarning}>
            <Text size={14} theme={600} className={styles.warningTitle}>
              Wrong Network
            </Text>
            <Text size={12} theme={400} className={styles.warningText}>
              You're connected to {currentChain?.name || 'Unknown Network'}. 
              Switch to {targetChain?.name || 'Target Network'} to supply this asset.
            </Text>
          </div>
        )}
        
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

        {isWrongNetwork ? (
          <Button
            size="large"
            variant="purple"
            className={styles.button}
            onClick={handleNetworkSwitch}
          >
            Switch to {targetChain?.name || 'Target Network'}
          </Button>
        ) : needsApproval ? (
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
