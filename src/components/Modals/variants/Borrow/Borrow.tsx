import * as React from "react";
import { ModalLayout } from "@/components/Modals/ModalLayout/ModalLayout";
import { Button, ModalProps, Text, CurrencyIcon } from "@/components";
import styles from "./Borrow.module.scss";
import cx from "classnames";
import { ChainSelection } from "@/components/ChainSelection/ChainSelection";
import { AmountInput } from "@/components/AmountInput/AmountInput";
import {
  ARBITRUM_CHAIN_ID,
  CHAINS,
  getChainById,
  SEPOLIA_CHAIN_ID,
} from "@/constants";
import { Currency } from "@/types";
import { useAccount } from "wagmi";
import { useBorrow } from "@/utils/evm/hooks/useBorrow";
import { useModalsStore } from "@/utils/stores";
import { parseUnits } from "viem";
import { Confirming } from "@/components/shared/Confirming/Confirming";
import { useEffect } from "react";

const getLayerZeroEid = (chainId: number): number => {
  switch (chainId) {
    case SEPOLIA_CHAIN_ID:
      return 40161;
    case ARBITRUM_CHAIN_ID:
      return 40231;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

export type BorrowProps = {
  cb: () => void;
  sourceChain: {
    name: string;
    icon: Currency;
    chainId: number;
    cTokenAddress: `0x${string}`;
  };
  destinationChain: {
    name: string;
    icon: Currency;
    chainId: number;
  };
};

type Borrow = ModalProps & {
  props: BorrowProps;
};

export const Borrow: React.FC<Borrow> = ({ props, ...rest }) => {
  const [source, setSource] = React.useState(
    getChainById(props.sourceChain.chainId) ?? CHAINS[0],
  );
  const [destination, setDestination] = React.useState(
    getChainById(props.destinationChain.chainId) ?? CHAINS[1],
  );
  const [amount, setAmount] = React.useState("");

  const account = useAccount();

  const {
    borrow,
    borrowCrossChain,
    isPending,
    isConfirming,
    hash,
    status: borrowStatus,
  } = useBorrow(props.sourceChain.cTokenAddress);

  const { closeModal } = useModalsStore();

  React.useEffect(() => {
    if (!isConfirming && hash) {
      closeModal();
    }
  }, [hash, closeModal, isConfirming]);

  const openPosition = async () => {
    if (!amount) return;

    try {
      if (destination.chainId === source.chainId) {
        await borrow(amount);
      } else {
        const dstEid = getLayerZeroEid(destination.chainId);

        console.log("=== Cross-chain Borrow Parameters ===");
        console.log("Amount:", amount);
        console.log("Destination EID:", dstEid);
        console.log("Recipient:", account.address);
        console.log("Options:", '""');
        console.log("Gas Value (ETH):", "0.1");

        await borrowCrossChain(
          amount,
          dstEid,
          account.address as `0x${string}`,
          "",
          parseUnits("0.1", 18), // 0.1 ETH for gas fees
        );
      }
    } catch (err) {
      console.error("Borrow failed:", err);
    }
  };

  useEffect(() => {
    if (borrowStatus === "success") {
      if (typeof props.cb === "function") {
        props.cb();
      }
    }
  }, [props, props.cb, borrowStatus]);

  return (
    <ModalLayout title="Cross-Chain Borrow" isSwipeable {...rest}>
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Cross-Chain Borrow
        </Text>

        <div className={styles.staticField}>
          <Text size={14} theme={400} className={styles.label}>
            Chain
          </Text>
          <div className={styles.staticBox}>
            <CurrencyIcon
              currency={props.sourceChain.icon}
              width={24}
              height={24}
            />
            <Text size={14} theme={500}>
              {props.sourceChain.name}
            </Text>
          </div>
        </div>

        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Destination Chain
          </Text>
          <ChainSelection
            value={destination}
            onChange={setDestination}
            options={CHAINS}
          />
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
        </div>

        <Button
          size="large"
          variant="purple"
          className={styles.button}
          onClick={openPosition}
          disabled={isPending || isConfirming}
        >
          {isPending ? (
            "Waiting for Wallet..."
          ) : isConfirming ? (
            <Confirming />
          ) : (
            "Open Position"
          )}
        </Button>
      </div>
    </ModalLayout>
  );
};
