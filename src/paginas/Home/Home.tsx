import Calendario from '../../componentes/Calendario/Calendario';
import InformacoesDoDia from '../../componentes/InformacoesDoDiaCard/InformacoesDoDia';
import InformacoesDoMes from '../../componentes/InformacoesDoMesCard/InformacoesDoMes';
import ModalAddMovimentacao from '../../componentes/ModalAddMovimentacao/ModalAddMovimentacao';
import useModal from '../../componentes/ModalAddMovimentacao/UseModal';
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import './Home.module.scss'
import { useState } from "react";

export const Home = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	//const [modalVisible, setModalVisible] = useState(false);
	const { isOpen, closeModal } = useModal();
	const [tipo, setTipo] = useState(TipoMovimentacaoEnum.POSITIVO);
	const handleDayClick = (date: Date) => {
		setSelectedDate(date);
	};
	const modalAddRendimento = () => {
		setTipo(TipoMovimentacaoEnum.POSITIVO);
		closeModal();
	}
	const modalAddDespesa = () => {
		setTipo(TipoMovimentacaoEnum.NEGATIVO);
		closeModal();
	}

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
					<InformacoesDoMes selectedDate={selectedDate} />
					<ModalAddMovimentacao
						isOpen={isOpen}
						closeModal={closeModal}
						tipo= {tipo}
						date={new Date()}>
					</ModalAddMovimentacao>
				</div>
				<div style={{ width: "29.9%" }}>
					<InformacoesDoDia
						selectedDate={selectedDate}
						modalAddRendimento={modalAddRendimento}
						modalAddDespesa={modalAddDespesa}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;