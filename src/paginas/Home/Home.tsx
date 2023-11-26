import { useState } from "react";
import Calendario from '../../componentes/Calendario/Calendario';
import InformacoesDoDia from '../../componentes/InformacoesDoDiaCard/InformacoesDoDia';
import InformacoesDoMes from '../../componentes/InformacoesDoMesCard/InformacoesDoMes';
import ModalAddMovimentacao from '../../componentes/ModaisMovimentacao/ModalAddMovimentacao';
import ModalApagaMovimentacao from "../../componentes/ModaisMovimentacao/ModalApagaMovimentacao";
import useModalAddMovimentacao from "../../componentes/ModaisMovimentacao/UseModalAddMovimentacao";
import useModalRemoveMovimentacao from "../../componentes/ModaisMovimentacao/UseModalRemoveMovimentacao";
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import './Home.module.scss';

export const Home = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const {isOpenModalAdd, closeModalAdd} = useModalAddMovimentacao();
	const {isOpenModalRemove, closeModalRemove} = useModalRemoveMovimentacao();
	const [tipo, setTipo] = useState(TipoMovimentacaoEnum.POSITIVO);
	const [movimentacaoApagar, setMovimentacaoApagar] = useState<IMovimentacao | null>(null);

	const handleDayClick = (date: Date) => {
		setSelectedDate(date);
	};
	const modalAddRendimento = () => {
		setTipo(TipoMovimentacaoEnum.POSITIVO);
		closeModalAdd();
	}
	const modalAddDespesa = () => {
		setTipo(TipoMovimentacaoEnum.NEGATIVO);
		closeModalAdd();
	}
	const modalApagaRendimento = (movimentacaoApagar: IMovimentacao) => {
		movimentacaoApagar.tipoMovimentacao.toUpperCase() === TipoMovimentacaoEnum.POSITIVO
			? setTipo(TipoMovimentacaoEnum.POSITIVO)
			: setTipo(TipoMovimentacaoEnum.NEGATIVO);
		closeModalRemove();
		setMovimentacaoApagar(movimentacaoApagar);
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
					
				</div>
				<div style={{ width: "29.9%" }}>
					<InformacoesDoDia
						selectedDate={selectedDate}
						modalAddRendimento={modalAddRendimento}
						modalAddDespesa={modalAddDespesa}
						modalApagaMovimentacao={modalApagaRendimento}
					/>
				</div>
			</div>
			<ModalAddMovimentacao
				isOpen={isOpenModalAdd}
				closeModal={closeModalAdd}
				tipo= {tipo}
				date={new Date()}
			/>
			<ModalApagaMovimentacao
				isOpen={isOpenModalRemove}
				tipo={tipo}
				closeModalRemove={closeModalRemove}
				movimentacao={movimentacaoApagar}
			/>
		</div>
	);
}

export default Home;