describe('my-mini-app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('local storage test', () => {
        cy.window().its('MediaAlphaExchange').should('equal', {
            test: 'testing',
        });
        // const isItemSelected = (item) =>
        //     cy.get('.test').contains(item).should('have.class', 'selected');

        // cy.get('.test').children().should('not.have.class', 'selected');

        // isItemSelected('zero');

        // cy.get('#clear-local-storage').should(() =>
        //     expect(
        //         JSON.parse(localStorage.getItem('ffr7')).data.data.vehicleYear_1
        //     ).to.be.equal(2017)
        // );
    });

    // it('has header "Welcome CY"', () => {
    //     cy.get('h1').should('have.text', 'Welcome CY');
    // });

    // it('has 3 tasks by default', () => {
    //     cy.get('li').should('have.length', 3);
    // });

    // it('can delete tasks', () => {
    //     cy.get('li:last-child button').click();

    //     cy.get('li').should('have.length', 2);
    // });

    // it('can erase spaces and subscribe button clears input', () => {
    //     cy.get('#emailInput')
    //         .type('myEmail @ gmail . com', { delay: 100 })
    //         .should('have.value', 'myEmail@gmail.com');

    //     cy.get('.subscribe button').click();

    //     cy.get('#emailInput').should('have.value', '');
    // });

    // it('can add task', () => {
    //     let taskTitle = 'Gotta order some Food';

    //     cy.get('.create input').type(taskTitle, { delay: 220 });
    //     cy.get('.create button').click();

    //     cy.get('li:first-child span').should('have.text', taskTitle);
    // });

    // it('has "No Tasks Yet" notify if there are no tasks', () => {
    //     cy.get('li').should('have.length', 3);
    //     cy.get('li:first-child button').click();
    //     cy.get('li:first-child button').click();
    //     cy.get('li:first-child button').click();

    //     cy.get('li').should('have.text', 'No Tasks Yet');
    // });

    // it('has title React App', () => {
    //     cy.title().should('eq', 'React App');
    // });
});
