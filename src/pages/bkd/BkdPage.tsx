import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Seo from "../../components/Seo";
import BkdSummary from "./BkdSummary";
import Overview from "../../components/Overview";
import BoostChart from "./BoostChart";
import StakeBkd from "./StakeBkd";
import StatCard, { StatCardType } from "../../components/StatCard";

const StyledBkdPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Content = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
`;

const StatContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.6rem;
`;

const InfoCards = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  margin-right: 1.6rem;

  @media (max-width: 1220px) {
    margin-right: 0;
  }
`;

const BkdPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledBkdPage>
      <Seo title={t("metadata.bkd.title")} description={t("metadata.bkd.description")} />
      <BkdSummary />
      <Container>
        <InfoCards>
          <Overview
            defaultClosed
            description={t("bkd.overview")}
            link="https://docs.backd.fund/protocol-architecture/tokenomics/token-income"
          />
          <div>
            <StakeBkd />
          </div>
        </InfoCards>
        <Content>
          <BoostChart />
          <StatContainer>
            <StatCard
              data={[1, 1, 2, 3, 5, 5, 3, 2, 1, 1]}
              labels={[1, 1, 2, 3, 5, 5, 3, 2, 1, 1].map((v: number) => v.toString())}
              type={StatCardType.HISTOGRAM}
              header={t("bkd.statistics.stkbkd.header")}
              value="312.34 stkBKD"
              subHeader="= 1000 BKD"
            />
            <StatCard
              data={[70, 30]}
              labels={["one", "two"]}
              type={StatCardType.PIE}
              header={t("bkd.statistics.boost.header")}
              value="2.6x"
              subHeader={t("bkd.statistics.boost.subHeader")}
            />
          </StatContainer>
        </Content>
      </Container>
    </StyledBkdPage>
  );
};

export default BkdPage;