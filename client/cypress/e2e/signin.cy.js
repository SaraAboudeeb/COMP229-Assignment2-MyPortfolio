describe('Sign in on the live site', () => {
  it('normal user can sign in and only see projects', () => {
    // open the sign in page
    cy.visit('/signin');
    cy.get('input[name="email"]').type('user1@test.com');
    cy.get('input[name="password"]').type('user12345');
    cy.get('button[type="submit"]').click();

    // check the role in the navbar
    cy.contains('(user)');

    // go to projects, data comes from the database
    cy.contains('a', 'Projects').click();
    cy.contains('Weather Data Pipeline');

    // normal user can not see the admin button
    cy.contains('Add Project').should('not.exist');
  });
});