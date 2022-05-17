describe('cq lead 203 interface', () => {
    /* test function to be invoked */
    const test = (device) => {
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
            cy.checkTitle('Dallas Drivers Can Save Up To $500/Year');
            cy.checkHeader('Vehicle year');
            cy.checkNoSelectedItems();
            cy.checkNoBackButton();
            device === 'desktop' ? cy.checkFooter() : cy.checkNoFooter();
            cy.checkItemInLocalStorage('zip', '75216');
            cy.checkItemInLocalStorage('location', '75216');
            cy.checkItemsAmount(24);
            cy.selectItem('2017');

            cy.checkItemInLocalStorage('vehicleYear_1', '2017');
            cy.checkHeader('Vehicle make');
            cy.stepBack();

            cy.checkNoBackButton();
            cy.checkItemSelected('2017');
            cy.selectItemFromDropDown('1996');

            cy.checkItemInLocalStorage('vehicleYear_1', '1996');
            cy.stepBack();

            cy.checkItemSelected('1996');
            cy.checkItemsAmount(25);
            cy.selectItem('2016');

            cy.checkNoSelectedItems();
            cy.checkItemsAmount(12);
            cy.selectItem('TOYOTA');

            cy.checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');
            cy.stepBack();

            cy.checkItemSelected('TOYOTA');
            cy.selectItemFromDropDown('VOLVO');

            cy.checkHeader('Vehicle model');
            cy.checkItemInLocalStorage('vehicleMake_1', 'VOLVO');
            cy.checkItemInLocalStorage('vehicleYear_1', '2016');
            cy.selectItem('S60');

            cy.checkItemInLocalStorage('vehicleModel_1', 'S60');
            cy.stepBack();

            cy.stepBack();

            cy.checkDropDown('VOLVO');
            cy.checkItemsAmount(13);
            cy.selectItem('TOYOTA');

            cy.checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');
            cy.selectItem('LAND CRUISER');

            cy.checkItemInLocalStorage('vehicleModel_1', 'LAND CRUISER');
            cy.checkHeader('Add second vehicle?');
            cy.checkEditVehicle(1, 2016, 'TOYOTA', 'LAND CRUISER');
            cy.editCar(1);

            cy.checkItemSelected('2016');
            cy.selectItem('2016');

            cy.checkItemSelected('TOYOTA');
            cy.selectItem('TOYOTA');

            cy.checkItemSelected('LAND CRUISER');
            cy.selectItem('LAND CRUISER');
            cy.checkItemInLocalStorage('vehicleYear_1', '2016');
            cy.checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');
            cy.checkItemInLocalStorage('vehicleModel_1', 'LAND CRUISER');
            cy.deleteCar(1);

            cy.checkNoSelectedItems();
            cy.selectItem('2016');

            cy.checkNoSelectedItems();
            cy.selectItem('TOYOTA');

            cy.checkNoSelectedItems();
            cy.selectItem('LAND CRUISER');
            cy.checkItemInLocalStorage('vehicleYear_1', '2016');
            cy.checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');
            cy.checkItemInLocalStorage('vehicleModel_1', 'LAND CRUISER');
            cy.clickButton('Yes');

            cy.checkNoSelectedItems();
            cy.selectItem('2020');

            cy.checkNoSelectedItems();
            cy.selectItem('CHEVROLET');

            cy.checkNoSelectedItems();
            cy.selectItem('TRAX LS');

            cy.checkEditVehicle(1, 2016, 'TOYOTA', 'LAND CRUISER');
            cy.checkEditVehicle(2, 2020, 'CHEVROLET', 'TRAX LS');
            cy.checkItemInLocalStorage('vehicleYear_2', '2020');
            cy.checkItemInLocalStorage('vehicleMake_2', 'CHEVROLET');
            cy.checkItemInLocalStorage('vehicleModel_2', 'TRAX LS');
            cy.checkItemInLocalStorage('vehicleYear_1', '2016');
            cy.checkItemInLocalStorage('vehicleMake_1', 'TOYOTA');
            cy.checkItemInLocalStorage('vehicleModel_1', 'LAND CRUISER');
            cy.checkItemInLocalStorage('moreThenOneVehicle', 'Yes');
            cy.checkHeader('Current auto insurance');
            cy.checkDropDown('Other');
            cy.clickButton('Continue');

            cy.checkItemInLocalStorage('insuranceCarrier', 'Other');
            cy.stepBack();

            cy.selectItemFromDropDown('Travelers');
            cy.clickButton('Continue');

            cy.checkHeader(
                'How long have you continuously had auto insurance?'
            );
            cy.checkNoSelectedItems();
            cy.checkItemsAmount(4);
            cy.selectItem('1 year or less');

            cy.checkItemInLocalStorage('insuredTimeframe', 'SixToElevenMonths');
            cy.checkHeader('Tell Us About The Driver');
            cy.checkRadioGroupSelected(1, 'Yes');
            cy.checkRadioGroupSelected(2, 'Yes');
            cy.checkRadioGroupSelected(3, 'Male');
            cy.clickButton('Continue');

            cy.checkItemInLocalStorage('gender', 'M');
            cy.checkItemInLocalStorage('ownHome', 'Yes');
            cy.checkItemInLocalStorage('maritalStatus', 'Yes');
            cy.stepBack();

            cy.selectInRadioGroup(1, 'No');
            cy.selectInRadioGroup(2, 'No');
            cy.selectInRadioGroup(3, 'Female');
            cy.checkRadioGroupSelected(1, 'No');
            cy.checkRadioGroupSelected(2, 'No');
            cy.checkRadioGroupSelected(3, 'Female');
            cy.clickButton('Continue');

            cy.checkItemInLocalStorage('gender', 'F');
            cy.checkItemInLocalStorage('ownHome', 'No');
            cy.checkItemInLocalStorage('maritalStatus', 'No');
            cy.checkHeader('Select your birth month?');
            cy.checkItemsAmount(12);
            cy.selectItem('NOV');

            cy.checkItemInLocalStorage('birthMonth', '11');
            cy.checkHeader('Select your birth day');
            cy.checkItemsAmount(31);
            cy.stepBack();

            cy.checkItemSelected('NOV');
            cy.selectItem('SEP');

            cy.checkItemInLocalStorage('birthMonth', '9');
            cy.selectItem('25');

            cy.checkItemInLocalStorage('birthDay', '25');
            cy.checkHeader('Select your birth year');
            cy.checkItemsAmount(24);
            cy.selectItemFromDropDown('1980');

            cy.checkItemInLocalStorage('birthYear', '1980');
            cy.checkHeader('What Is Your Name?');
            cy.stepBack();

            cy.checkItemsAmount(25);
            cy.selectItem('1990');

            cy.checkItemInLocalStorage('birthYear', '1990');
            cy.typeInInput('firstName', 'Stephen');
            cy.checkInput('firstName', 'Stephen');
            cy.typeInInput('lastName', 'Curry');
            cy.checkInput('lastName', 'Curry');
            cy.clickButton('Continue');

            cy.checkItemInLocalStorage('firstName', 'Stephen');
            cy.checkItemInLocalStorage('lastName', 'Curry');
            cy.stepBack();

            cy.checkInput('firstName', 'Stephen');
            cy.checkInput('lastName', 'Curry');
            cy.clearInput('firstName');
            cy.typeInInput('firstName', 'Klay');
            cy.clearInput('lastName');
            cy.typeInInput('lastName', 'Tompson');
            cy.clickButton('Continue');

            cy.checkItemInLocalStorage('firstName', 'Klay');
            cy.checkItemInLocalStorage('lastName', 'Tompson');
            cy.typeInInput('streetAddress', 'Miami');
            cy.typeInInput('email', 'example18');
            cy.typeInInput('phoneNumber', '54321414');
            cy.get('.funnel-form').click();
            cy.checkInputError('streetAddress');
            cy.checkInputError('email');
            cy.checkInputError('phoneNumber');
            cy.clearInput('streetAddress');
            cy.typeInInput('streetAddress', '22201 HIGHWAY 45 FRUITDALE');
            cy.clearInput('email');
            cy.typeInInput('email', 'kt1980@gmail.com');
            cy.clearInput('phoneNumber');
            cy.typeInInput('phoneNumber', '4519803454');
            cy.checkInputNoError('email');
            cy.checkInputNoError('streetAddress');
            cy.checkInputNoError('phoneNumber');
            cy.clickButton('Get My Quotes');
        });
    };

    /*  */
    ['desktop', 'mobile'].forEach((device) => test(device));
});
