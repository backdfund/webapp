import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import poolsReducer from "../state/poolsListSlice";
import lendingReducer from "../state/lendingSlice";
import userReducer from "../state/userSlice";
import errorReducer from "../state/errorSlice";
import positionsReducer from "../state/positionsSlice";
import transactionsReducer from "../state/transactionsSlice";
import uiReducer from "../state/uiSlice";
import helpReducer from "../state/helpSlice";

const rootReducer = combineReducers({
  pools: poolsReducer,
  lending: lendingReducer,
  user: userReducer,
  positions: positionsReducer,
  transactions: transactionsReducer,
  error: errorReducer,
  ui: uiReducer,
  help: helpReducer,
});

const persistConfig = {
  key: "root",
  version: 2,
  blacklist: ["error", "user", "positions", "transactions", "help", "pools"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export type Selector<T> = (state: RootState) => T;

export const persistor = persistStore(store);
