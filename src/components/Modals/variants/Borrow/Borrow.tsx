import * as React from 'react';
import { ModalLayout } from '@/components/Modals/ModalLayout/ModalLayout';
import {
  Button,
  ModalProps,
  Text,
  Icon,
  CurrencyIcon,
  CurrencySelection,
} from '@/components';
import styles from './Borrow.module.scss';
import cx from 'classnames';
import { ChainSelection } from '@/components/ChainSelection/ChainSelection';
import { AmountInput } from '@/components/AmountInput/AmountInput';
import { CHAINS } from '@/constants';
import { Currency } from '@/types';
import { prop } from '@/utils/media/helpers';

export type BorrowProps = {
  chain: {
    name: string;
    icon: Currency;
  };
};

type Borrow = ModalProps & {
  props: BorrowProps;
};

export const Borrow: React.FC<Borrow> = ({ props, ...rest }) => {
  const [source, setSource] = React.useState(CHAINS[0]);
  const [destination, setDestination] = React.useState(CHAINS[1]);
  const [selectedChain, setSelectedChain] = React.useState(CHAINS[0]);
  const [amount, setAmount] = React.useState('');

  const [openSource, setOpenSource] = React.useState(false);
  const [openDestination, setOpenDestination] = React.useState(false);

  const toggleSource = () => setOpenSource((prev) => !prev);
  const toggleDestination = () => setOpenDestination((prev) => !prev);

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
            <CurrencyIcon currency={props.chain.icon} width={24} height={24} />
            <Text size={14} theme={500}>
              {props.chain.name}
            </Text>
          </div>
        </div>

        {/* Destination Chain */}
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

        {/* Amount */}
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

        <Button size='large' variant='purple' className={styles.button}>
          Open Position
        </Button>
      </div>
    </ModalLayout>
  );
};
