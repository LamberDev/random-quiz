import { shuffle } from 'lodash';
import type { IAnswers, ICountry, IQuestion } from '../types';

export const CreateQuestion = (countries: Array<ICountry>) => {
	// Will add this question type later -  "BORDERED_COUNTRY"
	const TYPES = ["AREA", "CAPITAL", "INDEPENDENCE", "NAME", "POPULATION", "REGION"];
	let type = TYPES[Math.floor(Math.random() * TYPES.length)];
	let questionData: IQuestion = {
		type,
		question: '',
		answers: [],
		answered: false,
		correctAnswer: ''
	};
	let country: ICountry = countries[Math.floor(Math.random() * countries.length)];
	const sortedCountries: Array<ICountry> = countries.filter((item: ICountry) => item.name !== country.name);
	let data = CreateAnswers(type, country, sortedCountries);


	switch (type) {
		case "AREA":
			questionData.question = `What is the area of ${country.name}?`;
			break;
		case "BORDERED_COUNTRY":
			questionData.question = `One of the bord country of ${country.name}`;
			break;
		case "CAPITAL":
			questionData.question = `What is the capital of ${country.name}?`;
			break;
		case "INDEPENDENCE":
			questionData.question = `Is ${country.name} independent?`;
			break;
		case "NAME":
			questionData.question = "What is the name of this country?";
			questionData.image = country.flagIcon;
			break;
		case "POPULATION":
			questionData.question = `What is the population of ${country.name}?`;
			break;
		case "REGION":
			questionData.question = `Which region does ${country.name} land?`;
			break;
		default:
			questionData = {
				type: "__DEFAULT__",
				question: "I do not know how you will answer to this question",
				answers: [],
				correctAnswer: '',
				answered: false
			}
	}
	questionData.answers = shuffle(data.answers);
	questionData.correctAnswer = data.correctAnswer;
	return questionData;
}

const CreateAnswers = (type: string, country: ICountry, countries: Array<ICountry>): IAnswers => {
	const answers: Set<IAnswers["correctAnswer"]> = new Set([]);
	const data: IAnswers = {
		answers: [],
		correctAnswer: ''
	};
	let randomCountry;
	switch (type) {
		case "AREA":
			answers.add(country.area);
			data.correctAnswer = country.area;
			while (answers.size !== 4) {
				randomCountry = countries[Math.floor(Math.random() * countries.length)];
				answers.add(randomCountry.area);
			}
			data.answers = Array.from(answers);
			break;
		case "BORDERED_COUNTRY":
			let borderCountry = 'This is a country that does not have any border coutries!';
			if (country.borderCountries) {
				console.log(1);
				getOfficialCountryNameByTag(country.borderCountries[Math.floor(Math.random() * country.borderCountries.length)]).then(result => {
					data.correctAnswer = result;
				})
			}
			answers.add(borderCountry);
			// data.correntAnswer = borderCountry;
			while (answers.size !== 4) {
				randomCountry = countries[Math.floor(Math.random() * countries.length)];
				if (randomCountry.borderCountries) {
					answers.add(randomCountry.borderCountries[0]);
				}
			}
			data.answers = Array.from(answers);

			break;
		case "CAPITAL":
			answers.add(country.capital || "This is country without a capital");
			data.correctAnswer = country.capital || "This is country without a capital";
			while (answers.size !== 4) {
				randomCountry = countries[Math.floor(Math.random() * countries.length)];
				answers.add(randomCountry.capital || 'This is country without a capital');
			}
			data.answers = Array.from(answers);
			break;
		case "INDEPENDENCE":
			data.correctAnswer = country.independent;
			data.answers = [true, false];
			break;
		case "NAME":
			answers.add(country.name);
			data.correctAnswer = country.name;
			while (answers.size !== 4) {
				randomCountry = countries[Math.floor(Math.random() * countries.length)];
				answers.add(randomCountry.name);
			}
			data.answers = Array.from(answers);
			break;
		case "POPULATION":
			answers.add(country.population);
			data.correctAnswer = country.population;
			while (answers.size !== 4) {
				randomCountry = countries[Math.floor(Math.random() * countries.length)];
				answers.add(randomCountry.population);
			}
			data.answers = Array.from(answers);
			break;
		case "REGION":
			answers.add(country.region);
			data.correctAnswer = country.region
			while (answers.size !== 4) {
				randomCountry = countries[Math.floor(Math.random() * countries.length)];
				answers.add(randomCountry.region);
			}
			data.answers = Array.from(answers);
			break;
		default:
			console.log("Sorry, But we cannot create answers!");
	}

	return data;
}

const getOfficialCountryNameByTag = (tag: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		fetch('https://restcountries.com/v3.1/alpha/' + tag)
			.then(response => {
				if (!response.ok) {
					reject('Server Error!');
					return;
				}
				response.json()
					.then(result => resolve(result[0].name.official));
			})
	})
}