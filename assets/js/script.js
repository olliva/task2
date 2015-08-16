/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name: 'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'}
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */

function getData2(url) {
    return new Promise(function (resolve, reject) {
        function callback(error, result) {
            if (!error) {
                resolve(result);
                return;
            }
            reject(error);
        }

        getData(url, callback);
    });
}

function getPopulation(countryOrCity, [allCities, populations]) {
    var countryOrCityLower = countryOrCity.toLowerCase();

    var cityNames = new Set(
        allCities
            .filter(c => c.country.toLowerCase() == countryOrCityLower || c.name.toLowerCase() == countryOrCityLower)
            .map(c => c.name.toLowerCase()));

    if (cityNames.size === 0) {
        return undefined;
    }

    return populations
        .filter(p => cityNames.has(p.name.toLowerCase()))
        .reduce((sum, p) => sum + p.count, 0);
}

var requests = ['/cities', '/populations'];

function requestPopulation(){
    Promise.all(requests.map(getData2))
        .then(function (values) {
            var countryOrCity = prompt('Get population of country/city\nEnter country or city:', '');

            if (!countryOrCity) {
                alert('You haven\'t entered any country/city');
                return;
            }

            var population = getPopulation(countryOrCity, values);
            if (population === undefined) {
                alert(`We haven\'t found any country or city matching ${countryOrCity}`);
            }
            else {
                alert(`Total population in ${countryOrCity}: ${population}`);
            }
        })
        .catch(() => alert(':(\nSomething went wrong loading population data'));
}
requestPopulation();
document.getElementById('get-population').addEventListener('click',requestPopulation);
