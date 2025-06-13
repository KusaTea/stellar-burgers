export async function getUser () {
    cy.fixture('user').then(($user) => {
        cy.intercept('GET', 'api/auth/user', {
            statusCode: 200,
            body: $user
        });
    })
};