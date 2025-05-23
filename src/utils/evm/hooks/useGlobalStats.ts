import { useEffect, useState } from 'react';
import {NetworkStats, HookParams} from "@/types";
import {getNetworkStats} from "@/utils/helpers/getNetworkStats";


export function useGlobalStats({
                                   userAddress,
                                   comptrollerAddress,
                                   asset,
                                   client,
                               }: HookParams) {
    const [data, setData] = useState<NetworkStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchStats() {
            try {
                setLoading(true);

                const networkStats = await getNetworkStats({ userAddress, comptrollerAddress, asset, client });

                if (!cancelled) {
                    setData(networkStats);
                }
            } catch (err) {
                if (!cancelled) setError(err as Error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchStats();

        return () => {
            cancelled = true;
        };
    }, [userAddress, comptrollerAddress, asset.cTokenAddress]);

    return { data, loading, error };
}
