import { actions, selectItem } from '../../userActions';

describe('cq lead 203', () => {
    const baseUrl = 'http://localhost:8080';
    // const baseUrl = 'test.cheaper-quotes.com';

    const url = baseUrl + '/?lead=203&lb=off';

    before(() => {
        localStorage.clear();
        cy.viewport('macbook-13');
        cy.intercept('POST', 'https://create.leadid.com/**', {});
        cy.intercept('POST', 'https://info.leadid.com/**', {});
        cy.intercept('POST', 'https://in.hotjar.com/**', {});
        cy.visit(url, { headers: { 'Accept-Encoding': 'gzip, deflate' } });
    });

    it('lead 203', () => {
        const {
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
        } = actions;

        cy.title().should('include', 'Cheaper-Quotes');
        cy.get('#inputZipCode1').type('75216', { delay: 176 });
        cy.get(
            '.info-block > .newHomeAutoSbmt > .form-container > .btn'
        ).click();

        checkHeader('Vehicle year');
        checkNoSelectedItems();
        checkItemInLocalStorage('zip', '75216');
        checkItemInLocalStorage('location', '75216');

        checkItemsAmount(24);
        selectItem('2017');
        checkItemInLocalStorage('vehicleYear_1', '2017');
        checkHeader('Vehicle make');
        stepBack();
        checkItemSelected('2017');

        selectItemFromDropDown('1996');
        checkItemInLocalStorage('vehicleYear_1', '1996');
        stepBack();
        checkItemSelected('1996');
        checkItemsAmount(25);

        selectItem('2016');

        checkNoSelectedItems();
        checkItemsAmount(12);
        selectItem('TOYOTA');
        checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');
        stepBack();
        checkItemSelected('TOYOTA');

        selectItemFromDropDown('VOLVO');
        checkHeader('Vehicle model');
        checkItemInLocalStorage('vehicleMake_1', 'VOLVO');
        checkItemInLocalStorage('vehicleYear_1', '2016');

        selectItem('S60');
        checkItemInLocalStorage('vehicleModel_1', 'S60');
        stepBack();

        stepBack();
        checkDropDown('VOLVO');
        checkItemsAmount(13);

        selectItem('TOYOTA');
        checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');

        selectItem('LAND CRUISER');
        checkItemInLocalStorage('vehicleModel_1', 'LAND CRUISER');
        checkHeader('Add second vehicle?');

        checkEditVehicle(1, 2016, 'TOYOTA', 'LAND CRUISER');

        editCar(1);
        checkItemSelected('2016');
        selectItem('2016');

        checkItemSelected('TOYOTA');
        selectItem('TOYOTA');

        checkItemSelected('LAND CRUISER');
        selectItem('LAND CRUISER');
        checkItemInLocalStorage('vehicleYear_1', '2016');
        checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');
        checkItemInLocalStorage('vehicleModel_1', 'LAND CRUISER');
        deleteCar(1);
        checkNoSelectedItems();
        selectItem('2016');

        checkNoSelectedItems();
        selectItem('TOYOTA');

        checkNoSelectedItems();
        selectItem('LAND CRUISER');
        checkItemInLocalStorage('vehicleYear_1', '2016');
        checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');
        checkItemInLocalStorage('vehicleModel_1', 'LAND CRUISER');
        clickButton('Yes');

        checkNoSelectedItems();
        selectItem('2020');

        checkNoSelectedItems();
        selectItem('CHEVROLET');

        checkNoSelectedItems();
        selectItem('TRAX LS');
        checkItemInLocalStorage('vehicleYear_2', '2020');
        checkItemInLocalStorage('vehicleMake_2', 'CHEVROLET');
        checkItemInLocalStorage('vehicleModel_2', 'TRAX LS');
        checkItemInLocalStorage('vehicleYear_1', '2016');
        checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');
        checkItemInLocalStorage('vehicleModel_1', 'LAND CRUISER');
        checkItemInLocalStorage('moreThenOneVehicle', 'Yes');

        checkHeader('Current auto insurance');
        checkDropDown('Other');
        checkItemInLocalStorage('insuranceCarrier', 'Other');
        clickButton('Continue');
        stepBack();

        selectItemFromDropDown('Travelers');
        clickButton('Continue');

        checkHeader('How long have you continuously had auto insurance?');
        checkNoSelectedItems();
        checkItemsAmount(4);
        selectItem('1 year or less');

        checkItemInLocalStorage('insuredTimeframe', 'SixToElevenMonths');
        checkHeader('Tell Us About The Driver');
        checkRadioGroupSelected(1, 'Yes');
        checkRadioGroupSelected(2, 'Yes');
        checkRadioGroupSelected(3, 'Male');
        clickButton('Continue');

        checkItemInLocalStorage('gender', 'M');
        checkItemInLocalStorage('ownHome', 'Yes');
        checkItemInLocalStorage('maritalStatus', 'Yes');
        stepBack();

        selectInRadioGroup(1, 'No');
        selectInRadioGroup(2, 'No');
        selectInRadioGroup(3, 'Female');
        checkRadioGroupSelected(1, 'No');
        checkRadioGroupSelected(2, 'No');
        checkRadioGroupSelected(3, 'Female');
        clickButton('Continue');

        checkItemInLocalStorage('gender', 'F');
        checkItemInLocalStorage('ownHome', 'No');
        checkItemInLocalStorage('maritalStatus', 'No');
        checkHeader('Select your birth month?');
        checkItemsAmount(12);
        selectItem('NOV');

        checkItemInLocalStorage('birthMonth', '11');
        checkHeader('Select your birth day');
        checkItemsAmount(31);
        stepBack();

        checkItemSelected('NOV');
        selectItem('SEP');

        checkItemInLocalStorage('birthMonth', '9');
        selectItem('25');

        checkItemInLocalStorage('birthDay', '25');
        checkHeader('Select your birth year');
        checkItemsAmount(24);
        selectItemFromDropDown('1980');

        checkItemInLocalStorage('birthYear', '1980');
        checkHeader('What Is Your Name?');
        stepBack();

        checkItemsAmount(25);
        selectItem('1990');

        checkItemInLocalStorage('birthYear', '1990');
        typeInInput('firstName', 'Stephen');
        checkInput('firstName', 'Stephen');
        typeInInput('lastName', 'Curry');
        checkInput('lastName', 'Curry');
        clickButton('Continue');

        checkItemInLocalStorage('firstName', 'Stephen');
        checkItemInLocalStorage('lastName', 'Curry');
        stepBack();

        checkInput('firstName', 'Stephen');
        checkInput('lastName', 'Curry');
        clearInput('firstName');
        typeInInput('firstName', 'Klay');
        clearInput('lastName');
        typeInInput('lastName', 'Tompson');
        clickButton('Continue');

        checkItemInLocalStorage('firstName', 'Klay');
        checkItemInLocalStorage('lastName', 'Tompson');
        typeInInput('streetAddress', 'Miami');
        typeInInput('email', 'example18');
        typeInInput('phoneNumber', '54321414');
        cy.get('.funnel-form').click();
        checkInputError('streetAddress');
        checkInputError('email');
        checkInputError('phoneNumber');
        clearInput('streetAddress');
        typeInInput('streetAddress', '22201 HIGHWAY 45 FRUITDALE');
        clearInput('email');
        typeInInput('email', 'kt1980@gmail.com');
        clearInput('phoneNumber');
        typeInInput('phoneNumber', '4519803454');
        checkInputNoError('email');
        checkInputNoError('streetAddress');
        checkInputNoError('phoneNumber');
        clickButton('Get My Quotes');
    });
});
