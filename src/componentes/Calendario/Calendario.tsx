import React, { useState } from "react";
import moment from "moment";
import classNames from 'classnames';
import "moment/locale/pt-br";
import "./CalendarioStyle.scss";

interface CalendarioProps {
	onDayClick: (selectedDate: Date) => void;
}

const Calendario: React.FC<CalendarioProps> = ({ onDayClick }) => {
	moment.locale("pt-br");
	const [currentMonth, setCurrentMonth] = useState(moment());
	const [selectedDay, setSelectedDay] = useState(moment().date() + currentMonth.format('YYYYMM'));

	const weekdays = moment.weekdaysShort();
	const firstDayOfMonth = currentMonth.clone().startOf("month");
	const daysInMonth = currentMonth.daysInMonth();
	const startingDay = parseInt(firstDayOfMonth.format("d"), 10);

	const days = [];
	for (let i = 0; i < startingDay; i++) {
		days.push(<div key={i} className="empty-day"></div>);
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const isCurrentDay = (day + currentMonth.format('YYYYMM')) === selectedDay;
		const dayClass = classNames("day", {
			"selected-day": isCurrentDay,
		});
		days.push(
			<div
				key={day + currentMonth.format('YYYYMM')}
				className={dayClass}
				onClick={() => handleDayClick(day, currentMonth.month(), currentMonth.year())}
			>
				{day}
			</div>
		);
	}

	const handleDayClick = (daySelected: number, monthSelected: number, yearSelected: number) => {
		setSelectedDay(daySelected + currentMonth.format('YYYYMM'));
		const selectedDate = new Date();
		selectedDate.setDate(daySelected);
		selectedDate.setMonth(monthSelected);
		selectedDate.setFullYear(yearSelected);
		onDayClick(selectedDate);
	};


	return (
		<div className="calendar-card">
			<div className="header">
				<button onClick={() => setCurrentMonth(currentMonth.clone().subtract(1, "month"))}>Anterior</button>
				<h1>{currentMonth.format("MMMM YYYY")}</h1>
				<button onClick={() => setCurrentMonth(currentMonth.clone().add(1, "month"))}>Próximo</button>
			</div>
			<div className="weekdays">
				{weekdays.map((weekday) => (
					<div key={weekday} className="weekday">
						{weekday}
					</div>
				))}
			</div>
			<div className="days">{days}</div>
		</div>
	);

	function verificaDiaComMovimentação(day: number, month: number, year: number) {
		
	}
};

export default Calendario;
