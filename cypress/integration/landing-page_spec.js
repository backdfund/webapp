describe("Innitial Load", () => {
  it("Should Load Home Page", () => {
    cy.visit("http://localhost:3000/");
  });
});

describe("Benefits", () => {
  it("Should have Avoid Liquidation Benefit", () => {
    cy.get('[id="benefit - Avoid Liquidation"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://backdfund.medium.com/introducing-the-backd-protocol-95020816cee5"
      );
  });

  it("Should have Earn Yield Benefit", () => {
    cy.get('[id="benefit - Earn Yield"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://backdfund.medium.com/introducing-the-backd-protocol-95020816cee5"
      );
  });

  it("Should have Fee Share Benefit", () => {
    cy.get('[id="benefit - Fee Share"] > a')
      .should("have.attr", "target", "_blank")
      .should(
        "have.attr",
        "href",
        "https://backdfund.medium.com/introducing-the-backd-protocol-95020816cee5"
      );
  });
});

describe("How it Works", () => {
  it("Should Show Earn Yeild Options", () => {
    cy.get('[id="How It Works - 01"]').contains("Deposit Liquidity");
    cy.get('[id="How It Works - 02"]').contains("Earn Yield");
    cy.get('[id="How It Works - 03"]').contains("Stake to Earn Rewards");
    cy.get('[id="How It Works - 04"]').contains("Unstake Any Time");
  });

  it("Should Chang to Earn & Protect Tab", () => {
    cy.get('[id="Radio Option - protect"]').click();
  });

  it("Should Show Earn & Protect Options", () => {
    cy.get('[id="How It Works - 01"]').contains("Deposit Liquidity");
    cy.get('[id="How It Works - 02"]').contains("Register Loan on-Chain");
    cy.get('[id="How It Works - 03"]').contains("Protect & Earn");
    cy.get('[id="How It Works - 04"]').contains("Unstake Any Time");
  });

  it("Should Chang to Earn Yield Tab", () => {
    cy.get('[id="Radio Option - protect"]').click();
  });

  it("Should Show Earn Yeild Options", () => {
    cy.get('[id="How It Works - 01"]').contains("Deposit Liquidity");
    cy.get('[id="How It Works - 02"]').contains("Earn Yield");
    cy.get('[id="How It Works - 03"]').contains("Stake to Earn Rewards");
    cy.get('[id="How It Works - 04"]').contains("Unstake Any Time");
  });
});

describe("Supported By", () => {
  it("Should have Divergence Link", () => {
    cy.get('[id="Supported By - Divergence"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://www.div.vc/");
  });

  it("Should have Curve Link", () => {
    cy.get('[id="Supported By - Curve"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://curve.fi/");
  });

  it("Should have Aave Link", () => {
    cy.get('[id="Supported By - Aave"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "http://aave.com/");
  });
});
