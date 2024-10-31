import { CircleTwoTone } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import classNames from 'classnames';
import moment from "moment";
import "moment/locale/pt-br";
import { FC, useEffect, useState } from "react";
import { TipoMovimentacaoEnum } from "../../../enums/TipoMovimentacaoEnum";
import back from "../../../http";
import { ICalendarioProps } from "../../../interfaces/ICalendarioProps";
import { MovimentacaoService } from "../../../services/MovimentacaoService";
import "./CalendarioStyle.scss";

const Calendario: FC<ICalendarioProps> = (props: ICalendarioProps) => {
	moment.locale("pt-br");
	const [currentMonth, setCurrentMonth] = useState(moment());
	const [selectedDay, setSelectedDay] = useState(moment().date() + currentMonth.format('YYYYMM'));
	const weekdays = moment.weekdaysShort();
	const firstDayOfMonth = currentMonth.clone().startOf("month");
	const daysInMonth = currentMonth.daysInMonth();
	const startingDay = parseInt(firstDayOfMonth.format("d"), 10);
	const [carregado, setCarregado] = useState(false);

	const days = [];
	for (let i = 0; i < startingDay; i++) {
		days.push(<div key={i} className="empty-day"></div>);
	}

	useEffect(() => {
		const buscaMovimentacoesDoMes = async () => {
			debugger;
			try {
				if (props.googleId !== "") {
					const movimentacaoService = new MovimentacaoService(back);
					const primeiroDiaMes : Date = currentMonth.toDate();
					primeiroDiaMes.setDate(1);
					const ultimoDiaMes = new Date();
					ultimoDiaMes.setMonth(primeiroDiaMes.getMonth() + 1);
					ultimoDiaMes.setDate(0);
					const response = await movimentacaoService.getMovimentacao(props.googleId,
						primeiroDiaMes.getTime(), ultimoDiaMes.getTime());
					if (response?.data) {
						props.atualizaMovimentacoesMes(response.data);
						setCarregado(true);
					}
				}
			} catch (error) {
				console.error('Erro ao buscar movimentações:', error);
			}
		};
		buscaMovimentacoesDoMes();
	}, [currentMonth, props.isOpenModalAdd, props.isOpenModalRemove]);

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
				{verificaDiaComMovimentação(day, currentMonth.month(), TipoMovimentacaoEnum.NEGATIVO)}
				{day}
				{verificaDiaComMovimentação(day, currentMonth.month(), TipoMovimentacaoEnum.POSITIVO)}
			</div>
		);
	}

	const handleDayClick = (daySelected: number, monthSelected: number, yearSelected: number) => {
		setSelectedDay(daySelected + currentMonth.clone().format('YYYYMM'));
		const selectedDate = new Date();
		selectedDate.setMonth(monthSelected);
		selectedDate.setDate(daySelected);
		selectedDate.setFullYear(yearSelected);
		selectedDate.setHours(12);
		props.onDayClick(selectedDate);
	};

	return (
		carregado
			? <div className="calendar-card">
				<div className="header">
					<button onClick={() =>
						{
							setCurrentMonth(currentMonth.clone().subtract(1, "month"));
							const firstDay = currentMonth.clone().subtract(1, "month").startOf("month");
							handleDayClick(firstDay.date(), firstDay.month(), firstDay.year());
						}
					}
					>{currentMonth.clone().subtract(1, "month").format("MMMM")}</button>
					<h1>{currentMonth.format("MMMM YYYY")}</h1>
					<button onClick={() =>
						{
							setCurrentMonth(currentMonth.clone().add(1, "month"));
							const firstDay = currentMonth.clone().add(1, "month").startOf("month");
							handleDayClick(firstDay.date(), firstDay.month(), firstDay.year());
						}
					}
					>{currentMonth.clone().add(1, "month").format("MMMM")}</button>
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

	function verificaDiaComMovimentação(day: number, month: number, operador: TipoMovimentacaoEnum) {
		if (props.movimentacoesMes.length > 0) {
			let possuiMovimentacao = 0;
			props.movimentacoesMes.forEach((movimentacao) => {
				let dataString: string = movimentacao.dataMovimentacao.toString();
				dataString = dataString.replace('00', '12')
				let date = new Date(dataString);
				const dia = date.getDate();
				const mes = date.getMonth();
				if (dia === day && month === mes
					&& movimentacao.tipoMovimentacao.toUpperCase() === operador.toString()) {
					possuiMovimentacao++;
				}
			});
			let cor = '';
			switch (operador) {
				case TipoMovimentacaoEnum.NEGATIVO:
					cor = "#9a1d1d";
					break;
				case TipoMovimentacaoEnum.POSITIVO:
					cor = "#2D9632"
					break;
			}
			if (possuiMovimentacao > 0) {
				return (
					<CircleTwoTone
						sx={{ color: cor, backgroundColor: 'transparent' }}
						fontSize='medium'
					/>
				);
			}
			return (
				<CircleTwoTone
					sx={{ color: "transparent", backgroundColor: 'transparent' }}
				/>
			);
		}
	}
};

export default Calendario;
