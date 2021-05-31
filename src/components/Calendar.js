import {useState, createRef} from 'react';

import {years} from '../utils/constants';
import {createArrMonthsDate, compareDate} from '../utils/utils';
import Month from './Month';

const Calendar = ({
	isVisible,
	isTypeSingle,
	mainDate,
	period,
	onSelectYear,
	onSelectPeriodYear,
	onScrollMonth,
	onScrollPeriodMonth,
	onDayClick,
	onSelectPeriod,
}) => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedPeriod, setSelectedPeriod] = useState([null, null]);

	const [plannedPeriod, setPlannedPeriod] = useState([null, null]);

	const handleSelectDate = (date) => {
		setSelectedDate(date);
		onDayClick(date);
	};

	const handleSelectPeriod = (date) => {
		if (selectedPeriod[0] && selectedPeriod[1]) {
			setSelectedPeriod([date, null]);
		} else if (!selectedPeriod[0]) {
			setSelectedPeriod([date, null]);
		} else {
			if (compareDate(date, selectedPeriod[0])) {
				setSelectedPeriod([selectedPeriod[0], date]);
				onSelectPeriod([selectedPeriod[0], date]);
			} else {
				setSelectedPeriod([date, selectedPeriod[0]]);
				onSelectPeriod([date, selectedPeriod[0]]);
			}
		}
	};

	const handleDayMouseOver = (date) => {
		if (selectedPeriod[0] && selectedPeriod[1]) {
			setPlannedPeriod([null, null]);
		} else if (selectedPeriod[0] && !selectedPeriod[1]) {
			if (compareDate(date, selectedPeriod[0])) {
				setPlannedPeriod([selectedPeriod[0], date]);
			} else {
				setPlannedPeriod([date, selectedPeriod[0]]);
			}
		}
	};

	const handleScrollMonth = (evt) => {
		if (isTypeSingle) {
			if (evt.deltaY > 0) {
				onScrollMonth(mainDate.getMonth() + 1);
			} else {
				onScrollMonth(mainDate.getMonth() - 1);
			}
		} else {
			if (evt.deltaY > 0) {
				onScrollPeriodMonth(period[0].getMonth() + 1);
			} else {
				onScrollPeriodMonth(period[0].getMonth() - 1);
			}
		}
	};

	const arrMonthsDate = isTypeSingle
		? createArrMonthsDate(mainDate)
		: createArrMonthsDate(period[0]);

	const yearRef = createRef();

	const handleSelectChangeYear = () => {
		if (isTypeSingle) {
			onSelectYear(yearRef.current.value);
		} else {
			onSelectPeriodYear(yearRef.current.value);
		}
	};

	return (
		<section className={`calendar ${isVisible ? '' : 'calendar_invisible'}`}>
			<div className='calendar__year-container'>
				<select
					onChange={handleSelectChangeYear}
					ref={yearRef}
					value={
						isTypeSingle ? mainDate.getFullYear() : period[0].getFullYear()
					}
					className='calendar__year'
				>
					{years.map((yaerNamber, i) => (
						<option key={i} value={yaerNamber}>
							{yaerNamber}
						</option>
					))}
				</select>
			</div>
			<div onWheel={handleScrollMonth}>
				{arrMonthsDate.map((date, i) => (
					<Month
						isTypeSingle={isTypeSingle}
						period={[date, period[1]]}
						mainDate={date}
						plannedPeriod={plannedPeriod}
						onDayClick={handleSelectDate}
						onDayClickToPeriod={handleSelectPeriod}
						onDayMouseOver={handleDayMouseOver}
						selectedDate={selectedDate}
						selectedPeriod={selectedPeriod}
						key={i}
					/>
				))}
			</div>
		</section>
	);
};

export default Calendar;
