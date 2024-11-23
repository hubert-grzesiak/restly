// cypress/e2e/facilities_crud.spec.js

describe("Facilities CRUD", () => {
  beforeEach(() => {
    // Ustawienie rozmiaru okna przeglądarki przed każdym testem
    cy.viewport(1500, 1000);

    // Odwiedzenie strony administracyjnej zarządzania zasobami "Facilities"
    cy.visit("http://localhost:3000/admin/facilities");

    // Ustawienie niezbędnych ciasteczek uwierzytelniających
    cy.setCookie("authjs.session-token", "token...");
    cy.setCookie("authjs.csrf-token", "token...");

    // Przeładowanie strony, aby zastosować ciasteczka
    cy.reload();

    // Ponowne odwiedzenie strony po przeładowaniu
    cy.visit("http://localhost:3000/admin/facilities");
  });

  it("should perform CRUD operations on facilities", function () {
    // === CREATE ===
    // Kliknięcie przycisku dodawania nowego zasobu "Facility"
    cy.get(".bg-green-500").click();

    // Wypełnienie pola nazwy nowego zasobu
    cy.get('[data-cy="name"]').clear().type("test");

    // Przesłanie formularza dodawania nowego zasobu
    cy.get('[data-cy="submit facility"]').click();

    // === READ ===
    // Wyszukanie nowo dodanego zasobu w liście (zakładając, że pole wyszukiwania ma klasę .peer)
    cy.get(".peer").clear().type("test").wait(1000);

    // === UPDATE ===
    // Kliknięcie przycisku edycji dla wybranego zasobu
    cy.get('.pl-6 > .flex > [data-cy="update-facility"]').click();

    // Aktualizacja nazwy zasobu z "test" na "test v2"
    cy.get('[data-cy="name"]').clear().type("test v2");
    cy.get('[data-cy="submit facility"]').click();

    // Ponowne wyszukanie zaktualizowanego zasobu
    cy.get(".peer").clear().type("test v2").wait(1000);

    // Kolejna aktualizacja nazwy zasobu z "test v2" na "test v10"
    cy.get('.pl-6 > .flex > [data-cy="update-facility"] > .w-5').click();
    cy.get('[data-cy="name"]').clear().type("test v10");
    cy.get('[data-cy="submit facility"]').click();

    // Ponowne wyszukanie zaktualizowanego zasobu
    cy.get(".peer").clear().type("test v10").wait(1000);

    // === DELETE ===
    // Kliknięcie przycisku usuwania wybranego zasobu
    cy.get('.pl-6 > .flex > div > [data-cy="delete-facility"]').click();

    // Potwierdzenie usunięcia zasobu (zakładając, że przycisk potwierdzenia ma klasę .bg-primary)
    cy.get(".bg-primary").click();

    // Opcjonalnie: Sprawdzenie, czy zasób został pomyślnie usunięty
    cy.get(".peer").should("not.contain", "test v10");
  });
});
