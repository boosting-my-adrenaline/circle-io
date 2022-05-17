import { actions } from '../../../userActions';
/* getting emulated user's actions we need to run tests from userActions.js */
const {
    selectItem,
    selectInRadioGroup,
    selectItemFromDropDown,
    typeInInput,
    clickButton,
} = actions;

describe('cq lead 203 desktop channels', () => {
    /* test function to be invoked */
    const test = (provider, channel) => {
        /* variables to be changed after parcing data */
        let answers, sourceID, correctPayload;

        before(() => {
            /* getting correct payload from fixtures/channels/channels.json */
            cy.fixture('channels/answers').then((answersData) => {
                answers = answersData.lead203;
            });

            /* getting certain source id depending on provider, channel,
                and device from fixtures/channels/channels.json */
            cy.fixture('channels/channels').then((channels) => {
                sourceID = channels[provider][channel].desktop;
            });

            /* getting correct payload from fixtures/channels/channels.json */
            cy.fixture('channels/payload').then((payload) => {
                correctPayload = payload.lead203;
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
                    '&lead=203' +
                    `&lpage=${provider}` +
                    `${channel !== 'default' ? `&ch=${channel}` : ``}`
            );

            typeInInput('inputZipCode1', answers.zip + '{enter}');
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
