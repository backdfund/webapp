import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { GradientText } from "../../styles/GradientText";
import { Header2 } from "../../styles/Headers";
import discord from "../../assets/socials/discord.svg";
import twitter from "../../assets/socials/twitter.svg";
import github from "../../assets/socials/github.svg";
import { DISCORD_LINK, GITHUB_LINK, TWITTER_LINK } from "../../lib/links";

interface SocialType {
  label: string;
  icon: string;
  link: string;
}

const socials: SocialType[] = [
  {
    label: "joinCommunity.socials.discord",
    icon: discord,
    link: DISCORD_LINK,
  },
  {
    label: "joinCommunity.socials.twitter",
    icon: twitter,
    link: TWITTER_LINK,
  },
  {
    label: "joinCommunity.socials.github",
    icon: github,
    link: GITHUB_LINK,
  },
];

const StyledJoinCommunity = styled.div`
  width: 100%;
  margin: var(--section-margin);

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Socials = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.3rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0.6rem;
  }
`;

const Social = styled.a`
  flex: 1;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.4rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  cursor: pointer;
  background-color: var(--row-bg);
  transition: background-color 0.3s;

  :hover {
    background-color: #1a1438;
  }

  @media (max-width: 600px) {
    padding: 0.6rem 0.7rem;
  }
`;

const Label = styled(GradientText)`
  flex: 1;
  font-weight: 700;
  font-size: 1.8rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 2.4rem;
    margin-left: 0.9rem;
  }
`;

const IconContainer = styled.div`
  height: 6rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main);
  border-radius: 1.4rem;

  @media (max-width: 600px) {
    height: 3.6rem;
    width: 3.6rem;
  }
`;

const Icon = styled.img`
  width: 3.6rem;

  @media (max-width: 600px) {
    width: 2.1rem;
  }
`;

const JoinCommunity = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledJoinCommunity>
      <Header2>{t("joinCommunity.header")}</Header2>
      <Socials>
        {socials.map((social: SocialType) => (
          <Social
            key={social.label}
            id={social.label}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Label>{`${t(social.label)} →`}</Label>
            <IconContainer>
              <Icon src={social.icon} alt={`${social.label} logo`} />
            </IconContainer>
          </Social>
        ))}
      </Socials>
    </StyledJoinCommunity>
  );
};

export default JoinCommunity;
