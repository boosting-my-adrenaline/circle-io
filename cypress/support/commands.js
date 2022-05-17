/* user actions commands */

Cypress.Commands.add('selectItem', (item) =>
    cy.get('.choice-list').contains(item).click()
);

Cypress.Commands.add('stepBack', () =>
    cy.get('.navbar').contains('Previous Question').click()
);

Cypress.Commands.add('selectItemFromDropDown', (item) =>
    cy.get('.selectbox').select(item)
);

Cypress.Commands.add('clickButton', (button) =>
    cy.get('.funnel-form-container').contains(button).click()
);

Cypress.Commands.add('selectInRadioGroup', (radiogroup, choice) =>
    cy
        .get(`.choice-holder > :nth-child(${radiogroup})`)
        .contains(choice)
        .click()
);

Cypress.Commands.add('editCar', (index) =>
    cy.get(`.cars-view > :nth-child(${index}) > .edit-link`).click()
);

Cypress.Commands.add('deleteCar', (index) =>
    cy.get(`.cars-view > :nth-child(${index}) > .delete-link`).click()
);

Cypress.Commands.add('typeInInput', (input, text) =>
    cy.get(`#${input}`).type(text, { delay: 50 })
);

Cypress.Commands.add('clearInput', (input) => cy.get(`#${input}`).clear());

/* check commands */

Cypress.Commands.add('checkItemsAmount', (amount) =>
    cy.get('.choice-list').children().should('have.length', amount)
);

Cypress.Commands.add('checkItemSelected', (item) =>
    cy.get('.choice-list').contains(item).should('have.class', 'selected')
);

Cypress.Commands.add('checkNoSelectedItems', () =>
    cy.get('.choice-list').children().should('not.have.class', 'selected')
);

Cypress.Commands.add('checkNoBackButton', () =>
    cy
        .get('.navbar')
        .contains('Previous Question')
        .should('have.css', 'display', 'none')
);

Cypress.Commands.add('checkFooter', () => {
    cy.get('.dark-footer').contains('Privacy Policy');
    cy.get('.dark-footer').contains('Terms of Use');
});

Cypress.Commands.add('checkNoFooter', () => {
    cy.get('.dark-footer').contains('Privacy Policy').should('not.be.visible');
    cy.get('.dark-footer').contains('Terms of Use').should('not.be.visible');
});

Cypress.Commands.add('checkItemInLocalStorage', (key, value) =>
    cy
        .get('#clear-local-storage')
        .should(() =>
            expect(
                JSON.parse(localStorage.getItem('ffr7')).data.data[
                    key
                ].toString()
            ).to.be.equal(value)
        )
);

Cypress.Commands.add('checkTitle', (header) =>
    cy.get('.funnel-form-subtitle-lead202').should('have.text', header)
);

Cypress.Commands.add('checkHeader', (header) =>
    cy.get('.funnel-form-title').should('have.text', header)
);

Cypress.Commands.add('checkDropDown', (value) =>
    cy.get('.selectbox').should('have.value', value)
);

Cypress.Commands.add('checkRadioGroupSelected', (radiogroup, choice) => {
    let element = cy
        .get(`.choice-holder > :nth-child(${radiogroup})`)
        .contains(choice)
        .parent()
        .children();
    ['Yes', 'Male'].includes(choice)
        ? element.first().should('have.class', 'selected')
        : element.last().should('have.class', 'selected');
});

Cypress.Commands.add('checkEditVehicle', (index, year, make, model) =>
    cy
        .get(`.cars-view > :nth-child(${index})`)
        .should(
            'have.text',
            `${index} |${year} ${make.toLowerCase()} ${model.toLowerCase()}`
        )
);

Cypress.Commands.add('checkInput', (input, text) =>
    cy.get(`#${input}`).should('have.value', text)
);

Cypress.Commands.add('checkInputNoError', (input) =>
    cy.get(`#${input}`).should('have.css', 'border-color', 'rgb(11, 44, 104)')
);

Cypress.Commands.add('checkInputError', (input) =>
    cy.get(`#${input}`).should('have.css', 'border-color', 'rgb(232, 86, 86)')
);
