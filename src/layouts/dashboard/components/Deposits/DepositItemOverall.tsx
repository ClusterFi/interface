import * as React from 'react';
import { Table, Button, Text, Icon } from '@/components';
import styles from './Deposits.module.scss';
import { useMarketInfo } from '@/utils/evm/hooks/useMarketInfo';
import { Currency } from '@/types';
import { useModalsStore } from '@/utils/stores';
import { useAccount, useBalance } from 'wagmi';
import { getChainById } from '@/constants';
import {CONTRACT_ADDRESSES} from "@/utils/evm/contracts";
import {useCheckCollateralMembership} from "@/utils/evm/hooks/useCheckCollateralMembership";
import Skeleton from 'react-loading-skeleton';

type DepositItemOverallProps = {
  address: `0x${string}`;
  chainId: number;
};

export const DepositItemOverall: React.FC<DepositItemOverallProps> = ({
  address,
  chainId,
}) => {
  const { data: marketInfo, isPending, error } = useMarketInfo(address, chainId);
  const { openModal } = useModalsStore();
  const user = useAccount();
  const account = useAccount();
  const result = useBalance({
    address: user.address,
    token: marketInfo?.underlying,
    chainId: chainId,
  });

  const directUSDCBalance = useBalance({
    address: user.address,
    token: chainId === 11155111 
      ? CONTRACT_ADDRESSES.sepolia.USDC as `0x${string}`
      : CONTRACT_ADDRESSES.arbitrum_sepolia.USDC as `0x${string}`,
    chainId: chainId,
  });

  const chainInfo = getChainById(chainId);

  React.useEffect(() => {
    const expectedUSDC = chainId === 11155111 
      ? CONTRACT_ADDRESSES.sepolia.USDC 
      : CONTRACT_ADDRESSES.arbitrum_sepolia.USDC;
    
    console.log('DepositItemOverall Debug:', {
      chainId,
      cTokenAddress: address,
      underlyingToken: marketInfo?.underlying,
      expectedUSDC,
      isCorrectUSDC: marketInfo?.underlying === expectedUSDC,
      marketInfo,
      balanceResult: result.data,
      directUSDCBalance: directUSDCBalance.data,
      userAddress: user.address,
    });
  }, [chainId, address, marketInfo, result.data, directUSDCBalance.data, user.address]);

  const getComptrollerAddress = (chainId: number): `0x${string}` => {
    if (chainId === 11155111) { 
      return CONTRACT_ADDRESSES.sepolia.comptroller as `0x${string}`;
    } else if (chainId === 421614) {
      return CONTRACT_ADDRESSES.arbitrum_sepolia.comptroller as `0x${string}`;
    }
    return CONTRACT_ADDRESSES.sepolia.comptroller as `0x${string}`;
  };

  const { isMember, isLoading } = useCheckCollateralMembership(
      getComptrollerAddress(chainId),
      account.address as `0x${string}`,
      address,
      chainId
  );

  return (
    <Table.Row className={styles.row}>
      <Table.ItemAsset
        currency={marketInfo?.name as Currency}
        primaryText={marketInfo && marketInfo.name}
      />
      <Table.Item mobileTitle={'Wallet balance'}>
        {result.data?.formatted
          ? `${result.data.formatted} ${marketInfo?.symbol}`
          : '—'}
      </Table.Item>
      <Table.Item mobileTitle={'APY'}>{marketInfo?.supplyAPY.toFixed(2)}%</Table.Item>
      <Table.Item mobileTitle="Can be collateral">
          {isLoading ? (
              <Skeleton width={16} height={16} />
          ) : isMember ? (
              <Icon glyph="Check" width={16} height={16} className={styles.check} />
          ) : (
              <Icon glyph="Cross" width={16} height={16} className={styles.cross} />
          )}
      </Table.Item>
      <Table.Item>
        {marketInfo && (
          <Button
            className={styles.button}
            size={'small'}
            variant={'purple'}
            onClick={() =>
              account.isConnected
                ? openModal('Supply', {
                    underlyingDecimals: result.data?.decimals!,
                    underlyingBalance: result.data?.formatted,
                    underlyingAddress: marketInfo.underlying,
                    spenderAddress: address,
                    chain: {
                      name: chainInfo?.name!,
                      icon: chainInfo?.currency!,
                    },
                    asset: {
                      name: marketInfo.name,
                      icon: marketInfo.symbol as Currency,
                    },
                  })
                : openModal('ConnectWallet', null)
            }
          >
            <Text size={12} theme={500}>
              {account.isConnected ? 'Supply' : 'Connect'}
            </Text>
          </Button>
        )}
      </Table.Item>
    </Table.Row>
  );
};
