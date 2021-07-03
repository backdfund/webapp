import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useBackd } from "../../app/hooks/use-backd";
import ContentSection from "../../components/ContentSection";
import { fetchState, selectPools, selectPrices } from "../../features/pools-list/poolsListSlice";
import { selectBalances } from "../../features/user/userSlice";
import { Pool } from "../../lib";
import Overview from "../../components/Overview";
import PoolsRow from "./PoolsRow";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
`;

const Table = styled.table`
  width: 100%;
`;

const HeaderRow = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0 1.7rem;
`;

const Header = styled.th`
  flex: 1;
  text-align: left;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
`;

const ChevronHeader = styled.th`
  width: 2.4rem;
`;

const PoolsPage = () => {
  const backd = useBackd();
  const dispatch = useDispatch();
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);
  const balances = useSelector(selectBalances);

  const getBalance = (pool: Pool) => balances[pool.lpToken.address] || 0;
  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [backd, dispatch]);

  return (
    <StyledPoolsPage>
      <ContentSection
        header="All pools"
        content={
          <Table>
            <HeaderRow>
              <Header>Asset</Header>
              <Header>APY</Header>
              <Header>TVL</Header>
              <Header>Your deposits</Header>
              <ChevronHeader />
            </HeaderRow>
            {pools.map((pool: Pool) => (
              <PoolsRow key={pool.address} pool={pool} />
            ))}
          </Table>
        }
      />
      <Overview />
    </StyledPoolsPage>
  );
};

export default PoolsPage;
