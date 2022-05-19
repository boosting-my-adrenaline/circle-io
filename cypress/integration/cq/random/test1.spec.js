import { getRandomVehicle } from '../../../utils/getRandomVehicle';

describe('cq lead 203 interface', () => {
    /* test function to be invoked */
    const test = (device) => {
        const randomVehicle1 = getRandomVehicle();
        const randomVehicle2 = getRandomVehicle();
        const randomVehicle3 = getRandomVehicle();

        it(`lead 203 ${device}`, () => {
            localStorage.clear();
            cy.viewport(device === 'desktop' ? 'macbook-15' : 'iphone-x');
            cy.intercept('POST', 'https://create.leadid.com/**');
            cy.intercept('POST', 'https://info.leadid.com/**');
            cy.intercept('POST', 'https://in.hotjar.com/**');

            const baseUrl = 'test.cheaper-quotes.com';
            cy.visit(baseUrl + '/?lead=203' + '&lb=off');

            cy.title().should('include', 'Cheaper-Quotes');
            cy.typeInInput('inputZipCode1', '75216');
            cy.get(
                '.info-block > .newHomeAutoSbmt > .form-container > .btn'
            ).click();

            /* basically most of actions are custom and located in support/commands.js */
            /* commands splited to blocks of strings by its step (also url) */
            cy.log(randomVehicle1);
            cy.log(randomVehicle2);
            cy.log(randomVehicle3);
        });
    };

    /*  */
    [
        'desktop',
        //'mobile'
    ].forEach((device) => test(device));
});
