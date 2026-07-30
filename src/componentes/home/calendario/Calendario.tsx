import { CircularProgress } from "@mui/material";
import classNames from 'classnames';
import { useAtom } from "jotai";
import moment from "moment";
import "moment/locale/pt-br";
import { FC, useEffect, useState } from "react";
import { accessToken, dataSelecionada, modalAddMovimentacao, modalRemoveMovimentacao, movimentacoesMes } from "../../../atoms/atom";
import { TipoMovimentacaoEnum } from "../../../enums/TipoMovimentacaoEnum";
import { MovimentacaoService } from "../../../services/MovimentacaoService";
import "./CalendarioStyle.scss";

const Calendario: FC = () => {
	moment.locale("pt-br");
	const [currentMonth, setCurrentMonth] = useState(moment());
	const [selectedDay, setSelectedDay] = useState(moment().date() + currentMonth.format('YYYYMM'));
	const weekdays = moment.weekdaysShort();
	const firstDayOfMonth = currentMonth.clone().startOf("month");
	const daysInMonth = currentMonth.daysInMonth();
	const startingDay = parseInt(firstDayOfMonth.format("d"), 10);
	const [carregado, setCarregado] = useState(false);
	const [accessTokenAtom] = useAtom(accessToken);
	const [openModalAdd] = useAtom(modalAddMovimentacao);
	const [openModalRemove] = useAtom(modalRemoveMovimentacao);
	const [movimentacoesDoMes, setMovimentacoesMes] = useAtom(movimentacoesMes);
	const [, setDataSelecionada] = useAtom(dataSelecionada);
	const modalAberto = openModalAdd || openModalRemove;
	const movimentacaoService = new MovimentacaoService();

	const days = [];
	for (let i = 0; i < startingDay; i++) {
		days.push(<div key={i} className="empty-day"></div>);
	}

	useEffect(() => {
		const buscaMovimentacoesDoMes = async () => {
			try {
				if (accessTokenAtom !== "") {
					const primeiroDiaMes : Date = currentMonth.clone().toDate();
					primeiroDiaMes.setDate(1);
					primeiroDiaMes.setHours(12);
					const ultimoDiaMes : Date = currentMonth.clone().toDate();
					ultimoDiaMes.setDate(15)
					ultimoDiaMes.setMonth(primeiroDiaMes.getMonth() + 1);
					ultimoDiaMes.setDate(0);
					ultimoDiaMes.setHours(12);
					const response = await movimentacaoService.getMovimentacao(
						primeiroDiaMes.getTime(), ultimoDiaMes.getTime());
					if (response?.data) {
						setMovimentacoesMes(response.data);
						setCarregado(true);
					}
				}
			} catch (error) {
				console.error('Erro ao buscar movimentações:', error);
			}
		};
		if (!modalAberto) {
			buscaMovimentacoesDoMes();
		}
	}, [currentMonth, modalAberto]);

	for (let day = 1; day <= daysInMonth; day++) {
		const isCurrentDay = (day + currentMonth.format('YYYYMM')) === selectedDay;
		const dayClass = classNames("day", {
			"selected-day": isCurrentDay,
		});
		const { hasPositive, hasNegative } = checkMovimentacoes(day, currentMonth.month());
		days.push(
			<div
				key={day + currentMonth.format('YYYYMM')}
				className={dayClass}
				onClick={() => handleDayClick(day, currentMonth.month(), currentMonth.year())}
			>
				<span className="day-number">{day}</span>
				<div className="indicators">
					{hasNegative && <div className="dot dot-negative"></div>}
					{hasPositive && <div className="dot dot-positive"></div>}
				</div>
			</div>
		);
	}

	function checkMovimentacoes(day: number, month: number) {
		let hasPositive = false;
		let hasNegative = false;
		if (movimentacoesDoMes && movimentacoesDoMes.length > 0) {
			for (const movimentacao of movimentacoesDoMes) {
				let dataString = movimentacao.dataMovimentacao.toString().replace('00', '12');
				let date = new Date(dataString);
				if (date.getUTCDate() === day && date.getUTCMonth() === month) {
					if (movimentacao.tipoMovimentacao.toUpperCase() === TipoMovimentacaoEnum.POSITIVO.toString()) {
						hasPositive = true;
					} else if (movimentacao.tipoMovimentacao.toUpperCase() === TipoMovimentacaoEnum.NEGATIVO.toString()) {
						hasNegative = true;
					}
				}
				if (hasPositive && hasNegative) break; 
			}
		}
		return { hasPositive, hasNegative };
	}

	const handleDayClick = (daySelected: number, monthSelected: number, yearSelected: number) => {
		setSelectedDay(daySelected + currentMonth.clone().format('YYYYMM'));
		const selectedDate = new Date();
		selectedDate.setDate(15);
		selectedDate.setMonth(monthSelected);
		selectedDate.setDate(daySelected);
		selectedDate.setFullYear(yearSelected);
		selectedDate.setHours(12);
		setDataSelecionada(selectedDate);
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
					<div className="mes">{currentMonth.format("MMMM YYYY")}</div>
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

};

export default Calendario;
