import * as React from 'react';
import { ModalLayout } from '@/components/Modals/ModalLayout/ModalLayout';
import { Button, ModalProps, Text, CurrencyIcon } from '@/components';
import styles from './Supply.module.scss';
import cx from 'classnames';
import { AmountInput } from '@/components/AmountInput/AmountInput';
import { Currency } from '@/types';
import { useAccount } from 'wagmi';
import { useAllowance } from '@/utils/evm/hooks/useAllowance';
import { useApproveToken } from '@/utils/evm/hooks/useApproveToken'; // <== dodaj ten hook

export type SupplyProps = {
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
  const { chain, asset } = props;
  const [amount, setAmount] = React.useState('');
  const fixedBalance = 123.45;
  const account = useAccount();

  const parsedAmount = parseFloat(amount);
  const isDisabled =
    !amount || isNaN(parsedAmount) || parsedAmount > fixedBalance;

  const { allowance, isLoading: isAllowanceLoading } = useAllowance({
    token: props.underlyingAddress,
    owner: account.address,
    spender: props.spenderAddress,
  });

  const needsApproval = allowance === BigInt(0);
  const {
    approve,
    isPending: isApproving,
    isConfirming: isApprovingConfirming,
  } = useApproveToken({
    token: props.underlyingAddress,
    spender: props.spenderAddress,
  });

  return (
    <ModalLayout title='Supply Asset' isSwipeable {...rest}>
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Supply Asset
        </Text>

        {/* Chain info */}
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

        {/* Asset info */}
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

        {/* Amount input */}
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
          <Text size={12} theme={400} className={styles.balanceText}>
            Your balance: {fixedBalance.toFixed(2)} {asset.name}
          </Text>
        </div>

        {needsApproval ? (
          <Button
            size='large'
            variant='purple'
            className={styles.button}
            onClick={approve}
            disabled={isApproving || isApprovingConfirming}
          >
            {isApproving
              ? 'Waiting for Wallet...'
              : isApprovingConfirming
                ? 'Confirming...'
                : 'Approve'}
          </Button>
        ) : (
          <Button
            size='large'
            variant='purple'
            className={styles.button}
            disabled={isDisabled}
          >
            Supply
          </Button>
        )}
      </div>
    </ModalLayout>
  );
};
