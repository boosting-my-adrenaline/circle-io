/* user actions commands */

/* delay to prevent failing tests while page being rerendering
    for actions making url change */
const COMMAND_DELAY = 500;

Cypress.Commands.add('selectItem', (item, removeDelay) => {
    cy.get('.choice-list').contains(item).click();
    removeDelay || cy.wait(COMMAND_DELAY);
});

Cypress.Commands.add('stepBack', (removeDelay) => {
    cy.get('.navbar').contains('Previous Question').click();
    removeDelay || cy.wait(COMMAND_DELAY);
});

Cypress.Commands.add('selectItemFromDropDown', (item, removeDelay) => {
    cy.get('.selectbox').select(item);
    removeDelay || cy.wait(COMMAND_DELAY);
});

Cypress.Commands.add('clickButton', (button, removeDelay, ...args) => {
    cy.get('.funnel-form-container')
        .contains(button)
        .click(...args);
    removeDelay || cy.wait(COMMAND_DELAY);
});

Cypress.Commands.add(
    'selectInRadioGroup',
    (radiogroup, choice, removeDelay) => {
        cy.get(`.choice-holder > :nth-child(${radiogroup})`)
            .contains(choice)
            .click();
        removeDelay || cy.wait(COMMAND_DELAY);
    }
);

Cypress.Commands.add('editCar', (index, removeDelay) => {
    cy.get(`.cars-view > :nth-child(${index}) > .edit-link`).click();
    removeDelay || cy.wait(COMMAND_DELAY);
});

Cypress.Commands.add('deleteCar', (index, removeDelay) => {
    cy.get(`.cars-view > :nth-child(${index}) > .delete-link`).click();
    removeDelay || cy.wait(COMMAND_DELAY);
});

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

const checkItemInLocalStorage = (storage, key, value) => {
    cy.get('#clear-local-storage').should(() =>
        expect(
            JSON.parse(localStorage.getItem(storage)).data.data[key].toString()
        ).to.be.equal(value)
    );
};

Cypress.Commands.add(
    'checkItemInLocalStorageFFR7',
    (keyOrPair, valueOrPair, ...args) =>
        !args?.length && typeof valueOrPair === 'string'
            ? checkItemInLocalStorage('ffr7', keyOrPair, valueOrPair)
            : [keyOrPair, valueOrPair, ...args].forEach(([key, value]) =>
                  checkItemInLocalStorage('ffr7', key, value)
              )
);

Cypress.Commands.add(
    'checkItemInLocalStorageFFR',
    (keyOrPair, valueOrPair, ...args) =>
        !args?.length && typeof valueOrPair === 'string'
            ? checkItemInLocalStorage('ffr', keyOrPair, valueOrPair)
            : [keyOrPair, valueOrPair, ...args].forEach(([key, value]) =>
                  checkItemInLocalStorage('ffr', key, value)
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

Cypress.Commands.add('checkEditVehicle', (index, year, make, model, capitals) =>
    cy
        .get(`.cars-view > :nth-child(${index})`)
        .should(
            'have.text',
            `${index} |${year} ${capitals ? make : make.toLowerCase()} ${
                capitals ? model : model.toLowerCase()
            }`
        )
);

Cypress.Commands.add('checkInput', (input, text) =>
    cy.get(`#${input}`).should('have.value', text)
);

Cypress.Commands.add('checkInputNoError', (input, grayColor) =>
    cy
        .get(`#${input}`)
        .should(
            'have.css',
            'border-color',
            grayColor ? 'rgb(216, 216, 216)' : 'rgb(11, 44, 104)'
        )
);

Cypress.Commands.add('checkInputError', (input) =>
    cy.get(`#${input}`).should('have.css', 'border-color', 'rgb(232, 86, 86)')
);

Cypress.Commands.add(
    'checkValueWithDateSomeMonthesAgo',
    (key, monthBeforeDate) => {
        let d = new Date();
        d.setMonth(d.getMonth() - (monthBeforeDate || 0));

        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        let value = [year, month, day].join('-');
        checkItemInLocalStorage('ffr', key, value);
    }
);
