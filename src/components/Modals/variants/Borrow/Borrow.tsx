import * as React from 'react';
import { ModalLayout } from '@/components/Modals/ModalLayout/ModalLayout';
import {
  Button,
  ModalProps,
  Text,
  CurrencyIcon,
} from '@/components';
import styles from './Borrow.module.scss';
import cx from 'classnames';
import { ChainSelection } from '@/components/ChainSelection/ChainSelection';
import { AmountInput } from '@/components/AmountInput/AmountInput';
import { CHAINS, getChainById } from '@/constants';
import { Currency } from '@/types';
import { useAccount } from 'wagmi';
import { useBorrow } from '@/utils/evm/hooks/useBorrow';
import { useModalsStore } from '@/utils/stores';
import {parseUnits} from "viem";

export type BorrowProps = {
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
      getChainById(props.sourceChain.chainId) ?? CHAINS[0]
  );
  const [destination, setDestination] = React.useState(
      getChainById(props.destinationChain.chainId) ?? CHAINS[1]
  );
  const [amount, setAmount] = React.useState('');

  const account = useAccount();
  const { borrow, borrowCrossChain, isPending, isConfirming, hash } = useBorrow(props.sourceChain.cTokenAddress);
  const { closeModal } = useModalsStore();

  React.useEffect(() => {
    if (hash) {
      closeModal();
    }
  }, [hash, closeModal]);

  const openPosition = async () => {
    if (!amount) return;

    try {
      if (destination.chainId === source.chainId) {
        await borrow(amount);
      } else {
        await borrowCrossChain(
            amount,
            destination.chainId,
            account.address as `0x${string}`,
            '0x',
            BigInt(0)
        );
      }
    } catch (err) {
      console.error('Borrow failed:', err);
    }
  };

  return (
      <ModalLayout title='Cross-Chain Borrow' isSwipeable {...rest}>
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

          <div className={cx('base', styles.inputWrapper)}>
            <div className='head'>
              <Text size={14} theme={400} className='title'>
                Amount
              </Text>
            </div>
            <AmountInput
                value={amount}
                onChange={setAmount}
                label='Enter amount'
            />
          </div>

          <Button
              size='large'
              variant='purple'
              className={styles.button}
              onClick={openPosition}
              disabled={isPending || isConfirming}
          >
            {isPending ? 'Processing...' : isConfirming ? 'Confirming...' : 'Open Position'}
          </Button>
        </div>
      </ModalLayout>
  );
};
