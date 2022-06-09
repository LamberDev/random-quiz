export interface ICountry {
	area: number,
	borderCountries: Array<string>,
	capital: string,
	independent: boolean,
	name: string,
	population: number,
	region: string,
	flagIcon: string,
	index: number
}

export interface IAnswers {
	answers: Array<string | number | boolean>,
	correctAnswer: number | string | boolean,
}

export interface IQuestion extends IAnswers {
	type: string,
	question: string,
	image?: string,
	answered: boolean
}
