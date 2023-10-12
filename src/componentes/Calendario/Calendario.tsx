import React, { useEffect, useState } from "react";
import moment from "moment";
import classNames from 'classnames';
import "moment/locale/pt-br";
import "./CalendarioStyle.scss";
import { MovimentacaoService } from "../../services/MovimentacaoService";
import back from "../../http";
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import { Circle } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

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
	const [movimentacoesDoMes, setMovimentacoesDoMes] = useState<IMovimentacao[]>([]);
	const [carregado, setCarregado] = useState(false);

	const days = [];
	for (let i = 0; i < startingDay; i++) {
		days.push(<div key={i} className="empty-day"></div>);
	}

	useEffect(() => {
		const buscaMovimentacoesDoMes = async () => {
			try {
				console.log("atualizou movimentações");
				const movimentacaoService = new MovimentacaoService(back);
				const primeiroDiaMes = new Date();
				primeiroDiaMes.setMonth(currentMonth.month());
				primeiroDiaMes.setFullYear(currentMonth.year());
				primeiroDiaMes.setDate(1);
				const ultimoDiaMes = new Date();
				ultimoDiaMes.setMonth(ultimoDiaMes.getMonth() + 1);
				ultimoDiaMes.setDate(0);
				const response = await movimentacaoService.getMovimentacao(1,
					primeiroDiaMes.getTime(), ultimoDiaMes.getTime());
				if (response?.data) {
					setMovimentacoesDoMes(response.data);
					setCarregado(true);
				}
			} catch (error) {
				console.error('Erro ao buscar movimentações:', error);
			}
		};
		buscaMovimentacoesDoMes();
	}, [selectedDay])

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
				{verificaDiaComMovimentação(day, currentMonth.month(), "NEGATIVO")}
				{day}
				{verificaDiaComMovimentação(day, currentMonth.month(), "POSITIVO")}
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
		carregado
			? <div className="calendar-card">
				<div className="header">
					<button onClick={() =>
						<div>
							{setCurrentMonth(currentMonth.clone().subtract(1, "month"))}
							{handleDayClick(1, currentMonth.month() - 1, currentMonth.year())}
						</div>
					}
					>Anterior</button>
					<h1>{currentMonth.format("MMMM YYYY")}</h1>
					<button onClick={() =>
						<div>
							{setCurrentMonth(currentMonth.clone().add(1, "month"))}
							{handleDayClick(1, currentMonth.month() + 1, currentMonth.year())}
						</div>

					}
					>Próximo</button>
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
			: <div className="load-calendar">
				<div className="load">
					<CircularProgress color="primary" size={'100px'}/>
				</div>
				 <br/>
				 <div className="msg">
					Carregando Calendário de movimentações...
				</div>
			</div>
	);

	function verificaDiaComMovimentação(day: number, month: number, operador: string) {
		if (movimentacoesDoMes.length > 0) {
			let possuiMovimentacao = 0;
			movimentacoesDoMes.forEach((movimentacao) => {
				let date = new Date(movimentacao.dataMovimentacao)
				const dia = date.getDate();
				const mes = date.getMonth();
				if (dia === day && month === mes
					&& movimentacao.tipoMovimentacao.toUpperCase() === operador) {
					possuiMovimentacao++;
				}
			});
			switch (operador) {
				case "NEGATIVO":
					if (possuiMovimentacao > 0) {
						return (
							<Circle
								sx={{ color: "#9a1d1d", backgroundColor: 'transparent' }}
								fontSize='medium'
							/>
						);
					}
					return (
						<Circle
							sx={{ color: "transparent", backgroundColor: 'transparent' }}
						/>
					);
				case "POSITIVO":
					if (possuiMovimentacao > 0) {
						return (
							<Circle
								sx={{ color: "#35b13b", backgroundColor: 'transparent' }}
								fontSize='medium'
							/>
						);
					}
					return (
						<Circle
							sx={{ color: "transparent", backgroundColor: 'transparent' }}
						/>
					);
			}
		}
	}
};

export default Calendario;
