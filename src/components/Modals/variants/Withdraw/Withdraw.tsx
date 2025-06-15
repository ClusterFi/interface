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
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { getChainById } from "@/constants";

export type WithdrawProps = {
  chain: {
    name: string;
    icon: Currency;
    chainId?: number;
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

  const handleNetworkSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: targetChainId });
    }
  };

  const handleWithdraw = async () => {
    if (isWrongNetwork) {
      handleNetworkSwitch();
      return;
    }
    
    if (isDisabled) return;
    await redeem(inputAmount, marketInfo.underlyingDecimals);
  };

  const handleMaxClick = () => {
    setInputAmount(supply.toFixed(marketInfo.cTokenDecimals));
  };

  const targetChain = getChainById(targetChainId);
  const currentChain = getChainById(walletChainId);

  return (
    <ModalLayout title="Withdraw Asset" isSwipeable {...rest}>
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Withdraw Asset
        </Text>
        
        {isWrongNetwork && (
          <div className={styles.networkWarning}>
            <Text size={14} theme={600} className={styles.warningTitle}>
              Wrong Network
            </Text>
            <Text size={12} theme={400} className={styles.warningText}>
              You're connected to {currentChain?.name || 'Unknown Network'}. 
              Switch to {targetChain?.name || 'Target Network'} to withdraw this asset.
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
              disabled={isPending || isConfirming || isWrongNetwork}
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

        {isWrongNetwork ? (
          <Button
            size="large"
            variant="purple"
            className={styles.button}
            onClick={handleNetworkSwitch}
          >
            Switch to {targetChain?.name || 'Target Network'}
          </Button>
        ) : (
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
        )}
      </div>
    </ModalLayout>
  );
};
