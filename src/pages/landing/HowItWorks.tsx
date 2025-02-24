import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Header2, Header4, Header5 } from "../../styles/Headers";
import Radio, { RadioOptionType } from "../../components/Radio";
import Button from "../../components/Button";
import { useNavigateToTop } from "../../app/hooks/use-navigate-to-top";

interface CardType {
  number: string;
  header: string;
  description: string;
  depositButton?: boolean;
}

const cardsList: CardType[][] = [
  [
    {
      number: "howItWorks.categories.earnAndProtect.cards.deposit.number",
      header: "howItWorks.categories.earnAndProtect.cards.deposit.header",
      description: "howItWorks.categories.earnAndProtect.cards.deposit.description",
    },
    {
      number: "howItWorks.categories.earnAndProtect.cards.register.number",
      header: "howItWorks.categories.earnAndProtect.cards.register.header",
      description: "howItWorks.categories.earnAndProtect.cards.register.description",
    },
    {
      number: "howItWorks.categories.earnAndProtect.cards.protect.number",
      header: "howItWorks.categories.earnAndProtect.cards.protect.header",
      description: "howItWorks.categories.earnAndProtect.cards.protect.description",
    },
    {
      number: "howItWorks.categories.earnAndProtect.cards.claim.number",
      header: "howItWorks.categories.earnAndProtect.cards.claim.header",
      description: "howItWorks.categories.earnAndProtect.cards.claim.description",
    },
  ],
  [
    {
      number: "howItWorks.categories.earnYield.cards.deposit.number",
      header: "howItWorks.categories.earnYield.cards.deposit.header",
      description: "howItWorks.categories.earnYield.cards.deposit.description",
      depositButton: true,
    },
    {
      number: "howItWorks.categories.earnYield.cards.earn.number",
      header: "howItWorks.categories.earnYield.cards.earn.header",
      description: "howItWorks.categories.earnYield.cards.earn.description",
    },
    {
      number: "howItWorks.categories.earnYield.cards.stake.number",
      header: "howItWorks.categories.earnYield.cards.stake.header",
      description: "howItWorks.categories.earnYield.cards.stake.description",
    },
    {
      number: "howItWorks.categories.earnYield.cards.claim.number",
      header: "howItWorks.categories.earnYield.cards.claim.header",
      description: "howItWorks.categories.earnYield.cards.claim.description",
    },
  ],
];

const StyledHowItWorks = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 713px) {
    margin: var(--mobile-section-margin);
  }
`;

interface CardContainerType {
  show: boolean;
}

const CardContainer = styled.div`
  width: 100%;
  display: ${(props: CardContainerType) => (props.show ? "flex" : "none")};
  margin: 1rem 0;

  @media (max-width: 713px) {
    margin: 0;
    margin-top: 2.4rem;
    flex-direction: column;
  }
`;

const Card = styled.div`
  position: relative;
  flex: 1;
  margin: 0 0.8rem;
  background-color: rgba(34, 31, 55, 0.6);
  border-radius: 1.4rem;
  padding: 2.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(8px);
  padding-bottom: 5.3rem;

  @media (max-width: 713px) {
    flex-direction: column;
    margin: 0;
    margin-bottom: 1.2rem;
  }
`;

const Number = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;
  margin-bottom: 1.4rem;

  @media (max-width: 713px) {
    font-size: 1.2rem;
    line-height: 1.5rem;
    margin-bottom: 1.2rem;
  }
`;

const Body = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;

  @media (max-width: 713px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;

const Header = styled(Header5)`
  text-align: left;
  margin-bottom: 1rem;

  @media (max-width: 713px) {
    margin-bottom: 1.4rem;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);

  @media (max-width: 1280px) {
    display: none;
  }
`;

const HowItWorks = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigateToTop();
  const [category, setCategory] = useState("protect");

  const categories: RadioOptionType[] = [
    {
      value: "protect",
      label: t("howItWorks.categories.earnAndProtect.tabName"),
    },
    {
      value: "earn",
      label: t("howItWorks.categories.earnYield.tabName"),
    },
  ];

  return (
    <StyledHowItWorks>
      <Header2>{t("howItWorks.header")}</Header2>
      <Header4>{t("howItWorks.subHeader")}</Header4>
      <Radio
        options={categories}
        active={category}
        setOption={(value: string) => setCategory(value)}
      />
      {cardsList.map((cards: CardType[], index: number) => (
        <CardContainer
          key={index}
          show={categories.map((a: RadioOptionType) => a.value).indexOf(category) === index}
        >
          {cards.map((card: CardType, index: number) => (
            <Card key={card.number} id={`how-it-works-${index}`}>
              <Number>{t(card.number)}</Number>
              <Header>{t(card.header)}</Header>
              <Body>{t(card.description)}</Body>
              {card.depositButton && (
                <ButtonContainer>
                  <Button primary large click={() => navigate("/pools")}>
                    {t("howItWorks.deposit")}
                  </Button>
                </ButtonContainer>
              )}
            </Card>
          ))}
        </CardContainer>
      ))}
    </StyledHowItWorks>
  );
};

export default HowItWorks;
