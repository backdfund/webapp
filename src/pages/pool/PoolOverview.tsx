import React from "react";
import { useSelector } from "react-redux";
import { Pool } from "../../lib";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import Overview from "../../components/Overview";
import { selectPrice } from "../../features/pool/selectors";
import { formatCurrency, formatPercent } from "../../lib/numeric";

interface Props {
  pool: Pool;
}

const PoolOverview = ({ pool }: Props) => {
  const price = useSelector(selectPrice(pool));
  const locked = pool.totalAssets * price;

  return (
    <Overview
      header="Pool Overview"
      rows={[
        {
          label: "Pool TVL",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: formatCurrency(locked),
        },
        {
          label: "APY",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: formatPercent(pool.apy),
        },
        {
          label: "Strategy",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: pool.name,
        },
      ]}
    />
  );
};

export default PoolOverview;
