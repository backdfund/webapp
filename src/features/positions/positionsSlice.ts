import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Pool } from "../../lib";
import { Backd } from "../../lib/backd";
import { Position } from "../../lib/types";
import { handleTransactionConfirmation } from "../transactions-list/transactionsUtils";
import { fetchAllowances, fetchBalances } from "../user/userSlice";

type PositionsState = Position[];

const initialState: PositionsState = [];

export const fetchPositions = createAsyncThunk("positions/fetch", ({ backd }: { backd: Backd }) =>
  backd.getPositions()
);

export const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPositions.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

type RegisterArgs = { backd: Backd; pool: Pool; position: Position };
type RemoveArgs = { backd: Backd; pool: Pool; position: Position };

export const registerPosition = createAsyncThunk(
  "positions/register",
  async ({ backd, pool, position }: RegisterArgs, { dispatch }) => {
    const tx = await backd.registerPosition(pool, position);
    handleTransactionConfirmation(tx, { action: "Register", args: { pool, position } }, dispatch, [
      fetchPositions({ backd }),
      fetchBalances({ backd, pools: [pool] }),
      fetchAllowances({ backd, pools: [pool] }),
    ]);
    return tx.hash;
  }
);

export const removePosition = createAsyncThunk(
  "positions/remove",
  async ({ backd, pool, position }: RemoveArgs, { dispatch }) => {
    const tx = await backd.removePosition(position.account, position.protocol);
    handleTransactionConfirmation(tx, { action: "Remove", args: { position } }, dispatch, [
      fetchPositions({ backd }),
      fetchBalances({ backd, pools: [pool] }),
      fetchAllowances({ backd, pools: [pool] }),
    ]);
    return tx.hash;
  }
);

export const selectPositions = (state: RootState) => state.positions;

export function selectPoolPositions(pool: Pool): (state: RootState) => Position[] {
  return (state: RootState) =>
    state.positions.filter((p) => p.actionToken === pool.underlying.address);
}

export default positionsSlice.reducer;
