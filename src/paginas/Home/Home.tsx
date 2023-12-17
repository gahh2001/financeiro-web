import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Calendario from '../../componentes/Calendario/Calendario';
import InformacoesDoDia from '../../componentes/InformacoesDoDiaCard/InformacoesDoDia';
import DialogDescricaoMovimentacao from "../../componentes/InformacoesDoDiaCard/dialogDescricaoMovimentacao/DialogDescricaoMovimentacao";
import InformacoesDoMes from '../../componentes/InformacoesDoMesCard/InformacoesDoMes';
import ModalAddMovimentacao from '../../componentes/ModalAddMovimentacao/ModalAddMovimentacao';
import useModalAddMovimentacao from "../../componentes/ModalAddMovimentacao/UseModalAddMovimentacao";
import ModalApagaMovimentacao from "../../componentes/ModalRemoveMovimentacao/ModalApagaMovimentacao";
import useModalRemoveMovimentacao from "../../componentes/ModalRemoveMovimentacao/UseModalRemoveMovimentacao";
import { TipoMovimentacaoEnum } from '../../enums/TipoMovimentacaoEnum';
import { IMovimentacao } from "../../interfaces/IMovimentacao";
import './Home.module.scss';

export const Home = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const {isOpenModalAdd, closeModalAdd} = useModalAddMovimentacao();
	const {isOpenModalRemove, closeModalRemove} = useModalRemoveMovimentacao();
	const [isOpenDialogDescricao, setIsOpenDialogDescricao] = useState(false);
	const [descricao, setDescricao] = useState("");
	const [tipo, setTipo] = useState(TipoMovimentacaoEnum.POSITIVO);
	const [movimentacaoApagar, setMovimentacaoApagar] = useState<IMovimentacao | null>(null);

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

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

	const propsDialogDescricao = (description: string) => {
		setIsOpenDialogDescricao(true);
		setDescricao(description);
	}

	const closeDialogDescricao = () => {
		setIsOpenDialogDescricao(false);
	}

	return (
		<div className="home">
			<ThemeProvider theme={darkTheme}>
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
							dialogDescricao={(description) => propsDialogDescricao(description)}
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
				<DialogDescricaoMovimentacao
					openDialog={isOpenDialogDescricao}
					description={descricao}
					onClose={closeDialogDescricao}
				/>
			</ThemeProvider>
		</div>
	);
}

export default Home;