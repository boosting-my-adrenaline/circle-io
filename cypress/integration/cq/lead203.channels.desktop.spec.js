describe('cq lead 203 desktop', () => {
    const sure5 = {
        default: '606319',
        1: '667922',
        2: '667877',
        3: '667876',
        4: '606319',
        5: '606319',
        6: '666066',
        7: '667909',
        10: '668974',
        11: '669481',
        13: '606319',
        14: '606319',
        15: '606319',
        s: '666067',
        form3: '606319',
    };

    const tran = {
        default: '6130',
        1: '6130',
        2: '7742',
        3: '6130',
        4: '6698',
        5: '6130',
        6: '6130',
        7: '6130',
        10: '7741',
        13: '7478',
        14: '7476',
        15: '6130',
        s: '6130',
        form3: '5977',
    };

    const eq = {
        default: 'SEM_Tier_3',
        1: 'SEM_Tier_1',
        2: 'SEM_Tier_2',
        3: 'SEM_Tier_3',
    };

    const correctPayload = {
        birthDay: 10,
        birthMonth: 11,
        birthYear: 1986,
        city: 'Dallas',
        creditRating: 'Good',
        currentlyInsured: 'Yes',
        doesRequireSR22: 'N',
        education: 'Associate',
        email: 'example@gmail.com',
        firstName: 'John',
        gender: 'F',
        hasAccidents: 'No',
        insuranceCarrier: '21st Century',
        insuredTimeframe: 'SixToElevenMonths',
        lastName: 'Locke',
        lb: 'off',
        lead: '203',
        leadVersion: '203',
        licenseStatus: 'Valid',
        location: '75216',
        maritalStatus: 'No',
        moreThenOneVehicle: 'No',
        ownHome: 'No',
        phoneNumber: '(865) 234-1452',
        state: 'TX',
        streetAddress: 'street 26',
        test: 1,
        vehicleMake_1: 'CHEVROLET',
        vehicleMake_2: '',
        vehicleModel_1: 'CAMARO SS',
        vehicleModel_2: '',
        vehicleSubModel_1: 'COUPE 2 DOOR',
        vehicleSubModel_2: '',
        vehicleYear_1: 2021,
        vehicleYear_2: '',
        zip: '75216',
    };

    const answers = {
        vehicleYear_1: '2021',
        vehicleMake_1: 'CHEVROLET',
        vehicleModel_1: 'CAMARO SS',
        vehicleSubModel_1: 'COUPE 2 DOOR',
        secondVehicle: 'No',
        insuranceCarrier: '21st Century',
        insuredTimeframe: '1 year or less',
        maritalStatus: ['No', 'No', 'Female'],
        birthMonth: 'NOV',
        birthDay: '10',
        birthYear: '1986',
        yourName: ['John', 'Locke'],
        yourPhone: ['street 26', 'example@gmail.com', '8652341452'],
    };

    // const baseURL = 'http://localhost:8080';
    const baseURL = 'http://test.cheaper-quotes.com';

    const test = (provider, channel, sourceID) =>
        it(`${provider} ch: ${channel}`, () => {
            localStorage.clear();
            cy.viewport('macbook-15');
            cy.intercept('POST', 'https://create.leadid.com/**', {});
            cy.intercept('POST', 'https://info.leadid.com/**', {});
            cy.visit(
                baseURL +
                    `/?test=1&lead=203&lb=off&lpage=${provider}${
                        channel !== 'default' ? `&ch=${channel}` : ``
                    }`
            );
            const selectItem = (item) =>
                cy.get('.choice-list').contains(item).click();

            const selectItemFromDropDown = (item) =>
                cy.get('.selectbox').select(item);

            const clickButton = (button) =>
                cy.get('.funnel-form-container').contains(button).click();

            const selectInRadioGroup = (radiogroup, choice) =>
                cy
                    .get(`.choice-holder > :nth-child(${radiogroup})`)
                    .contains(choice)
                    .click();

            const typeInInput = (input, text) =>
                cy.get(`#${input}`).type(text, { delay: 10 });

            /////////////////////////////////////////////////////////////
            // cy.get('#inputZipCode1').type('75216', { delay: 10 });
            typeInInput('inputZipCode1', 75216 + '{enter}');
            // cy.get('.info-block').contains('Get Started').click();

            selectItem(answers.vehicleYear_1);
            selectItem(answers.vehicleMake_1);
            selectItem(answers.vehicleModel_1);
            selectItem(answers.vehicleSubModel_1);
            selectInRadioGroup(1, answers.secondVehicle);
            selectItemFromDropDown(answers.insuranceCarrier);
            clickButton('Continue');
            selectItem(answers.insuredTimeframe);
            selectInRadioGroup(1, answers.maritalStatus[0]);
            selectInRadioGroup(2, answers.maritalStatus[1]);
            selectInRadioGroup(3, answers.maritalStatus[2]);
            clickButton('Continue');
            selectItem(answers.birthMonth);
            selectItem(answers.birthDay);
            selectItem(answers.birthYear);
            typeInInput('firstName', answers.yourName[0]);
            typeInInput('lastName', answers.yourName[1]);
            clickButton('Continue');
            typeInInput('streetAddress', answers.yourPhone[0]);
            typeInInput('email', answers.yourPhone[1]);
            typeInInput('phoneNumber', answers.yourPhone[2]);

            cy.intercept('POST', '**/results/**').as('results');
            cy.get('.funnel-form-container')
                .contains('Get My Quotes')
                .click({ force: true });

            cy.wait('@results', { timeout: 60000 }).should(
                ({ request, response }) => {
                    for (const [key, value] of Object.entries(correctPayload)) {
                        expect(request.body.data[key]?.toString()).to.equal(
                            value?.toString()
                        );
                    }
                    expect(request.body.page).to.equal(provider);
                    expect(
                        response.body.response.listingset[
                            provider === 'eq' ? 'accountId' : 'accountid'
                        ]
                    ).to.equal(sourceID);
                    response.body.response.listingset.listing.forEach(
                        (list) => {
                            expect(list.source_id).to.equal(sourceID);
                            expect(list.prov).to.equal(provider);
                        }
                    );
                }
            );
        });

    [
        [tran, 'tran'],
        [sure5, 'sure5'],
        [eq, 'eq'],
    ].forEach((provider) => {
        for (const [channel, id] of Object.entries(provider[0])) {
            test(provider[1], channel, id);
        }
    });
});
