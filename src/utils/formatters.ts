
export const formatCurrency = (value: number, options?: { compact?: boolean }): string => {
  if (value === 0) return "$0.00";
  if (value < 0.01) return "<$0.01";
  
  if (options?.compact) {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    }
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`;
    }
  } else {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`;
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};


export const formatPercentage = (value: number, showSign: boolean = true): string => {
  if (value === 0) return "0.00%";
  const sign = showSign && value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};


export const formatNumber = (value: number): string => {
  if (value === 0) return "0";
  if (Math.abs(value) >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (Math.abs(value) >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  return value.toFixed(2);
};


export const formatTokenAmount = (value: number, symbol?: string): string => {
  const formatted = formatNumber(value);
  return symbol ? `${formatted} ${symbol}` : formatted;
};


export const truncateAddress = (address: string, startChars: number = 6, endChars: number = 4): string => {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

  
export const formatAPYWithColor = (value: number): { formatted: string; isPositive: boolean } => {
  return {
    formatted: formatPercentage(value),
    isPositive: value >= 0,
  };
}; 