import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

import { AppThunk, RootState } from "../app/store";
import { Pool } from "../lib";
import { Backd } from "../lib/backd";
import { Address, fromPlainBalances, Optional, Prices } from "../lib/types";
import { fetchLoans } from "./lendingSlice";
import { INFURA_ID } from "../lib/constants";
import { createBackd } from "../lib/factory";
import { fetchPositions } from "./positionsSlice";
import { fetchAllowances, fetchBalances, fetchWithdrawalFees } from "./userSlice";

interface PoolsState {
  pools: Pool[];
  prices: Prices;
  loaded: boolean;
}

const initialState: PoolsState = {
  pools: [],
  loaded: false,
  prices: {},
};

export const fetchPool = createAsyncThunk(
  "pool/fetch",
  async ({ backd, poolAddress }: { backd: Backd; poolAddress: string }) => {
    return backd.getPoolInfo(poolAddress);
  }
);

export const fetchPrices = createAsyncThunk(
  "pool/fetch-prices",
  async ({ backd, pools }: { backd: Backd; pools: Pool[] }) => {
    return backd.getPrices(pools.map((p) => p.underlying.symbol));
  }
);

export const fetchPools = createAsyncThunk("pool/fetch-all", ({ backd }: { backd: Backd }) =>
  backd.listPools()
);

export const poolsSlice = createSlice({
  name: "pools",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPools.fulfilled, (state, action) => {
      state.pools = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchPool.fulfilled, (state, action) => {
      const index = state.pools.findIndex((pool) => pool.address === action.payload.address);
      if (index >= 0) {
        state.pools[index] = action.payload;
      } else {
        state.pools.push(action.payload);
      }
    });

    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      state.prices = action.payload;
    });
  },
});

export const fetchState =
  (backd: Backd): AppThunk =>
  (dispatch) => {
    backd.currentAccount().then((address: Address) => dispatch(fetchLoans({ backd, address })));
    dispatch(fetchPools({ backd })).then((v) => {
      if (v.meta.requestStatus !== "fulfilled") return;
      const pools = v.payload as Pool[];
      dispatch(fetchBalances({ backd, pools }));
      dispatch(fetchPrices({ backd, pools }));
      dispatch(fetchAllowances({ backd, pools }));
      dispatch(fetchWithdrawalFees({ backd, pools }));
    });
    dispatch(fetchPositions({ backd }));
  };

export const fetchPreviewState = (): AppThunk => (dispatch) => {
  const provider = new ethers.providers.InfuraProvider(1, INFURA_ID);
  const backd = createBackd(provider, { chainId: 1 });
  dispatch(fetchPools({ backd })).then((v) => {
    if (v.meta.requestStatus !== "fulfilled") return;
    const pools = v.payload as Pool[];
    dispatch(fetchPrices({ backd, pools }));
  });
};

export const selectPoolsLoaded = (state: RootState): boolean => state.pools.loaded;

export const selectPools = (state: RootState): Optional<Pool[]> =>
  state.pools.loaded ? state.pools.pools : null;

export const selectDepositedPools = (state: RootState): Optional<Pool[]> =>
  state.pools.loaded
    ? state.pools.pools.filter(
        (pool: Pool) => !fromPlainBalances(state.user.balances)[pool.lpToken.address]?.isZero()
      )
    : null;

export const selectPrices = (state: RootState): Prices => state.pools.prices;

export const selectEthPrice = (state: RootState): Optional<number> => state.pools.prices.ETH;

export const selectAverageApy = (state: RootState): Optional<number> =>
  state.pools.pools.reduce((a: number, b: Pool) => a + b.apy, 0) / state.pools.pools.length;

export default poolsSlice.reducer;
