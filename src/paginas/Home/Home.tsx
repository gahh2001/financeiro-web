import Calendario from '../../componentes/Calendario/Calendario';
import InformacoesDoDia from '../../componentes/InformacoesDoDiaCard/InformacoesDoDia';
import InformacoesDoMes from '../../componentes/InformacoesDoMesCard/InformacoesDoMes';
import './Home.module.scss'
import { useState } from "react";

export const Home = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDayClick = (date: Date) => {
		setSelectedDate(date);
	};
	return (
		<div className="home">
			<div style={{ display: 'flex' }}>
				<div style={{
					display: 'block',
					flexDirection: 'column',
					width: "70%",
					height: "100%"
				}}>
					<Calendario onDayClick={handleDayClick} />
					<InformacoesDoMes />
				</div>
				<div style={{ width: "29.9%", height: "100%" }}>
					<InformacoesDoDia selectedDate={selectedDate} />
				</div>
			</div>
		</div>
	);
}

export default Home;