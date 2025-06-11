export async function orderBurger () {
    cy.fixture('order').then(($order) => {
        cy.intercept('POST', 'api/orders', {
            statusCode: 200,
            body: $order
        });
    })
};