import { ContractTransaction } from "@ethersproject/contracts";
import { batch } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  parseTransactionReceipt,
  Position,
  TransactionDescription,
  TransactionInfo,
} from "./types";
import { setError } from "../state/errorSlice";
import { addTransaction, confirmTransaction } from "../state/transactionsSlice";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function formatError(err: any): string {
  return (err.data || {}).message || err.message;
}

export async function handleTransactionConfirmation(
  tx: ContractTransaction,
  txDescription: TransactionDescription,
  dispatch: AppDispatch,
  // FIXME: Parameters<AppDispatch>[0] does not seem to work with non-thunk actions
  actions: any[] = []
): Promise<void> {
  const txInfo = {
    hash: tx.hash,
    chainId: tx.chainId,
    confirmations: tx.confirmations,
    description: txDescription,
    blockNumber: tx.blockNumber,
    timestamp: tx.timestamp || new Date().getTime(),
  };

  dispatch(addTransaction(txInfo));
  tx.wait()
    .then((receipt) => {
      batch(() => {
        dispatch(confirmTransaction(parseTransactionReceipt(receipt)));
        actions.forEach((action) => dispatch(action));
      });
    })
    .catch((err) => {
      dispatch(confirmTransaction(parseTransactionReceipt(err.receipt)));
      dispatch(setError({ message: formatError(err) }));
    });
}

export const formatTransactionInfo = (txDescription: TransactionDescription): string => {
  switch (txDescription.action) {
    case "Approve":
      return `${txDescription.args?.amount.toLocaleString()} ${txDescription.args?.token.symbol}`;
    case "Deposit":
      return `${txDescription.args?.amount.toLocaleString()} ${
        txDescription.args?.pool.underlying.symbol
      }`;
    case "Withdraw":
      return `${txDescription.args?.amount.toLocaleString()} ${
        txDescription.args?.pool.lpToken.symbol
      }`;
    case "Unstake":
      return `${txDescription.args?.amount.toLocaleString()} ${
        txDescription.args?.pool.lpToken.symbol
      }`;
    case "Register": {
      const position: Position = txDescription.args?.position;
      return `${position.account.slice(0, 8)}... on ${position.protocol}`;
    }
    case "Remove": {
      const position: Position = txDescription.args?.position;
      return `${position.account.slice(0, 8)}... on ${position.protocol}`;
    }
    default:
      return "";
  }
};

export const getExplorerLink = ({
  chainId,
  hash,
}: Pick<TransactionInfo, "chainId" | "hash">): string => {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${hash}`;
    case 3:
      return `https://ropsten.etherscan.io/tx/${hash}`;
    case 42:
      return `https://kovan.etherscan.io/tx/${hash}`;
    default:
      return `https://etherscan.io/tx/${hash}`;
  }
};
