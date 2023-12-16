import { useState } from "react";
import Calendario from '../../componentes/Calendario/Calendario';
import InformacoesDoDia from '../../componentes/InformacoesDoDiaCard/InformacoesDoDia';
import InformacoesDoMes from '../../componentes/InformacoesDoMesCard/InformacoesDoMes';
import ModalAddMovimentacao from '../../componentes/ModalAddMovimentacao/ModalAddMovimentacao';
import ModalApagaMovimentacao from "../../componentes/ModalRemoveMovimentacao/ModalApagaMovimentacao";
import useModalAddMovimentacao from "../../componentes/ModalAddMovimentacao/UseModalAddMovimentacao";
import useModalRemoveMovimentacao from "../../componentes/ModalRemoveMovimentacao/UseModalRemoveMovimentacao";
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import './Home.module.scss';

export const Home = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const {isOpenModalAdd, closeModalAdd} = useModalAddMovimentacao();
	const {isOpenModalRemove, closeModalRemove} = useModalRemoveMovimentacao();
	const [tipo, setTipo] = useState(TipoMovimentacaoEnum.POSITIVO);
	const [movimentacaoApagar, setMovimentacaoApagar] = useState<IMovimentacao | null>(null);

	const propsCalendario = (date: Date) => {
		setSelectedDate(date);
	};
	const propsModalAddRendimento = () => {
		setTipo(TipoMovimentacaoEnum.POSITIVO);
		closeModalAdd();
	}
	const propsModalAddDespesa = () => {
		setTipo(TipoMovimentacaoEnum.NEGATIVO);
		closeModalAdd();
	}
	const propsModalApagaRendimento = (movimentacaoApagar: IMovimentacao) => {
		movimentacaoApagar.tipoMovimentacao.toUpperCase() === TipoMovimentacaoEnum.POSITIVO
			? setTipo(TipoMovimentacaoEnum.POSITIVO)
			: setTipo(TipoMovimentacaoEnum.NEGATIVO);
		closeModalRemove();
		setMovimentacaoApagar(movimentacaoApagar);
	}

	return (
		<div className="home">
			<div style={{ display: 'flex', height: "100vh" }}>
				<div style={{
					flexDirection: 'column',
					display: 'flex',
					flex: "0.7"
				}}>
					<Calendario
						onDayClick={propsCalendario}
						closeModalAdd={closeModalAdd}
						closeModalRemove={closeModalRemove}
					/>
					<InformacoesDoMes
						selectedDate={selectedDate}
						modalAddRendimento={propsModalAddRendimento}
						modalAddDespesa={propsModalAddDespesa}
						modalApagaMovimentacao={propsModalApagaRendimento}
					/>
				</div>
				<div style={{flex: "0.3", display: "flex"}}>
					<InformacoesDoDia
						selectedDate={selectedDate}
						modalAddRendimento={propsModalAddRendimento}
						modalAddDespesa={propsModalAddDespesa}
						modalApagaMovimentacao={propsModalApagaRendimento}
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