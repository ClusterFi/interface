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
import {
  ChainSelection,
  TChain,
} from '@/components/ChainSelection/ChainSelection';
import { AmountInput } from '@/components/AmountInput/AmountInput';

export type BorrowProps = null;

type Borrow = ModalProps & {
  props: BorrowProps;
};

const CHAINS: TChain[] = [
  {
    id: 'eth',
    name: 'Ethereum',
    fullName: 'Ethereum Mainnet',
    icon: 'Ethereum',
  },
  { id: 'arb', name: 'Arbitrum', fullName: 'Arbitrum One', icon: 'Arbitrum' },
  { id: 'matic', name: 'Polygon', fullName: 'Polygon PoS', icon: 'Polygon' },
];

export const Borrow: React.FC<Borrow> = ({ props, ...rest }) => {
  const [source, setSource] = React.useState(CHAINS[0]);
  const [destination, setDestination] = React.useState(CHAINS[1]);
  const [selectedChain, setSelectedChain] = React.useState<TChain>(CHAINS[0]);
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

        <div className={styles.field}>
          <Text size={14} theme={400} className={styles.label}>
            Source Chain
          </Text>
          <ChainSelection
            value={source}
            onChange={setSource}
            options={CHAINS}
          />
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
