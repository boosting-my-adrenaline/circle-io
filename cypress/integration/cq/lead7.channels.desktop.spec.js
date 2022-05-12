describe('cq lead 7 desktop', () => {
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
        birthMonth: '11',
        birthYear: 1986,
        city: 'Dallas',
        creditRating: 'Excellent',
        currentlyInsured: 'Yes',
        doesRequireSR22: 'Y',
        education: 'Master',
        firstName: 'John',
        formType: 'lead7',
        gender: 'M',
        hasAccidents: 'No',
        incidentAmountPaid_1: '',
        incidentAmountPaid_2: '',
        incidentDate_1: '',
        incidentDate_2: '',
        incidentTypeName_1: '',
        incidentTypeName_2: '',
        incidentType_1: '',
        incidentType_2: '',
        insuranceCarrier: '21st Century',
        insuredTimeframe: 'SixToElevenMonths',
        lastName: 'Locke',
        lead: '7',
        licenseStatus: 'Valid',
        location: '75216',
        maritalStatus: 'Yes',
        moreThenOneVehicle: 'No',
        ownHome: 'No',
        secondIncident: '',
        state: 'TX',
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
        licenseStatus: 'Yes',
        doesRequireSR22: 'Yes',
        currentlyInsured: 'Yes',
        insuranceCarrier: '21st Century',
        insuredTimeframe: 'Less than year',
        gender: 'Male',
        maritalStatus: 'Yes',
        creditRating: 'Excellent',
        education: 'Masters degree',
        ownHome: 'Rent',
        hasAccidents: 'No',
        birthMonth: 'NOV',
        birthDay: '10',
        birthYear: '1986',
        yourName: ['John', 'Locke'],
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
                    `/?test=1&lead=7&lb=off&lpage=${provider}${
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
            typeInInput('inputZipCode1', 75216 + '{enter}');
            selectItem(answers.vehicleYear_1);
            selectItem(answers.vehicleMake_1);
            selectItem(answers.vehicleModel_1);
            selectItem(answers.vehicleSubModel_1);
            selectInRadioGroup(1, answers.secondVehicle);
            selectInRadioGroup(1, answers.licenseStatus);
            selectInRadioGroup(1, answers.doesRequireSR22);
            selectInRadioGroup(1, answers.currentlyInsured);
            selectItem(answers.insuranceCarrier);
            selectItem(answers.insuredTimeframe);
            selectItem(answers.gender);
            selectItem(answers.maritalStatus);
            selectItem(answers.creditRating);
            selectItem(answers.education);
            selectItem(answers.ownHome);
            selectItem(answers.hasAccidents);
            selectItem(answers.birthMonth);
            selectItem(answers.birthDay);
            selectItem(answers.birthYear);
            typeInInput('firstName', answers.yourName[0]);
            typeInInput('lastName', answers.yourName[1]);

            cy.intercept('POST', '**/results/**').as('results');
            cy.get('.funnel-form-container')
                .contains('Get My Auto Quotes')
                .click({ force: true });

            cy.wait('@results', { timeout: 60000 }).should(
                ({ request, response }) => {
                    for (const [key, value] of Object.entries(correctPayload)) {
                        expect(request.body.data[key]?.toString()).to.equal(
                            value?.toString()
                        );
                    }
                    expect(request.body.page).to.equal(provider);
                    expect(request.body.data.qrps).to.equal(sourceID);
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
