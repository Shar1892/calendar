import {namesOfMonths} from './constants';

//создание массива решетки месяца из пустых ячеек и данных по дням
export const createMonthData = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);

	const dayOfWeekFirstDay = firstDay.getDay();
	const dayOfWeekLastDay = lastDay.getDay();

	const startEmptyDays = dayOfWeekFirstDay === 0 ? 6 : dayOfWeekFirstDay - 1;
	const endEmptyDays = dayOfWeekLastDay === 0 ? 0 : 7 - dayOfWeekLastDay;

	const days = lastDay.getDate();
	const allDaysSum = startEmptyDays + days + endEmptyDays;

	const result = [];
	let dayValue = 1;

	for (let i = 0; i < allDaysSum; i++) {
		if (i < startEmptyDays || i > startEmptyDays + days - 1) {
			result[i] = null;
		} else {
			result[i] = new Date(year, month, dayValue++);
		}
	}

	return result;
};

//проверка на совпадение дат
export const isEqualDate = (firstDate, secondDate) => {
	if (!firstDate || !secondDate) {
		return false;
	} else {
		//из чисел года месяца и дня собираются коды чисел и сравниваются
		let firstDateCode =
			+`${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;
		let secondDateCode =
			+`${secondDate.getFullYear()}${secondDate.getMonth()}${secondDate.getDate()}`;
		return firstDateCode === secondDateCode;
	}
};

//получение названия месяца изтаблицы по номеру
export const createMonthName = (monthNumber) => {
	return namesOfMonths[monthNumber];
};

//создание двузначной записи номера месяца
export const fixMonthNumber = (month) => {
	if (month < 9) {
		return `0${month + 1}`;
	} else {
		return `${month + 1}`;
	}
};

//создание двузначной записи номера дня месяца
export const fixMonthDayNumber = (day) => {
	if (day < 10) {
		return `0${day}`;
	} else {
		return `${day}`;
	}
};

//массив первых чисел предыдущего, текущего и будущего месяцев
export const createArrMonthsDate = (date) => {
	let arrMonthDate = [];

	for (let i = 0; i <= 2; i++) {
		arrMonthDate[i] = new Date(date.getFullYear(), date.getMonth() + i - 1);
	}

	return arrMonthDate;
};

//создание записи даты день.месяц.год
export const createRecordDate = (date) => {
	return `${fixMonthDayNumber(date.getDate())}.${fixMonthNumber(
		date.getMonth()
	)}.${date.getFullYear()}`;
};

//создание записи периода день.месяц.год
export const createRecordPeriod = (period) => {
	return `${fixMonthDayNumber(period[0].getDate())}.${fixMonthNumber(
		period[0].getMonth()
	)}.${period[0].getFullYear()} - ${fixMonthDayNumber(
		period[1].getDate()
	)}.${fixMonthNumber(period[1].getMonth())}.${period[1].getFullYear()}`;
};

//проверка, что дата выпадает на выходной
export const isWekend = (date) => {
	if (date.getDay() === 0 || date.getDay() === 6) {
		return true;
	}
	return false;
};

//сравнение дат, что первая больше второй
export const compareDate = (firstDate, secondDate) => {
	if (firstDate.getTime() >= secondDate.getTime()) {
		return true;
	}
	return false;
};

// проверка, что дата попадает в указанный период
export const isDateInPeriod = (date, period) => {
	if (!date || !period[0] || !period[1]) {
		return false;
	} else if (compareDate(date, period[0]) && compareDate(period[1], date)) {
		return true;
	} else {
		return false;
	}
};
