import { Connector, useConnect } from "wagmi";
import { useCallback } from "react";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  const handleConnect = useCallback(
    (connector: Connector) => {
      connect({ connector });
    },
    [connect]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {connectors.map((connector: Connector) => (
        <button
          key={connector.id}
          onClick={() => handleConnect(connector)}
          className="flex items-center justify-center w-full px-4 py-3 space-x-3 text-white bg-[#2a2636] border border-[#2e2c37] rounded-lg hover:bg-[#9969ff]/10 focus:outline-none focus:ring-2 focus:ring-[#9969ff] focus:ring-offset-2 focus:ring-offset-[#0f0e11] transition-colors"
        >
          {connector.icon && (
            <div className="w-6 h-6">
              <img
                src={connector.icon}
                alt={`${connector.name} icon`}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          )}
          <span className="text-sm font-medium">{connector.name}</span>
        </button>
      ))}
    </div>
  );
}
