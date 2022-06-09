import { createStore, createEffect, Effect } from 'effector';
import { ICountry } from './../types';


export const __INIT__: Effect<void, Array<ICountry>, Error> = createEffect<Function>(async () => {

	let response: Response = await fetch('https://restcountries.com/v3.1/all'),
		result: any = await response.json();

	// construct correct data from result
	const countriesFromResult: Array<ICountry> = [];
	for (let item in result) {
		countriesFromResult.push({
			area: result[item].area,
			borderCountries: result[item].borders,
			capital: result[item].capital ? result[item].capital[0] : '',
			independent: result[item].independent,
			name: result[item].name.official,
			population: result[item].population,
			region: result[item].region,
			flagIcon: result[item].flags.svg,
			index: +item
		})
	}

	return [...countriesFromResult];
})


export const $countries = createStore<Array<ICountry>>([]);

$countries.on(__INIT__.done, (_, payload) => payload.result);