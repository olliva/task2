/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function getData(url, callback) {
    var RESPONSES = {
        '/countries': [{ name: 'Cameroon', continent: 'Africa' }, { name: 'Fiji Islands', continent: 'Oceania' }, { name: 'Guatemala', continent: 'North America' }, { name: 'Japan', continent: 'Asia' }, { name: 'Yugoslavia', continent: 'Europe' }, { name: 'Tanzania', continent: 'Africa' }],
        '/cities': [{ name: 'Bamenda', country: 'Cameroon' }, { name: 'Suva', country: 'Fiji Islands' }, { name: 'Quetzaltenango', country: 'Guatemala' }, { name: 'Osaka', country: 'Japan' }, { name: 'Subotica', country: 'Yugoslavia' }, { name: 'Zanzibar', country: 'Tanzania' }],
        '/populations': [{ count: 138000, name: 'Bamenda' }, { count: 77366, name: 'Suva' }, { count: 90801, name: 'Quetzaltenango' }, { count: 2595674, name: 'Osaka' }, { count: 100386, name: 'Subotica' }, { count: 157634, name: 'Zanzibar' }]
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

function getPopulation(countryOrCity, _ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var allCities = _ref2[0];
    var populations = _ref2[1];

    var countryOrCityLower = countryOrCity.toLowerCase();

    var cityNames = new Set(allCities.filter(function (c) {
        return c.country.toLowerCase() == countryOrCityLower || c.name.toLowerCase() == countryOrCityLower;
    }).map(function (c) {
        return c.name.toLowerCase();
    }));

    if (cityNames.size === 0) {
        return undefined;
    }

    return populations.filter(function (p) {
        return cityNames.has(p.name.toLowerCase());
    }).reduce(function (sum, p) {
        return sum + p.count;
    }, 0);
}

var requests = ['/cities', '/populations'];

function requestPopulation() {
    Promise.all(requests.map(getData2)).then(function (values) {
        var countryOrCity = prompt('Get population of country/city\nEnter country or city:', '');

        if (!countryOrCity) {
            alert('You haven\'t entered any country/city');
            return;
        }

        var population = getPopulation(countryOrCity, values);
        if (population === undefined) {
            alert('We haven\'t found any country or city matching ' + countryOrCity);
        } else {
            alert('Total population in ' + countryOrCity + ': ' + population);
        }
    })['catch'](function () {
        return alert(':(\nSomething went wrong loading population data');
    });
}
requestPopulation();
document.getElementById('get-population').addEventListener('click', requestPopulation);

//# sourceMappingURL=script-compiled.js.map