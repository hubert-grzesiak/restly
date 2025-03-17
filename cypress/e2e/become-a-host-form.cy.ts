// cypress/e2e/become_a_host.spec.js

describe("Become a Host Form", () => {
  beforeEach(() => {
    // Ustawienie rozmiaru okna przeglądarki przed każdym testem
    cy.viewport(1500, 1000);

    // Odwiedzenie strony formularza "Become a Host"
    cy.visit("http://localhost:3000/become-a-host");

    // Ustawienie niezbędnych ciasteczek uwierzytelniających
    cy.setCookie("authjs.session-token", "token...");
    cy.setCookie("authjs.csrf-token", "token...");

    // Przeładowanie strony, aby zastosować ciasteczka
    cy.reload();

    // Ponowne odwiedzenie strony formularza po przeładowaniu
    cy.visit("http://localhost:3000/become-a-host");
  });

  it("should successfully submit the Become a Host form", () => {
    // Kliknięcie elementu umożliwiającego rozpoczęcie wypełniania formularza
    cy.get(".flex-col > .inline-flex").click();

    // Wypełnienie pola imienia
    cy.get("#\\:r9\\:").clear();
    cy.get("#\\:r9\\:").type("Pola");

    // Wybór opcji z rozwijanego menu
    cy.get("#\\:r4o\\:").click();

    // Wypełnienie pola miejscowości
    cy.get("#\\:r2\\:-form-item").clear().type("Sieroszewice");

    // Wypełnienie pola kodu pocztowego
    cy.get("#\\:r3\\:-form-item").clear().type("63-405");

    // Wypełnienie pola ulicy
    cy.get("#\\:r4\\:-form-item").clear().type("Ostrowska");

    // Wypełnienie pola numeru domu
    cy.get("#\\:r5\\:-form-item").clear().type("82");

    // Kliknięcie wiersza, aby kontynuować
    cy.get(".flex-row > .inline-flex").click();

    // Wypełnienie typu nieruchomości
    cy.get("#\\:r6g\\:-form-item").clear().type("Dom");

    // Wypełnienie dodatkowych informacji o nieruchomości
    cy.get("#\\:r6h\\:-form-item").click().type("Dom");

    // Wypełnienie liczby pokoi
    cy.get("#\\:r6i\\:-form-item").clear().type("1");

    // Wypełnienie liczby łazienek
    cy.get("#\\:r6j\\:-form-item").clear().type("1");

    // Wypełnienie liczby sypialni
    cy.get("#\\:r6k\\:-form-item").clear().type("1");

    // Wypełnienie liczby gości
    cy.get("#\\:r6l\\:-form-item").clear().type("1");

    // Kontynuacja wypełniania formularza
    cy.get(".flex-row > :nth-child(2)").click();

    // Wybór daty rozpoczęcia rezerwacji
    cy.get(":nth-child(1) > .inline-flex").click();
    cy.get(":nth-child(2) > :nth-child(2) > .rdp-button_reset > .flex > div").click();

    // Wybór daty zakończenia rezerwacji
    cy.get('[data-cy="Date to"]').click();
    cy.get('[data-cy="Date to-calendar"]')
      .find(".rdp-tbody > :nth-child(2) > :nth-child(4)")
      .click();

    // Ustawienie ceny za noc
    cy.get(`[data-cy="price"]`).clear().type("23");

    // Kontynuacja wypełniania formularza
    cy.get(".flex-row > :nth-child(2)").click();

    // Wybór opcji ogrzewania
    cy.get(".ant-select-selection-overflow").click();
    cy.get('[title="Heating"]').click();
    cy.get(".ant-select-item-option-active > .ant-select-item-option-content").click();

    // Finalizacja wypełniania formularza
    cy.get("form > :nth-child(1) > .flex-col").click();
    cy.get(".flex-col > .flex > :nth-child(2)").click();

    // Przesyłanie zdjęcia nieruchomości
    cy.get(".ant-upload-select > .ant-upload").click();
    cy.get("form > :nth-child(1) > .flex-col > .w-full > .border").click();
  });
});
