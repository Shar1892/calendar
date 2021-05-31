import {
	createMonthData,
	isEqualDate,
	createMonthName,
	isWekend,
	isDateInPeriod,
} from '../utils/utils';

const Month = ({
	isTypeSingle,
	mainDate,
	period,
	plannedPeriod,
	onDayClick,
	onDayClickToPeriod,
	onDayMouseOver,
	selectedDate,
	selectedPeriod,
}) => {
	const monthData = isTypeSingle
		? createMonthData(mainDate)
		: createMonthData(period[0]);

	return (
		<div className='month'>
			<div className='month__title-container'>
				<h2 className='month__title'>{createMonthName(mainDate.getMonth())}</h2>
			</div>

			<div className='month__days-container'>
				{monthData.map((day, i) =>
					day ? (
						isTypeSingle ? (
							<div
								key={i}
								className={`day ${
									isEqualDate(day, selectedDate)
										? 'day_type_active'
										: 'day_type_simple'
								}`}
								onClick={() => onDayClick(day)}
							>
								<p
									className={`day__number ${
										isWekend(day) ? 'day__number_dayoff' : ''
									}`}
								>
									{day.getDate()}
								</p>
							</div>
						) : (
							<div
								key={i}
								className={`day ${
									isDateInPeriod(day, selectedPeriod)
										? 'day_type_active'
										: isDateInPeriod(day, plannedPeriod)
										? 'day_type_active'
										: isEqualDate(day, selectedPeriod[0])
										? 'day_type_active'
										: 'day_type_simple'
								}`}
								onClick={() => onDayClickToPeriod(day)}
								onMouseOver={() => onDayMouseOver(day)}
							>
								<p
									className={`day__number ${
										isWekend(day) ? 'day__number_dayoff' : ''
									}`}
								>
									{day.getDate()}
								</p>
							</div>
						)
					) : (
						<div key={i} />
					)
				)}
			</div>
		</div>
	);
};

export default Month;
