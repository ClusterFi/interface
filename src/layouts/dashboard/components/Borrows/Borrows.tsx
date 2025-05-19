import * as React from 'react';

import { Accordion, Heading, Icon, Section, Table, Text } from '@/components';
import { CommonInfo } from '../CommonInfo/CommonInfo';
import { BorrowItem } from './BorrowItem';
import styles from './Borrows.module.scss';
import { Currency } from '@/types';
import { BorrowItemOverall } from './BorrowItemOverall';
import Image from 'next/image';
import { ComponentState } from '../helpers';
import { useGetAllMarkets } from '@/utils/evm/hooks/useGetAllMarkets';

type TAsset = {
  id: string;
  name: string;
  currency: Currency;
};

const assets: TAsset[] = [
  {
    id: '0',
    name: 'weETH',
    currency: 'WrappedEETH',
  },
];

type BorrowsProps = {
  state: ComponentState;
};

export const Borrows: React.FC<BorrowsProps> = ({ state }) => {
  type Address = `0x${string}`;

  const { data, isPending, error } = useGetAllMarkets();

  const addresses = (data ?? []) as Address[];
  return (
    <div className={styles.base}>
      {state === 'empty' ? (
        <Section containerClassName={styles.empty}>
          <Image
            src={'/empty-borrows.png'}
            alt='empty-borrows'
            width={62}
            height={60}
            quality={100}
          />
          <Heading element='h4' className={styles.emptyTitle}>
            Nothing borrowed yet
          </Heading>
        </Section>
      ) : (
        <Accordion defaultOpen title='Your borrows'>
          <CommonInfo />
          <Table className={styles.table}>
            <Table.Head>
              <Table.Row>
                <Table.Item>Asset</Table.Item>
                <Table.Item>Borrows</Table.Item>
                <Table.Item>APY</Table.Item>
                <Table.Item></Table.Item>
              </Table.Row>
            </Table.Head>
            <Table.Body className={styles.body}>
              {assets.map((asset) => {
                return (
                  <BorrowItem
                    currency={asset.currency}
                    name={asset.name}
                    key={asset.id}
                  />
                );
              })}
            </Table.Body>
          </Table>
        </Accordion>
      )}
      <Accordion defaultOpen title='Assets to borrow'>
        <Table className={styles.table}>
          <Table.Head>
            <Table.Row>
              <Table.Item>Asset</Table.Item>
              <Table.Item title='some info'>
                Avaliable
                <Icon glyph='Info' width={10} height={10} />
              </Table.Item>
              <Table.Item title='some info'>
                APY, borrow rate
                <Icon glyph='Info' width={10} height={10} />
              </Table.Item>
              <Table.Item></Table.Item>
            </Table.Row>
          </Table.Head>
          <Table.Body className={styles.body}>
            {addresses.map((address) => {
              return <BorrowItemOverall key={address} address={address} />;
            })}
          </Table.Body>
        </Table>
        {/*   <Table className={styles.table}>
          <Table.Head>
            <Table.Row>
              <Table.Item>Asset</Table.Item>
              <Table.Item title='some info'>
                Avaliable
                <Icon glyph='Info' width={10} height={10} />
              </Table.Item>
              <Table.Item title='some info'>
                APY, borrow rate
                <Icon glyph='Info' width={10} height={10} />
              </Table.Item>
              <Table.Item></Table.Item>
            </Table.Row>
          </Table.Head>
          <Table.Body className={styles.body}> */}
        {/*  {Array.from({ length: 7 }, () => assets[0]).map((asset) => {
              return (
                <BorrowItemOverall
                  currency={asset.currency}
                  name={asset.name}
                  key={asset.id}
                />
              );
            })} */}
        {/*  {addresses.map((asset) => {
              return (
                <BorrowItemOverall
                  currency={'Ethereum'}
                  name={asset}
                  key={asset}
                />
              );
            })} */}
        {/*    </Table.Body>
        </Table> */}
      </Accordion>
    </div>
  );
};
