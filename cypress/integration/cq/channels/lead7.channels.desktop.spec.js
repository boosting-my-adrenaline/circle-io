describe('cq lead 7 desktop channels', () => {
    /* test function to be invoked */
    const test = (provider, channel) => {
        /* variables to be changed after parcing data */
        let answers, sourceID, correctPayload;

        before(() => {
            /* getting correct payload from fixtures/channels/channels.json */
            cy.fixture('channels/answers').then((answersData) => {
                answers = answersData.lead7;
            });

            /* getting certain source id depending on provider, channel,
                and device from fixtures/channels/channels.json */
            cy.fixture('channels/channels').then((channels) => {
                sourceID = channels[provider][channel].desktop;
            });

            /* getting correct payload from fixtures/channels/channels.json */
            cy.fixture('channels/payload').then((payload) => {
                correctPayload = payload.lead7;
            });
        });

        it(`${provider} ch: ${channel}`, () => {
            localStorage.clear();
            cy.viewport('macbook-15');
            cy.intercept('POST', 'https://create.leadid.com/**', {});
            cy.intercept('POST', 'https://info.leadid.com/**', {});

            const baseURL = 'http://test.cheaper-quotes.com';
            cy.visit(
                baseURL +
                    '/?lb=off' +
                    '&test=1' +
                    '&lead=7' +
                    `&lpage=${provider}` +
                    `${channel !== 'default' ? `&ch=${channel}` : ``}`
            );

            /* basically most of actions are custom and located in support/commands.js */
            cy.typeInInput('inputZipCode1', answers.zip + '{enter}');
            cy.selectItem(answers.vehicleYear_1, true);
            cy.selectItem(answers.vehicleMake_1, true);
            cy.selectItem(answers.vehicleModel_1, true);
            cy.selectItem(answers.vehicleSubModel_1, true);
            cy.selectInRadioGroup(1, answers.secondVehicle, true);
            cy.selectInRadioGroup(1, answers.licenseStatus, true);
            cy.selectInRadioGroup(1, answers.doesRequireSR22, true);
            cy.selectInRadioGroup(1, answers.currentlyInsured, true);
            cy.selectItem(answers.insuranceCarrier, true);
            cy.selectItem(answers.insuredTimeframe, true);
            cy.selectItem(answers.gender, true);
            cy.selectItem(answers.maritalStatus, true);
            cy.selectItem(answers.creditRating, true);
            cy.selectItem(answers.education, true);
            cy.selectItem(answers.ownHome, true);
            cy.selectItem(answers.hasAccidents, true);
            cy.selectItem(answers.birthMonth, true);
            cy.selectItem(answers.birthDay, true);
            cy.selectItem(answers.birthYear, true);
            cy.typeInInput('firstName', answers.yourName[0]);
            cy.typeInInput('lastName', answers.yourName[1]);
            cy.intercept('POST', '**/results/**').as('results');
            cy.get('.funnel-form-container')
                .contains('Get My Auto Quotes')
                .click({ force: true });

            cy.wait('@results', { timeout: 60000 }).should(
                ({ request, response }) => {
                    /* comparing of request data with correct data */
                    for (const [key, value] of Object.entries(correctPayload)) {
                        expect(request.body.data[key]?.toString()).to.equal(
                            value?.toString()
                        );
                    }

                    /* checking provider */
                    expect(request.body.page).to.equal(provider);

                    /* comparing of qrps with correct source id */
                    expect(request.body.data.qrps).to.equal(sourceID);

                    /* comparing of account id with corerct source id */
                    expect(
                        response.body.response.listingset[
                            provider === 'eq' ? 'accountId' : 'accountid'
                        ]
                    ).to.equal(sourceID);

                    /* comparing of each listing source id with correct */
                    response.body.response.listingset.listing.forEach(
                        (list) => {
                            expect(list.source_id).to.equal(sourceID);
                            expect(list.prov).to.equal(provider);
                        }
                    );
                }
            );
        });
    };

    /* starting tests itself */
    [
        {
            provider: 'sure5',
            /* sure5 channels to be tested */
            channels: [
                'default',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                's',
                'form3',
            ],
        },
        {
            provider: 'tran',
            /* tran channels to be tested */
            channels: [
                'default',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '10',
                '13',
                '14',
                '15',
                's',
                'form3',
            ],
        },
        {
            provider: 'eq',
            /* eq channels to be tested */
            channels: ['default', '1', '2', '3'],
        },
    ].forEach(({ provider, channels }) =>
        channels.forEach((channel) => test(provider, channel))
    );
});
