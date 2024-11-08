// cypress/e2e/become_a_host.spec.js

describe("Become a Host Form", () => {
  beforeEach(() => {
    // Odwiedź stronę przed każdym testem
    cy.viewport(1500, 1000);

    cy.visit("localhost:3000/become-a-host");
    cy.setCookie(
      "authjs.session-token",
      "token...",
    );
    cy.setCookie(
      "authjs.csrf-token",
      "token...",
    );
    cy.reload();
    cy.visit("localhost:3000/become-a-host");
  });


  /* ==== Test Created with Cypress Studio ==== */
  it("become-a-host", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".flex-col > .inline-flex").click();
    cy.get("#\\:r9\\:").clear();
    cy.get("#\\:r9\\:").type("Pola");
    cy.get("#\\:r4o\\:").click();
    cy.get("#\\:r2\\:-form-item").clear("S");
    cy.get("#\\:r2\\:-form-item").type("Sieroszewice");
    cy.get("#\\:r3\\:-form-item").clear();
    cy.get("#\\:r3\\:-form-item").type("63-405");
    cy.get("#\\:r4\\:-form-item").clear();
    cy.get("#\\:r4\\:-form-item").type("Ostrowska");
    cy.get("#\\:r5\\:-form-item").clear();
    cy.get("#\\:r5\\:-form-item").type("82");
    cy.get(".flex-row > .inline-flex").click();
    cy.get("#\\:r6g\\:-form-item").clear("D");
    cy.get("#\\:r6g\\:-form-item").type("Dom");
    cy.get("#\\:r6h\\:-form-item").click();
    cy.get("#\\:r6h\\:-form-item").type("Dom");
    cy.get("#\\:r6i\\:-form-item").clear();
    cy.get("#\\:r6i\\:-form-item").type("1");
    cy.get("#\\:r6j\\:-form-item").clear();
    cy.get("#\\:r6j\\:-form-item").type("1");
    cy.get("#\\:r6k\\:-form-item").clear();
    cy.get("#\\:r6k\\:-form-item").type("1");
    cy.get("#\\:r6l\\:-form-item").clear();
    cy.get("#\\:r6l\\:-form-item").type("1");
    cy.get(".flex-row > :nth-child(2)").click();
    cy.get(":nth-child(1) > .inline-flex").click();
    cy.get(
      ":nth-child(2) > :nth-child(2) > .rdp-button_reset > .flex > div",
    ).click();
    cy.get('[data-cy="Date to"]').click();
    cy.get('[data-cy="Date to-calendar"]')
      .find(".rdp-tbody > :nth-child(2) > :nth-child(4)")
      .click();
    cy.get(`[data-cy="price"`).clear();
    cy.get(`[data-cy="price"`).type("23");
    cy.get(".flex-row > :nth-child(2)").click();
    cy.get(".ant-select-selection-overflow").click();
    cy.get('[title="Heating"]').click();
    cy.get(
      ".ant-select-item-option-active > .ant-select-item-option-content",
    ).click();
    cy.get("form > :nth-child(1) > .flex-col").click();
    cy.get(".flex-col > .flex > :nth-child(2)").click();
    cy.get(".ant-upload-select > .ant-upload").click();
    cy.get("form > :nth-child(1) > .flex-col > .w-full > .border").click();
    /* ==== End Cypress Studio ==== */
  });
});
