import {useState, createRef} from 'react';

import DateValue from './DateValue';
import Calendar from './Calendar';

function App() {
	const [mainDate, setMainDate] = useState(new Date());
	const [period, setPeriod] = useState([new Date(), new Date()]);

	const [isTypeSingle, setIsTypeSingle] = useState(1);

	const [isVisibleTypeChoice, setIsVisibleTypeChoice] = useState(true);
	const [isVisibleDateValue, setIsVisibleDateValue] = useState(true);
	const [isVisibleCalendar, setIsVisibleCalendar] = useState(false);

	const handleClickOnDate = () => {
		setIsVisibleCalendar(true);
		setIsVisibleDateValue(false);
		setIsVisibleTypeChoice(false);
	};

	const handleSelectYear = (year) => {
		setMainDate(new Date(year, mainDate.getMonth()));
	};

	const handleSelectPeriodYear = (year) => {
		setPeriod([
			new Date(year, period[0].getMonth()),
			new Date(year, period[1].getMonth()),
		]);
	};

	const handleScrollMonth = (month) => {
		setMainDate(new Date(mainDate.getFullYear(), month));
	};

	const handleScrollPeriodMonth = (month) => {
		setPeriod([
			new Date(period[0].getFullYear(), month),
			new Date(period[1].getFullYear(), month),
		]);
	};

	const handleClickOnDay = (date) => {
		setMainDate(date);
		setIsVisibleCalendar(false);
		setIsVisibleTypeChoice(true);
		setIsVisibleDateValue(true);
	};

	const handleSelectPeriod = (period) => {
		setPeriod([period[0], period[1]]);
		setIsVisibleCalendar(false);
		setIsVisibleTypeChoice(true);
		setIsVisibleDateValue(true);
	};

	const typeRef = createRef();
	const handleTypeCoise = () => {
		setIsTypeSingle(+typeRef.current.value);
	};

	return (
		<div className='page'>
			<select
				onChange={handleTypeCoise}
				ref={typeRef}
				className={`calendar__typeChoice ${
					isVisibleTypeChoice ? '' : 'calendar__typeChoice_invisible'
				}`}
			>
				<option value={1}>Выбор даты</option>
				<option value={0}>Выбор периода</option>
			</select>
			<DateValue
				mainDate={mainDate}
				period={period}
				isTypeSingle={isTypeSingle}
				isVisible={isVisibleDateValue}
				onDateClick={handleClickOnDate}
			/>
			<Calendar
				isTypeSingle={isTypeSingle}
				isVisible={isVisibleCalendar}
				mainDate={mainDate}
				period={period}
				onSelectYear={handleSelectYear}
				onSelectPeriodYear={handleSelectPeriodYear}
				onScrollMonth={handleScrollMonth}
				onScrollPeriodMonth={handleScrollPeriodMonth}
				onDayClick={handleClickOnDay}
				onSelectPeriod={handleSelectPeriod}
			/>
		</div>
	);
}

export default App;
