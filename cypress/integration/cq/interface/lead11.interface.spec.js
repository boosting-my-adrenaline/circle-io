describe('cq lead 11 interface', () => {
    /* test function to be invoked */
    const test = (device) => {
        it(`lead 11 ${device}`, () => {
            localStorage.clear();
            cy.viewport(device === 'desktop' ? 'macbook-15' : 'iphone-x');
            cy.intercept('POST', 'https://create.leadid.com/**');
            cy.intercept('POST', 'https://info.leadid.com/**');
            cy.intercept('POST', 'https://in.hotjar.com/**');

            const baseUrl = 'test.cheaper-quotes.com';
            cy.visit(baseUrl + '/?lead=11' + '&lb=off');

            cy.title().should('include', 'Cheaper-Quotes');
            cy.typeInInput('inputZipCode1', '75216');
            cy.get('.form-section').contains('Get Your Quotes').click();

            /* basically most of actions are custom and located in support/commands.js */
            /* actions splited to blocks of strings by its step (also url) */
            cy.checkHeader('Select your vehicle year');
            cy.checkNoSelectedItems();
            cy.checkNoBackButton();
            device === 'desktop' ? cy.checkFooter() : cy.checkNoFooter();
            cy.checkItemInLocalStorageFFR(
                ['zip', '75216'],
                ['location', '75216'],
                ['lead', '11'],
                ['leadVersion', '11']
            );
            cy.checkItemsAmount(40);
            cy.selectItem('2017');

            cy.checkItemInLocalStorageFFR('vehicleYear_1', '2017');
            cy.checkHeader('Select your vehicle make');
            cy.stepBack();

            cy.checkNoBackButton();
            cy.checkItemSelected('2017');
            cy.selectItem('1986', true);

            cy.checkItemInLocalStorageFFR('vehicleYear_1', '1986');
            cy.stepBack();

            cy.checkItemSelected('1986');
            cy.checkItemsAmount(40);
            cy.selectItem('2016');

            cy.checkItemsAmount(12);
            cy.checkNoSelectedItems();
            cy.selectItem('TOYOTA');

            cy.checkItemInLocalStorageFFR('vehicleMake_1', 'TOYOTA');
            cy.stepBack();

            cy.checkItemSelected('TOYOTA');
            cy.clickButton('All makes');
            cy.checkItemsAmount(44);
            cy.selectItem('VOLVO');

            cy.checkHeader('Select your model');
            cy.checkItemInLocalStorageFFR(
                ['vehicleMake_1', 'VOLVO'],
                ['vehicleYear_1', '2016']
            );
            cy.selectItem('S60');

            cy.checkItemInLocalStorageFFR('vehicleModel_1', 'S60');
            cy.stepBack();

            cy.stepBack();

            cy.checkItemsAmount(13);
            cy.selectItem('TOYOTA');

            cy.checkItemInLocalStorageFFR('vehicleMake_1', 'TOYOTA');
            cy.selectItem('LAND CRUISER');

            cy.checkItemInLocalStorageFFR('vehicleModel_1', 'LAND CRUISER');
            cy.checkHeader('Add second vehicle? (Save additional 20%)');
            cy.checkEditVehicle(1, 2016, 'TOYOTA', 'LAND CRUISER', true);
            cy.editCar(1);

            cy.checkItemSelected('2016');
            cy.selectItem('2016');

            cy.checkItemSelected('TOYOTA');
            cy.selectItem('TOYOTA');

            cy.checkItemSelected('LAND CRUISER');
            cy.selectItem('LAND CRUISER');

            cy.checkItemInLocalStorageFFR(
                ['vehicleYear_1', '2016'],
                ['vehicleMake_1', 'TOYOTA'],
                ['vehicleModel_1', 'LAND CRUISER']
            );
            cy.deleteCar(1);

            cy.checkNoSelectedItems();
            cy.selectItem('2016');

            cy.checkNoSelectedItems();
            cy.selectItem('TOYOTA');

            cy.checkNoSelectedItems();
            cy.selectItem('LAND CRUISER');
            cy.checkItemInLocalStorageFFR(
                ['vehicleYear_1', '2016'],
                ['vehicleMake_1', 'TOYOTA'],
                ['vehicleModel_1', 'LAND CRUISER']
            );
            cy.clickButton('Yes');

            cy.checkNoSelectedItems();
            cy.selectItem('2020');

            cy.checkNoSelectedItems();
            cy.selectItem('CHEVROLET');

            cy.checkNoSelectedItems();
            cy.clickButton('All models');
            cy.selectItem('TRAX LS');

            cy.checkItemInLocalStorageFFR(
                ['vehicleYear_2', '2020'],
                ['vehicleMake_2', 'CHEVROLET'],
                ['vehicleModel_2', 'TRAX LS'],
                ['vehicleYear_1', '2016'],
                ['vehicleMake_1', 'TOYOTA'],
                ['vehicleModel_1', 'LAND CRUISER']
            );
            cy.checkItemInLocalStorageFFR('moreThenOneVehicle', 'Yes');
            cy.checkHeader('Do you have a valid drivers license?');
            cy.selectItem('No');

            cy.checkHeader('Do you need an SR-22?');
            cy.checkItemInLocalStorageFFR('licenseStatus', 'Expired');
            cy.stepBack();

            cy.checkItemSelected('No');
            cy.selectItem('Yes');

            cy.checkItemInLocalStorageFFR('licenseStatus', 'Valid');
            cy.selectItem('No');

            cy.checkHeader('Have you had auto insurance in the past 30 days?');
            cy.checkItemInLocalStorageFFR('doesRequireSR22', 'N');
            cy.stepBack();

            cy.checkItemSelected('No');
            cy.selectItem('Yes');

            cy.checkItemInLocalStorageFFR('doesRequireSR22', 'Y');
            cy.selectItem('No');

            cy.checkItemInLocalStorageFFR('currentlyInsured', 'No');
            cy.stepBack();

            cy.checkItemSelected('No');
            cy.selectItem('Yes');

            cy.checkItemInLocalStorageFFR('currentlyInsured', 'Yes');
            cy.checkEditVehicle(1, 2016, 'TOYOTA', 'LAND CRUISER', true);
            cy.checkEditVehicle(2, 2020, 'CHEVROLET', 'TRAX LS', true);
            cy.selectItem('Other');

            cy.checkItemInLocalStorageFFR('insuranceCarrier', 'other');
            cy.stepBack();

            cy.checkItemSelected('Other');
            cy.selectItem('Travelers');
            cy.checkHeader(
                'How long have you continuously had auto insurance?'
            );
            cy.checkNoSelectedItems();
            cy.checkItemsAmount(4);
            cy.selectItem('4+ year');

            cy.checkItemInLocalStorageFFR(
                'insuredTimeframe',
                'FiveYearsorMore'
            );
            cy.stepBack();

            cy.checkItemSelected('4+ year');
            cy.selectItem('Less than year');

            cy.checkItemInLocalStorageFFR(
                'insuredTimeframe',
                'SixToElevenMonths'
            );
            cy.checkHeader('Gender');
            cy.checkItemsAmount(3);
            cy.checkNoSelectedItems();
            cy.selectItem('Female');

            cy.checkItemInLocalStorageFFR('gender', 'F');
            cy.checkHeader('Married?');
            cy.stepBack();

            cy.checkItemSelected('Female');
            cy.selectItem('Male');

            cy.checkItemInLocalStorageFFR('gender', 'M');
            cy.selectItem('No');

            cy.checkItemInLocalStorageFFR('maritalStatus', 'No');
            cy.checkHeader('What is your credit score?');
            cy.checkItemsAmount(5);
            cy.stepBack();

            cy.selectItem('Yes');

            cy.checkItemInLocalStorageFFR('maritalStatus', 'Yes');
            cy.selectItem("Not Sure (that's okay!)");

            cy.checkItemInLocalStorageFFR('creditRating', 'Do not know');
            cy.checkHeader('What is your education level?');
            cy.checkItemsAmount(7);
            cy.stepBack('');

            cy.checkItemSelected("Not Sure (that's okay!)");
            cy.selectItem('Excellent (720+)');

            cy.checkItemInLocalStorageFFR('creditRating', 'Excellent');
            cy.selectItem('Incomplete');

            cy.checkItemInLocalStorageFFR('education', 'Other');
            cy.checkHeader('Homeowner?');
            cy.stepBack();

            cy.checkItemSelected('Incomplete');
            cy.selectItem('Masters degree');

            cy.checkItemInLocalStorageFFR('education', 'Master');
            cy.selectItem('Own');

            cy.checkItemInLocalStorageFFR('ownHome', 'Yes');
            cy.checkHeader(
                'Have you had claims, accidents or violations in the last 3 years?'
            );
            cy.stepBack();

            cy.checkItemSelected('Own');
            cy.selectItem('Rent');

            cy.checkItemInLocalStorageFFR('ownHome', 'No');
            cy.selectItem('No');

            cy.checkItemInLocalStorageFFR(
                ['hasAccidents', 'No'],
                ['incidentDate_1', ''],
                ['incidentDate_2', ''],
                ['incidentTypeName_1', ''],
                ['incidentTypeName_2', ''],
                ['incidentType_1', ''],
                ['incidentType_2', ''],
                ['secondIncident', '']
            );
            cy.checkHeader('Select your birth month?');
            cy.checkItemsAmount(12);
            cy.stepBack();

            cy.checkItemSelected('No');
            cy.selectItem('Yes');

            cy.checkItemInLocalStorageFFR('hasAccidents', 'Yes');
            cy.checkHeader('What type of incident was it?');
            cy.checkItemsAmount(7);
            cy.selectItem('Accident: Not At Fault');

            cy.checkItemInLocalStorageFFR(
                ['incidentTypeName_1', 'accident'],
                ['incidentType_1', 'NotAtFaultNotListed']
            );
            cy.checkHeader('When did the incident occur?');
            cy.checkItemsAmount(3);
            cy.stepBack();

            cy.selectItem('Violation: Speeding');

            cy.checkItemInLocalStorageFFR(
                ['incidentTypeName_1', 'violation'],
                ['incidentType_1', 'Speeding']
            );
            cy.selectItem('Less than year');

            cy.checkValueWithDateSomeMonthesAgo('incidentDate_1', 6);
            cy.checkHeader(
                'Have you had additional claims, accidents or violations in the last 3 years?'
            );
            cy.selectItem('No');

            cy.checkItemInLocalStorageFFR('secondIncident', 'No');
            cy.checkHeader('Select your birth month?');
            cy.stepBack();

            cy.checkItemSelected('No');
            cy.selectItem('Yes');

            cy.checkItemInLocalStorageFFR('secondIncident', 'Yes');
            cy.checkHeader('What type of incident was it?');
            cy.checkItemsAmount(7);
            cy.selectItem('Claim: Theft');

            cy.checkItemInLocalStorageFFR(
                ['incidentTypeName_2', 'claim'],
                ['incidentType_2', 'VehicleStolen']
            );
            cy.checkHeader('When did the incident occur?');
            cy.checkItemsAmount(3);
            cy.stepBack();

            cy.checkItemSelected('Claim: Theft');
            cy.selectItem('Violation: Other Ticket');

            cy.checkItemInLocalStorageFFR(
                ['incidentTypeName_2', 'violation'],
                ['incidentType_2', 'ViolationNotListed']
            );
            cy.selectItem('2-3 years ago');

            cy.checkValueWithDateSomeMonthesAgo('incidentDate_2', 18);
            cy.stepBack();

            cy.checkItemSelected('2-3 years ago');
            cy.selectItem('1-2 years ago');

            cy.checkValueWithDateSomeMonthesAgo('incidentDate_2', 12);
            cy.selectItem('JAN');

            cy.checkItemInLocalStorageFFR('birthMonth', '1');
            cy.checkHeader('Select your birth day');
            cy.checkItemsAmount(31);
            cy.stepBack();

            cy.checkItemSelected('JAN');
            cy.selectItem('DEC');

            cy.checkItemInLocalStorageFFR('birthMonth', '12');
            cy.selectItem('13');

            cy.checkItemInLocalStorageFFR('birthDay', '13');
            cy.checkHeader('Select your birth year');
            cy.checkItemsAmount(60);
            cy.stepBack();

            cy.checkItemSelected('13');
            cy.selectItem('31');

            cy.checkItemInLocalStorageFFR('birthDay', '31');
            cy.clickButton('All years');
            cy.checkItemsAmount(100);
            cy.selectItem('1931');

            cy.checkItemInLocalStorageFFR('birthYear', '1931');
            cy.checkHeader('What is your name?');
            cy.stepBack();

            cy.checkItemsAmount(60);
            cy.clickButton('All years');
            cy.checkItemSelected('1931');
            cy.selectItem('1990');

            cy.checkItemInLocalStorageFFR('birthYear', '1990');
            cy.typeInInput('firstName', 'Stephen');
            cy.checkInput('firstName', 'Stephen');
            cy.typeInInput('lastName', 'Curry');
            cy.checkInput('lastName', 'Curry');
            cy.clickButton('Continue');

            cy.checkItemInLocalStorageFFR(
                ['firstName', 'Stephen'],
                ['lastName', 'Curry']
            );
            cy.stepBack();

            cy.checkInput('firstName', 'Stephen');
            cy.checkInput('lastName', 'Curry');
            cy.clearInput('firstName');
            cy.typeInInput('firstName', 'Klay');
            cy.clearInput('lastName');
            cy.typeInInput('lastName', 'Tompson');
            cy.clickButton('Continue');

            cy.checkItemInLocalStorageFFR(
                ['firstName', 'Klay'],
                ['lastName', 'Tompson']
            );
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
            cy.checkInputNoError('email', true);
            cy.checkInputNoError('streetAddress', true);
            cy.checkInputNoError('phoneNumber', true);
            // cy.clickButton('Get My Quotes', false, { force: true });
        });
    };

    /*  */
    ['desktop', 'mobile'].forEach((device) => test(device));
});
