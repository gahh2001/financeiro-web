import Calendario from '../../componentes/Calendario/Calendario';
import InformacoesDoDia from '../../componentes/InformacoesDoDiaCard/InformacoesDoDia';
import InformacoesDoMes from '../../componentes/InformacoesDoMesCard/InformacoesDoMes';
import ModalAddMovimentacao from '../../componentes/ModalAddMovimentacao/ModalAddMovimentacao';
import useModal from '../../componentes/ModalAddMovimentacao/UseModal';
import './Home.module.scss'
import { useState } from "react";

export const Home = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [modalVisible, setModalVisible] = useState(false);
	const { isOpen, toggle } = useModal();
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
					<InformacoesDoMes selectedDate={selectedDate}/>
					<ModalAddMovimentacao isOpen={isOpen} toggle={toggle} tipo=''></ModalAddMovimentacao>
				</div>
				<div style={{ width: "29.9%", height: "100%" }}>
					<InformacoesDoDia selectedDate={selectedDate} modal={toggle} tipo=''/>
				</div>
			</div>
		</div>
	);
}

export default Home;