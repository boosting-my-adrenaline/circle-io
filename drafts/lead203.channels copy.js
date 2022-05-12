describe('cq lead 203 newtwork', () => {
    const sure5 = {
        default: ['606319', '606319'],
        1: ['667922', '665664'],
        2: ['667877', '667878'],
        3: ['667876', '667909'],
        4: ['606319', '606319'],
        5: ['606319', '606319'],
        6: ['666066', '666066'],
        7: ['667909', '667909'],
        10: ['668974', '668975'],
        11: ['669481', '669482'],
        13: ['606319', '606319'],
        14: ['606319', '606319'],
        15: ['606319', '606319'],
        s: ['666067', '666067'],
        form3: ['606319', '606319'],
    };

    const tran = {
        default: ['6130', '6130'],
        1: ['6130', '6130'],
        2: ['7742', '7740'],
        3: ['6130', '6130'],
        4: ['6698', '6698'],
        5: ['6130', '6130'],
        6: ['6130', '6130'],
        7: ['6130', '6130'],
        10: ['7741', '7739'],
        13: ['7478', '7478'],
        14: ['7476', '7477'],
        15: ['6130', '6130'],
        s: ['6130', '6130'],
        form3: ['5977', '5977'],
    };

    const eq = {
        default: ['SEM Tier 3', 'SEM Tier 3'],
        1: ['SEM Tier 1', 'SEM Tier 1'],
        2: ['SEM Tier 2', 'SEM Tier 2'],
        3: ['SEM Tier 3', 'SEM Tier 3'],
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
        funnelForm: 1,
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

    const getUrl = (provider, channel) =>
        // `http://test.cheaper-quotes.com/?test=1&lead=203&lb=off&lpage=${provider}${
        `http://localhost:8080/?lead=203&lb=off&lpage=${provider}${
            // `http://localhost:8080/?lead=203&lpage=${provider}${
            channel !== 'default' ? `&ch=${channel}` : ``
        }`;

    const getBefore = (agent, provider, channel) => {
        localStorage.clear();
        agent === 'desktop' ? cy.viewport('macbook-15') : cy.viewport(320, 690);
        // cy.viewport(414, 896);
        cy.intercept('POST', 'https://create.leadid.com/**', {});
        cy.intercept('POST', 'https://info.leadid.com/**', {});
        cy.visit(
            getUrl(provider, channel),
            // agent === 'mobile'?
            {
                'user-agent':
                    // 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G532G Build/MMB29T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.83 Mobile Safari/537.36',
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
            }
            // : {}
        );
    };

    const test = (agent, provider, channel, sourceID) =>
        it(`${provider} ${agent} ch: ${channel}`, () => {
            getBefore(agent, provider, channel);

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
            /////////////////////////
            cy.get('#inputZipCode1').type('75216', { delay: 10 });
            cy.get(
                '.info-block > .newHomeAutoSbmt > .form-container > .btn'
            ).click();

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
                    // expect(request.body.data).forEach((el) =>
                    //     el.to.equal(correctPayload[el])
                    // );
                    for (const [key, value] of Object.entries(correctPayload)) {
                        expect(request.body.data[key]?.toString()).to.equal(
                            value?.toString()
                        );
                    }
                    expect(request.body.page).to.equal(provider);
                    expect(
                        response.body.response.listingset.accountid
                    ).to.equal(sourceID);
                    response.body.response.listingset.listing.forEach((list) =>
                        expect(list.source_id).to.equal(sourceID)
                    );
                }
            );
        });

    let testProvider = (provider) => {
        for (const [channel, value] of Object.entries(provider[0])) {
            value.forEach((id, i) =>
                i === 0
                    ? test('desktop', provider[1], channel, id)
                    : test('mobile', provider[1], channel, id)
            );
        }
    };

    // [
    //     // [eq, 'eq'],
    //     [tran, 'tran'],
    //     // [sure5, 'sure5'],
    // ].forEach((provider) => testProvider(provider));
});

// const correctResponse = {
//     response: {
//         listingset: {
//             accountid: '606319',
//             zipcode: '75216',
//             listing: [
//                 {
//                     rank: 1,
//                     title: 'Drivers Switch & Save an Average of $727/Year',
//                     description:
//                         '<ul><li>Take advantage of Safe Driver, Sign Online, Pay-in-full, Multi-Car and other Discounts</li><li>Fast, easy and reliable claims service available 24 hours a day</li><li>Bundle your auto and home policies for additional savings</li></ul><img src="https://nextinsure.quinstage.com/ListingDisplay/handlers/imp_px.ashx?I=fd06dcc8-8cab-44da-92fe-813e2e692670&SI=525d29b4-aaf2-4e87-a741-18ade5071fa9&SDT=637876813454630917&R=1" alt="none" style="display:none;">',
//                     clickurl:
//                         'https://nextinsure.quinstage.com/ListingDisplay/Click/?I=ZmQwNmRjYzgtOGNhYi00NGRhLTkyZmUtODEzZTJlNjkyNjcw&U=aHR0cHM6Ly9hZC5kb3VibGVjbGljay5uZXQvY2xrOzI1OTUzMTg4MTs3MzczOTIxMTtvO3BjPSU1YlRQQVNfSUQlNWQ%2faHR0cHM6Ly93d3cucHJvZ3Jlc3NpdmUuY29tL2xwL2F1dG8tY29tcGFyZS8%2fY29kZT04MDA5MzAwNDQ0JnBob25lPTgwMDkzJnppcGNvZGU9NzUyMTYmc3JjX2NkPSRjbGlja2tleSQmZGNsaWQ9JTI1bi0xMzg0MjQ1LTYwMTI5MDEtNzM3MzkyMTEtMjU5NTMxODgxLSUyNWVyaWQh&SI=NTI1ZDI5YjQtYWFmMi00ZTg3LWE3NDEtMThhZGU1MDcxZmE5&SDT=NjM3ODc2ODEzNDU0NjMwOTE3&QP=MQ%3d%3d&V=MQ%3d%3d&B=NTY5OTYz&C=MTgx&S=NjA2MzE5&EAK=MjA0NDU2Njc2&T=MQ%3d%3d&BM=MQ%3d%3d',
//                     logo: 'https://cdn.nextinsure.com/imaging/opt?u=aHR0cHM6Ly9pbWFnZXNlcnZlci5xdWluc3RyZWV0LmNvbS9jb250ZW50L29uZS81NTM1L0Zsb19TaWxob3VldHRlIHVwZGF0ZWQgc2l6ZS5wbmc%3d&w=120',
//                     raw_logo:
//                         'https://cdn.nextinsure.com/imaging/opt?u=aHR0cHM6Ly9pbWFnZXNlcnZlci5xdWluc3RyZWV0LmNvbS9jb250ZW50L29uZS81NTM1L0Zsb19TaWxob3VldHRlIHVwZGF0ZWQgc2l6ZS5wbmc%3d',
//                     sitehost: 'www.progressive.com',
//                     imp_pixel:
//                         'https://nextinsure.quinstage.com/ListingDisplay/handlers/imp_px.ashx?I=fd06dcc8-8cab-44da-92fe-813e2e692670&SI=525d29b4-aaf2-4e87-a741-18ade5071fa9&SDT=637876813454630917&R=1',
//                     impressionid: 'fd06dcc8-8cab-44da-92fe-813e2e692670',
//                     accountid: '569963',
//                     customerid: '181',
//                     company: 'Progressive',
//                     displayname: 'Progressive',
//                     datapass_available: '1',
//                     prov: 'sure5',
//                     rankName: 'featured',
//                     source_id: '606319',
//                 },
//             ],
//         },
//     },
// };
