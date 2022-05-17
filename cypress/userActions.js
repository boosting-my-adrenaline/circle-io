/*  */
const stepBack = () => cy.get('.navbar').contains('Previous Question').click();

const selectItem = (item) => cy.get('.choice-list').contains(item).click();

const selectItemFromDropDown = (item) => cy.get('.selectbox').select(item);

const clickButton = (button) =>
    cy.get('.funnel-form-container').contains(button).click();

const selectInRadioGroup = (radiogroup, choice) =>
    cy
        .get(`.choice-holder > :nth-child(${radiogroup})`)
        .contains(choice)
        .click();

const editCar = (index) =>
    cy.get(`.cars-view > :nth-child(${index}) > .edit-link`).click();

const deleteCar = (index) =>
    cy.get(`.cars-view > :nth-child(${index}) > .delete-link`).click();

const typeInInput = (input, text) =>
    cy.get(`#${input}`).type(text, { delay: 82 });

const clearInput = (input) => cy.get(`#${input}`).clear();

/* */
const checkItemsAmount = (amount) =>
    cy.get('.choice-list').children().should('have.length', amount);

const checkItemSelected = (item) =>
    cy.get('.choice-list').contains(item).should('have.class', 'selected');

const checkNoSelectedItems = () =>
    cy.get('.choice-list').children().should('not.have.class', 'selected');

const checkItemInLocalStorage = (key, value) =>
    cy
        .get('#clear-local-storage')
        .should(() =>
            expect(
                JSON.parse(localStorage.getItem('ffr7')).data.data[
                    key
                ].toString()
            ).to.be.equal(value)
        );

const checkHeader = (header) =>
    cy.get('.funnel-form-title').should('have.text', header);

const checkDropDown = (value) =>
    cy.get('.selectbox').should('have.value', value);

const checkRadioGroupSelected = (radiogroup, choice) => {
    let element = cy
        .get(`.choice-holder > :nth-child(${radiogroup})`)
        .contains(choice)
        .parent()
        .children();
    ['Yes', 'Male'].includes(choice)
        ? element.first().should('have.class', 'selected')
        : element.last().should('have.class', 'selected');
};

const checkEditVehicle = (index, year, make, model) =>
    cy
        .get('.input-edit')
        .should(
            'have.text',
            `${index} |${year} ${make.toLowerCase()} ${model.toLowerCase()}`
        );

const checkInput = (input, text) =>
    cy.get(`#${input}`).should('have.value', text);

const checkInputNoError = (input) =>
    cy.get(`#${input}`).should('have.css', 'border-color', 'rgb(11, 44, 104)');

const checkInputError = (input) =>
    cy.get(`#${input}`).should('have.css', 'border-color', 'rgb(232, 86, 86)');

export const actions = {
    stepBack,
    selectItem,
    selectItemFromDropDown,
    clickButton,
    selectInRadioGroup,
    editCar,
    deleteCar,
    typeInInput,
    clearInput,
    checkItemsAmount,
    checkItemSelected,
    checkNoSelectedItems,
    checkItemInLocalStorage,
    checkHeader,
    checkDropDown,
    checkRadioGroupSelected,
    checkEditVehicle,
    checkInput,
    checkInputNoError,
    checkInputError,
};
