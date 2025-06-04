import React from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { useGlobalStore } from '@/utils/stores';
import { getChainById, CHAINS } from '@/constants';
import { Button, Text, Icon } from '@/components';
import styles from './NetworkMismatchWarning.module.scss';

export const NetworkMismatchWarning: React.FC = () => {
  const { isConnected } = useAccount();
  const walletChainId = useChainId(); 
  const { chainId: appChainId, setChainId } = useGlobalStore(); 
  const { switchChain } = useSwitchChain();
  const [isDismissed, setIsDismissed] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('networkMismatchDismissed') === 'true';
    }
    return false;
  });

  const showWarning = isConnected && walletChainId !== appChainId && !isDismissed;

  const isWalletChainSupported = CHAINS.some(chain => chain.chainId === walletChainId);

  React.useEffect(() => {
    if (walletChainId === appChainId && isDismissed) {
      setIsDismissed(false);
      localStorage.removeItem('networkMismatchDismissed');
    }
  }, [walletChainId, appChainId, isDismissed]);

  React.useEffect(() => {
    console.log('NetworkMismatchWarning Debug:', {
      isConnected,
      walletChainId,
      appChainId,
      isDismissed,
      showWarning,
      isWalletChainSupported,
      walletChain: getChainById(walletChainId),
      appChain: getChainById(appChainId),
    });
  }, [isConnected, walletChainId, appChainId, isDismissed, showWarning, isWalletChainSupported]);

  if (!showWarning) return null;

  const walletChain = getChainById(walletChainId);
  const appChain = getChainById(appChainId);

  const walletNetworkName = walletChain?.name || `Chain ${walletChainId}`;
  const appNetworkName = appChain?.name || `Chain ${appChainId}`;

  const handleSwitchWalletNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: appChainId });
    }
  };

  const handleSwitchAppNetwork = () => {
    if (isWalletChainSupported) {
      setChainId(walletChainId);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('networkMismatchDismissed', 'true');
  };

  return (
    <div className={styles.warning}>
      <div className={styles.content}>
        <Icon glyph="Error" width={20} height={20} className={styles.icon} />
        <div className={styles.text}>
          <Text size={14} theme={600} className={styles.title}>
            Network Mismatch
          </Text>
          <Text size={12} theme={400} className={styles.description}>
            Your wallet is connected to <strong>{walletNetworkName}</strong>, 
            but the app is set to <strong>{appNetworkName}</strong>.
            {!isWalletChainSupported && (
              <> This network is not supported by the app.</>
            )}
          </Text>
        </div>
        <div className={styles.actions}>
          <Button
            size="small"
            variant="purple"
            onClick={handleSwitchWalletNetwork}
            className={styles.button}
          >
            <Text size={12} theme={500}>
              Switch Wallet to {appNetworkName}
            </Text>
          </Button>
          {isWalletChainSupported && (
            <Button
              size="small"
              variant="gradient-light"
              onClick={handleSwitchAppNetwork}
              className={styles.button}
            >
              <Text size={12} theme={500}>
                Use {walletNetworkName}
              </Text>
            </Button>
          )}
          <Button
            size="small"
            variant="gradient-light"
            onClick={handleDismiss}
            className={styles.dismissButton}
          >
            <Icon glyph="Cross" width={12} height={12} />
          </Button>
        </div>
      </div>
    </div>
  );
}; 