import { initWeb3, percySnapshot } from "../support";

describe("Page Load", () => {
  it("Should Innitialise Web3", () => {
    initWeb3();
    cy.visit("/pools");
  });

  it("Should show walet connect popup", () => {
    cy.get("#wallet-select-link")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://backd-1.gitbook.io/backd/resources/faq/general");
  });

  it("Should connect wallet", () => {
    cy.get('[id="walletConnect.wallets.metaMask"]').click();
  });

  it("Should show address in connector", () => {
    cy.get("#connector-address").contains("...");
  });

  it("Should show network color dot for Kovan", () => {
    cy.get("#connector-network-dot").should("have.css", "background-color", "rgb(137, 102, 246)");
  });

  it("Should show network label Kovan", () => {
    cy.get("#network-name").contains("Kovan");
  });

  it("Should show overview by default", () => {
    cy.get("#overview").contains("Overview");
    cy.get("#overview").invoke("outerHeight").should("be.gt", 48);
  });

  it("Should close overview", () => {
    cy.get("#overview-header").click();
    cy.get("#overview").invoke("outerHeight").should("be.lt", 80);
  });

  it("Should open overview", () => {
    cy.get("#overview-header").click();
    cy.get("#overview").invoke("outerHeight").should("be.gt", 48);
  });

  it("Should should have overview link", () => {
    cy.get("#overview-link")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "href", "https://docs.backd.fund/");
  });

  it("Should load Pools", () => {
    cy.get("#pool-row-bdai", { timeout: 30_000 }).should("be.visible");
  });

  it("Should navigate to Pool", () => {
    cy.get("#pool-row-bdai", { timeout: 30_000 }).click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/pool/bDAI");
    });
  });

  it("Should load balance", () => {
    cy.get("#available-amount", { timeout: 30_000 }).contains(".", { timeout: 30_000 });
  });

  it("Should input value", () => {
    cy.get("#amount-input").focus();
    cy.get("#amount-input").type("10");
  });

  it("Should Deposit", () => {
    cy.get("#action-button").click();
  });
});
