import { AddCircleOutlineRounded, DoDisturbAlt, InfoOutlined, ModeEdit, ModeStandby } from "@mui/icons-material";
import { Button, FormControlLabel, FormGroup, IconButton, Switch, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import { accessToken, modalPlanajamento, planejamento } from "../../../atoms/atom";
import { useBack } from "../../../http";
import { IModalPlanejamento } from "../../../interfaces/IModalPlanejamentoProps";
import { PlanejamentoService } from "../../../services/PlanejamentoService";
import { Planejamento } from "../../../types/Planejamento";
import './Listagem.scss';

const ListagemPlanejamentos: FC<Partial<IModalPlanejamento>> = (props: Partial<IModalPlanejamento>) => {
	const [accessTokenAtom] = useAtom(accessToken);
	const [selecionado, setSelecionado] = useAtom(planejamento);
	const [isOpen, setIsOpenModalPlanejamento] = useAtom(modalPlanajamento);
	const [planejamentos, setPlanejamentos] = useState<Planejamento[]>();
	const [verInativos, setVerInativos] = useState(false);
	const planejamentoService = new PlanejamentoService(useBack());

	const verPlanejamentosInativos = (event: ChangeEvent<HTMLInputElement>) => {
		setVerInativos(event.target.checked);
	};

	useEffect(() => {
		if (!isOpen) {
			const lista = async () => {
				try {
					if (accessTokenAtom !== "") {
						const retorno = await planejamentoService.listaPlanejamentos();
						if (retorno?.data) {
							setPlanejamentos(retorno.data);
							if (retorno.data.length) {
								setSelecionado(retorno.data.filter(data => data.ativo)[0]);
							}
						}
					}
				} catch (error) {
					console.log("erro ao carregar planejamentos");
				}
			}
			lista();
		}
	}, [isOpen]);

	return (
		<div className="lista">
			<div className="adicionar-planejamento">
				<Button onClick={() => setIsOpenModalPlanejamento(true)}>
					<AddCircleOutlineRounded
						sx={{ color: "#44A81D" }}
						fontSize="large"
					/>
					Adicionar Planejamento
				</Button>
				<div className="dica-planejamentos">
					<InfoOutlined fontSize="small"/>
					Selecione um planejamento para ver o desempenho dele.
				</div>
			</div>
			<div className="lista-planejamentos">
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								color='primary'
								onChange={verPlanejamentosInativos}
							/>
						}
						label="Visualizar inativos"
					/>
				</FormGroup>
				{montaPlanejamentos()}
			</div>
		</div>
	);

	function montaPlanejamentos() {
		return planejamentos && planejamentos.length ?
		<Fragment>
			<div className="header-listagem">
				<p>Tipo</p>
				<p>Nome</p>
				<p>Início</p>
				<p>Fim</p>
			</div>
			<div className="listagem-planejamentos">
				{planejamentos
					.filter(planejamento => verInativos || planejamento.ativo)
					.map((planejamento, index) => (
						<div className="item-planejamento">
							<Button
								className={planejamento.id === selecionado?.id ? "selecionado" : ""}
								onClick={() => setSelecionado(planejamento)}
							>
								<div className={`info-planejamento ${!planejamento.ativo ? 'inativo' : ''}`}>
									<Tooltip
										title={planejamento.tipo}
										placement="right"
									>
										{planejamento.tipo === 'META'
											? <ModeStandby color={planejamento.ativo ? "success" : "disabled"}/>
											: <DoDisturbAlt color={planejamento.ativo ? "error" : "disabled"}/>
										}
									</Tooltip>
								</div>
								<div className={`info-planejamento ${!planejamento.ativo ? 'inativo' : ''}`}>
									{planejamento.nome}
								</div>
								<div className={`info-planejamento ${!planejamento.ativo ? 'inativo' : ''}`}>
									{new Date(planejamento.dataInicio).getUTCDate().toString().padStart(2,"0")}
									/{(new Date(planejamento.dataInicio).getUTCMonth() + 1).toString().padStart(2,"0")}
									/{new Date(planejamento.dataInicio).getUTCFullYear().toString().substring(2)}
								</div>
								<div className={`info-planejamento ${!planejamento.ativo ? 'inativo' : ''}`}>
									{new Date(planejamento.dataFim).getUTCDate().toString().padStart(2,"0")}
									/{(new Date(planejamento.dataFim).getUTCMonth() + 1).toString().padStart(2,"0")}
									/{new Date(planejamento.dataFim).getUTCFullYear().toString().substring(2)}
								</div>
							</Button>
							<div className="editar-planejamento">
								<IconButton
									color="inherit"
									onClick={() => editPlanejamento(planejamento)}
								>
									<ModeEdit />
								</IconButton>
							</div>
						</div>
					))}
			</div>
		</Fragment>
		: <div className="sem-planejamentos">
			Parece que você não possui nenhum planejamento! Comece criando um.
		</div>
	}

	function editPlanejamento(planejamento: Planejamento) {
		if (props.setEdit && props.setNome && props.setTipo && props.setRecorrencia && props.setValor
				&& props.setDataInicio && props.setDataFim && props.setCategorias && props.setId && props.setAtivo) {
			props.setEdit(true);
			props.setAtivo(planejamento.ativo)
			props.setId(planejamento.id || 0);
			props.setNome(planejamento.nome);
			props.setTipo(planejamento.tipo);
			props.setRecorrencia(planejamento.recorrencia);
			props.setValor(planejamento.valor.toString());
			props.setDataInicio(dayjs(planejamento.dataInicio));
			props.setDataFim(dayjs(planejamento.dataFim));
			props.setCategorias(planejamento.categorias);
			setIsOpenModalPlanejamento(true);
		}
	}
}

export default ListagemPlanejamentos;