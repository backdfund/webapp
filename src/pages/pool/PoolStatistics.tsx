import React from "react";
import { useSelector } from "react-redux";
import Statistics from "../../components/Statistics";
import { Pool, Position } from "../../lib/types";
import { selectPrice } from "../../features/pool/selectors";
import { selectBalance } from "../../features/user/userSlice";
import { selectPoolPositions } from "../../features/positions/positionsSlice";
import { formatCurrency } from "../../lib/numeric";
import { TokenValue } from "../../lib/token-value";

type Props = {
  pool: Pool;
};

const PoolStatistics = ({ pool }: Props) => {
  const price = useSelector(selectPrice(pool));
  const balance = useSelector(selectBalance(pool));
  const positions = useSelector(selectPoolPositions(pool));

  const locked = positions.reduce(
    (a: TokenValue, b: Position) => a.add(b.maxTopUp.multiplyByPrice(price)),
    new TokenValue()
  );
  const deposits = locked.add(balance.multiplyByPrice(price));

  return (
    <Statistics
      statistics={[
        {
          header: "Your deposits",
          tooltip: "The current value of your assets held in Backd liquidity pools",
          value: formatCurrency(Number(deposits.toString())),
        },
        {
          header: "Locked in position",
          tooltip:
            "The current value of your assets registered for top-ups (liquidation protection)",
          value: formatCurrency(Number(locked.toString())),
        },
        // {
        //   header: "Rewards accrued",
        //   tooltip: "The current value of earned rewards that have yet to be claimed",
        //   value: formatCurrency(0),
        // },
      ]}
    />
  );
};

export default PoolStatistics;
