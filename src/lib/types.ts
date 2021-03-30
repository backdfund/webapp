export type Optional<T> = T | null;

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Pool<Num = number> {
  name: string;
  address: string;
  lpToken: Token;
  underlying: Token;
  apy: Num;
  totalAssets: Num;
  exchangeRate: Num;
}

export interface Position<Num = number> {
  key: string; // key should be a hash of (protocol, threshold, account)
  protocol: string;
  account: Address;
  threshold: Num;
  singleTopUp: Num;
  totalTopUp: Num;
}

export function transformPool<T, U>(pool: Pool<T>, f: (v: T) => U): Pool<U> {
  return {
    ...pool,
    apy: f(pool.apy),
    totalAssets: f(pool.totalAssets),
    exchangeRate: f(pool.exchangeRate),
  };
}

export function transformPosition<T, U>(position: Position<T>, f: (v: T) => U): Position<U> {
  return {
    key: position.key,
    protocol: position.protocol,
    account: position.account,
    threshold: f(position.threshold),
    singleTopUp: f(position.singleTopUp),
    totalTopUp: f(position.totalTopUp),
  };
}

export type Address = string;

export type UserBalances<Num = number> = Record<string, Num>;
export type Prices<Num = number> = Record<string, Num>;
