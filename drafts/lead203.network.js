describe('cq lead 203 newtwork', () => {
    const url = 'http://localhost:8080/?lead=203&lb=off&lpage=sure5&ch=10';
    // const url = 'test.cheaper-quotes.com';

    before(() => {
        localStorage.clear();
        cy.viewport(1500, 890);
        cy.intercept('POST', 'https://create.leadid.com/**', {});
        cy.intercept('POST', 'https://info.leadid.com/**', {});
        cy.visit(url, { headers: { 'Accept-Encoding': 'gzip, deflate' } });
    });

    // const answerSteps = [
    //     ['vehicleYear_1', 'items'],
    //     ['vehicleMake_1', 'items'],
    //     ['vehicleModel_1', 'items'],
    //     ['vehicleSubModel_1', 'items'],
    //     ['secondVehicle', 'radio'],
    //     ['vehicleYear_2', 'items'],
    //     ['vehicleMake_2', 'items'],
    //     ['vehicleModel_2', 'items'],
    //     ['vehicleSubModel_2', 'items'],
    //     ['insuranceCarrier', 'dropdown'],
    //     ['insuredTimeframe', 'items'],
    //     ['maritalStatus', 'radio'],
    //     ['birthMonth', 'items'],
    //     ['birthDay', 'items'],
    //     ['birthYear', 'items'],
    //     ['yourName', 'inputs'],
    //     ['yourPhone', 'inputs'],
    // ];

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

    const correctResponse = {
        response: {
            listingset: {
                accountid: '606319',
                zipcode: '75216',
                listing: [
                    {
                        rank: 1,
                        title: 'Drivers Switch & Save an Average of $727/Year',
                        description:
                            '<ul><li>Take advantage of Safe Driver, Sign Online, Pay-in-full, Multi-Car and other Discounts</li><li>Fast, easy and reliable claims service available 24 hours a day</li><li>Bundle your auto and home policies for additional savings</li></ul><img src="https://nextinsure.quinstage.com/ListingDisplay/handlers/imp_px.ashx?I=fd06dcc8-8cab-44da-92fe-813e2e692670&SI=525d29b4-aaf2-4e87-a741-18ade5071fa9&SDT=637876813454630917&R=1" alt="none" style="display:none;">',
                        clickurl:
                            'https://nextinsure.quinstage.com/ListingDisplay/Click/?I=ZmQwNmRjYzgtOGNhYi00NGRhLTkyZmUtODEzZTJlNjkyNjcw&U=aHR0cHM6Ly9hZC5kb3VibGVjbGljay5uZXQvY2xrOzI1OTUzMTg4MTs3MzczOTIxMTtvO3BjPSU1YlRQQVNfSUQlNWQ%2faHR0cHM6Ly93d3cucHJvZ3Jlc3NpdmUuY29tL2xwL2F1dG8tY29tcGFyZS8%2fY29kZT04MDA5MzAwNDQ0JnBob25lPTgwMDkzJnppcGNvZGU9NzUyMTYmc3JjX2NkPSRjbGlja2tleSQmZGNsaWQ9JTI1bi0xMzg0MjQ1LTYwMTI5MDEtNzM3MzkyMTEtMjU5NTMxODgxLSUyNWVyaWQh&SI=NTI1ZDI5YjQtYWFmMi00ZTg3LWE3NDEtMThhZGU1MDcxZmE5&SDT=NjM3ODc2ODEzNDU0NjMwOTE3&QP=MQ%3d%3d&V=MQ%3d%3d&B=NTY5OTYz&C=MTgx&S=NjA2MzE5&EAK=MjA0NDU2Njc2&T=MQ%3d%3d&BM=MQ%3d%3d',
                        logo: 'https://cdn.nextinsure.com/imaging/opt?u=aHR0cHM6Ly9pbWFnZXNlcnZlci5xdWluc3RyZWV0LmNvbS9jb250ZW50L29uZS81NTM1L0Zsb19TaWxob3VldHRlIHVwZGF0ZWQgc2l6ZS5wbmc%3d&w=120',
                        raw_logo:
                            'https://cdn.nextinsure.com/imaging/opt?u=aHR0cHM6Ly9pbWFnZXNlcnZlci5xdWluc3RyZWV0LmNvbS9jb250ZW50L29uZS81NTM1L0Zsb19TaWxob3VldHRlIHVwZGF0ZWQgc2l6ZS5wbmc%3d',
                        sitehost: 'www.progressive.com',
                        imp_pixel:
                            'https://nextinsure.quinstage.com/ListingDisplay/handlers/imp_px.ashx?I=fd06dcc8-8cab-44da-92fe-813e2e692670&SI=525d29b4-aaf2-4e87-a741-18ade5071fa9&SDT=637876813454630917&R=1',
                        impressionid: 'fd06dcc8-8cab-44da-92fe-813e2e692670',
                        accountid: '569963',
                        customerid: '181',
                        company: 'Progressive',
                        displayname: 'Progressive',
                        datapass_available: '1',
                        prov: 'sure5',
                        rankName: 'featured',
                        source_id: '606319',
                    },
                ],
            },
        },
    };

    // const currentStep =
    //     answerSteps[localStorage.getItem('currentStep') - 1 || 0][0] || null;
    // const currentType =
    //     answerSteps[localStorage.getItem('currentStep') - 1 || 0][1] || null;

    // it('lead 203', () => {
    //     const selectItem = (item) =>
    //         cy.get('.choice-list').contains(item).click();

    //     const selectItemFromDropDown = (item) =>
    //         cy.get('.selectbox').select(item);

    //     const clickButton = (button) =>
    //         cy.get('.funnel-form-container').contains(button).click();

    //     const selectInRadioGroup = (radiogroup, choice) =>
    //         cy
    //             .get(`.choice-holder > :nth-child(${radiogroup})`)
    //             .contains(choice)
    //             .click();

    //     const typeInInput = (input, text) =>
    //         cy.get(`#${input}`).type(text, { delay: 70 });
    //     /////////////////////////
    //     cy.get('#inputZipCode1').type('75216', { delay: 70 });
    //     cy.get(
    //         '.info-block > .newHomeAutoSbmt > .form-container > .btn'
    //     ).click();

    //     selectItem(answers.vehicleYear_1);
    //     selectItem(answers.vehicleMake_1);
    //     selectItem(answers.vehicleModel_1);
    //     selectItem(answers.vehicleSubModel_1);
    //     selectInRadioGroup(1, answers.secondVehicle);
    //     selectItemFromDropDown(answers.insuranceCarrier);
    //     clickButton('Continue');
    //     selectItem(answers.insuredTimeframe);
    //     selectInRadioGroup(1, answers.maritalStatus[0]);
    //     selectInRadioGroup(2, answers.maritalStatus[1]);
    //     selectInRadioGroup(3, answers.maritalStatus[2]);
    //     clickButton('Continue');
    //     selectItem(answers.birthMonth);
    //     selectItem(answers.birthDay);
    //     selectItem(answers.birthYear);
    //     typeInInput('firstName', answers.yourName[0]);
    //     typeInInput('lastName', answers.yourName[1]);
    //     clickButton('Continue');
    //     typeInInput('streetAddress', answers.yourPhone[0]);
    //     typeInInput('email', answers.yourPhone[1]);
    //     typeInInput('phoneNumber', answers.yourPhone[2]);

    //     cy.intercept('POST', '**/results/**').as('results');
    //     cy.get('.funnel-form-container')
    //         .contains('Get My Quotes')
    //         .click({ force: true });

    //     cy.wait('@results', { timeout: 60000 }).should(
    //         ({ request, response }) => {
    //             // expect(request.body.data).forEach((el) =>
    //             //     el.to.equal(correctPayload[el])
    //             // );
    //             for (const [key, value] of Object.entries(correctPayload)) {
    //                 expect(request.body.data[key]).to.equal(value);
    //             }
    //             // expect(request.body.page).to.equal('sure5');
    //             // expect(request.headers).to.have.property('content-type');
    //             expect(response.body.response.listingset.accountid).to.equal(
    //                 '668974'
    //             );
    //             response.body.response.listingset.listing.forEach((list) =>
    //                 expect(list.source_id).to.equal('668974')
    //             );
    //         }
    //     );
    // });
});
