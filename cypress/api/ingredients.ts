export async function getIngredients () {
    cy.fixture('ingredients').then(($ingredients) => {
        cy.intercept('GET', 'api/ingredients', {
            statusCode: 200,
            body: $ingredients
        });
    })
};