import * as React from 'react';
import { ModalLayout } from '@/components/Modals/ModalLayout/ModalLayout';
import { Button, ModalProps, Text, CurrencyIcon } from '@/components';
import styles from './BorrowRepay.module.scss';
import { ChainSelection } from '@/components/ChainSelection/ChainSelection';
import { CHAINS } from '@/constants';
import { Currency } from '@/types';

export type BorrowRepayProps = {
  destinationChain: {
    name: string;
    icon: Currency;
  };
  asset: {
    name: string;
    icon: Currency;
  };
  amount: string;
};

type BorrowRepay = ModalProps & {
  props: BorrowRepayProps;
};

export const BorrowRepay: React.FC<BorrowRepay> = ({ props, ...rest }) => {
  const { destinationChain, asset, amount } = props;
  const [sourceChain, setSourceChain] = React.useState(() => CHAINS[0]);

  return (
    <ModalLayout title='Repay Loan' isSwipeable {...rest}>
      <div className={styles.content}>
        <Text size={16} theme={600} className={styles.title}>
          Cross Chain Repayment
        </Text>

        {/* Source Chain (select) */}
        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Source Chain
          </Text>
          <ChainSelection
            value={sourceChain}
            onChange={setSourceChain}
            options={CHAINS}
          />
        </div>

        {/* Destination Chain (info) */}
        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Destination Chain
          </Text>
          <div className={styles.staticBox}>
            <CurrencyIcon
              currency={destinationChain.icon}
              width={24}
              height={24}
            />
            <Text size={14} theme={500}>
              {destinationChain.name}
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

        {/* Amount (info) */}
        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Amount to repay
          </Text>
          <Text size={16} theme={600}>
            {amount} {asset.name}
          </Text>
        </div>

        <Button size='large' variant='purple' className={styles.button}>
          Repay
        </Button>
      </div>
    </ModalLayout>
  );
};
