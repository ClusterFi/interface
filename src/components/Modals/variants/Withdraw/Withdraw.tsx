import * as React from 'react';
import { ModalLayout } from '@/components/Modals/ModalLayout/ModalLayout';
import { Button, ModalProps, Text, CurrencyIcon } from '@/components';
import styles from './Withdraw.module.scss';
import cx from 'classnames';
import { AmountInput } from '@/components/AmountInput/AmountInput';
import { Currency } from '@/types';

export type WithdrawProps = {
  chain: {
    name: string;
    icon: Currency;
  };
  asset: {
    name: string;
    icon: Currency;
  };
  supply: number;
};

type Withdraw = ModalProps & {
  props: WithdrawProps;
};

export const Withdraw: React.FC<Withdraw> = ({ props, ...rest }) => {
  const { chain, asset, supply } = props;
  const [amount, setAmount] = React.useState('');

  const parsedAmount = parseFloat(amount);
  const isDisabled = !amount || isNaN(parsedAmount) || parsedAmount > supply;

  return (
    <ModalLayout title='Withdraw Asset' isSwipeable {...rest}>
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Withdraw Asset
        </Text>

        {/* Chain */}
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

        {/* Asset */}
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
            Your supplies: {supply.toFixed(2)} {asset.name}
          </Text>
        </div>

        <Button
          size='large'
          variant='purple'
          className={styles.button}
          disabled={isDisabled}
        >
          Withdraw
        </Button>
      </div>
    </ModalLayout>
  );
};
