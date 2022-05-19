import { dataJSON } from './getJSON';

const getRandomFromArray = (array) =>
    array[Math.floor(Math.random() * array.length)];

const getRandomVehicle = () => {
    const getRandomAnswerBasedOnPreviousAnswers = (data, make, model) => {
        const array = [];
        data.forEach((makes) => {
            for (const [key, value] of Object.entries(makes)) {
                !make
                    ? key === 'value' && array.push(value)
                    : key === 'value' &&
                      value === make &&
                      makes.data.forEach((models) => {
                          for (const [key, value] of Object.entries(models)) {
                              !model
                                  ? key === 'value' && array.push(value)
                                  : key === 'value' &&
                                    value === model &&
                                    models.data.forEach((submodels) => {
                                        for (const [
                                            key,
                                            value,
                                        ] of Object.entries(submodels)) {
                                            key === 'value' &&
                                                array.push(value);
                                        }
                                    });
                          }
                      });
            }
        });
        return getRandomFromArray(array);
    };
    const years = Array.from({ length: 41 }, (_, i) => (i + 1983).toString());
    const year = years[Math.floor(Math.random() * years.length)];
    const data = dataJSON[year];
    const make = getRandomAnswerBasedOnPreviousAnswers(data);
    const model = getRandomAnswerBasedOnPreviousAnswers(data, make);
    const submodel = getRandomAnswerBasedOnPreviousAnswers(data, make, model);

    return { year, make, model, submodel };
};

const getRandomBirthDate = (fromYear, toYear) => {
    const getRandomBetween = (from, to) =>
        Math.floor(Math.random() * (to - from + 1)) + from;
    const year = getRandomBetween(fromYear, toYear);
    const month = getRandomBetween(1, 12);
    const day = getRandomBetween(
        1,
        [1, 3, 5, 7, 8, 10, 12].includes(month)
            ? 31
            : month !== 2
            ? 30
            : year % 4
            ? 28
            : 29
    );
    return {
        year: year.toString(),
        month: month.toString(),
        day: day.toString(),
    };
};

export const getRandomUser = (lead) => {
    const {
        firstNames,
        lastNames,
        addresses,
        phoneNumbers,
        emails,
        insuranceCarriers,
        insuredTime,
        creditScores,
        educations,
        accidents,
        accidentDates,
    } = dataJSON.userData;

    const {
        year: vehicleYear_1,
        make: vehicleMake_1,
        model: vehicleModel_1,
        submodel: vehicleSubModel_1,
    } = getRandomVehicle();

    const {
        year: vehicleYear_2,
        make: vehicleMake_2,
        model: vehicleModel_2,
        submodel: vehicleSubModel_2,
    } = getRandomVehicle();

    const secondVehicle = getRandomFromArray(['Yes', 'No']);
    const licenseStatus = getRandomFromArray(['Yes', 'No']);
    const maritalStatus = getRandomFromArray(['Yes', 'No']);
    const ownHome = getRandomFromArray(['Yes', 'No']);
    const doesRequireSR22 = getRandomFromArray(['Yes', 'No']);
    const hasAccidents = getRandomFromArray(['Yes', 'No']);
    const secondIncident =
        hasAccidents === 'Yes' ? getRandomFromArray(['Yes', 'No']) : 'No';

    const incidentType_1 =
        hasAccidents === 'Yes' ? getRandomFromArray(accidents) : '';
    const incidentDate_1 =
        hasAccidents === 'Yes' ? getRandomFromArray(accidentDates) : '';

    const incidentType_2 =
        secondIncident === 'Yes' ? getRandomFromArray(accidents) : '';
    const incidentDate_2 =
        secondIncident === 'Yes' ? getRandomFromArray(accidentDates) : '';

    const gender = getRandomFromArray(
        ['6', '7', '21'].includes(lead)
            ? ['Male', 'Female', 'Non-Binary']
            : ['Male', 'Female']
    );

    const firstName = getRandomFromArray(
        gender === 'Non-Binary'
            ? [...firstNames.male, ...firstNames.female]
            : firstNames[gender === 'Male' ? 'male' : 'female']
    );

    const lastName = getRandomFromArray(lastNames);

    const {
        zip,
        city,
        state,
        street: streetAddress,
    } = getRandomFromArray(addresses);

    const email = getRandomFromArray(emails);
    const insuranceCarrier = getRandomFromArray(insuranceCarriers);
    const creditRating = getRandomFromArray(creditScores);
    const education = getRandomFromArray(educations);
    const currentlyInsured = insuranceCarrier === 'No' ? 'No' : 'Yes';

    const insuredTimeframe = getRandomFromArray(
        insuredTime[['202', '203'].includes(lead) ? 'new' : 'standart']
    );

    const {
        year: birthYear,
        month: birthMonth,
        day: birthDay,
    } = getRandomBirthDate(1905, 2003);

    const phoneNumber = getRandomFromArray(phoneNumbers);

    return {
        zip,
        city,
        state,
        vehicleYear_1,
        vehicleMake_1,
        vehicleModel_1,
        vehicleSubModel_1,
        secondVehicle,
        vehicleYear_2: secondVehicle === 'Yes' ? vehicleYear_2 : '',
        vehicleMake_2: secondVehicle === 'Yes' ? vehicleMake_2 : '',
        vehicleModel_2: secondVehicle === 'Yes' ? vehicleModel_2 : '',
        vehicleSubModel_2: secondVehicle === 'Yes' ? vehicleSubModel_2 : '',
        licenseStatus,
        doesRequireSR22,
        currentlyInsured,
        insuranceCarrier,
        insuredTimeframe,
        gender,
        maritalStatus,
        creditRating,
        education,
        ownHome,
        hasAccidents,
        incidentType_1,
        incidentDate_1,
        secondIncident,
        incidentType_2,
        incidentDate_2,
        birthMonth,
        birthDay,
        birthYear,
        firstName,
        lastName,
        streetAddress,
        email,
        phoneNumber,
    };
};

// ('zip'); --
// ('city'); --
// ('state'); --
// ('vehicleYear_1'); --
// ('vehicleMake_1'); --
// ('vehicleModel_1'); --
// ('vehicleSubModel_1'); --
// ('moreThenOneVehicle'); --
// ('vehicleYear_2'); --
// ('vehicleMake_2'); --
// ('vehicleModel_2'); --
// ('vehicleSubModel_2'); --
// ('insuranceCarrier'); --
// ('currentlyInsured'); --
// ('insuredTimeframe'); --
// ('ownHome'); --
// ('maritalStatus'); --
// ('gender'); --
// ('birthMonth'); --
// ('birthDay'); --
// ('birthYear'); --
// ('firstName'); --
// ('lastName'); --
// streetAddress --
// email --
// phoneNumber --
