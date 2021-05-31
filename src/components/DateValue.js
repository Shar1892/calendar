import {createRecordDate, createRecordPeriod} from '../utils/utils';

const DateValue = ({
	mainDate,
	onDateClick,
	isTypeSingle,
	period,
	isVisible,
}) => {
	const recordDate = createRecordDate(mainDate);
	const recordPeriod = createRecordPeriod(period);

	return (
		<p
			className={`date-value ${isVisible ? '' : 'date-value_invisible'}`}
			onClick={onDateClick}
		>
			{isTypeSingle ? recordDate : recordPeriod}
		</p>
	);
};

export default DateValue;
