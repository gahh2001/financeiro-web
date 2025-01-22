import { AddCircleOutlineRounded, DoDisturbAlt, InfoOutlined, ModeEdit, ModeStandby } from "@mui/icons-material";
import { Button, FormControlLabel, FormGroup, IconButton, Switch, Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import { googleIdAtom, modalPlanajamento } from "../../../atoms/atom";
import back from "../../../http";
import { PlanejamentoService } from "../../../services/PlanejamentoService";
import { Planejamento } from "../../../types/Planejamento";
import './Listagem.scss';

const ListagemPlanejamentos: FC = () => {
	const [googleId] = useAtom(googleIdAtom);
	const [, setIsOpenModalPlanejamento] = useAtom(modalPlanajamento);
	const [planejamentos, setPlanejamentos] = useState<Planejamento[]>();
	const [verInativos, setVerInativos] = useState(false);
	const [selecionado, setSelecionado] = useState<number>(0);
	const planejamentoService = new PlanejamentoService(back);

	const verPlanejamentosInativos = (event: ChangeEvent<HTMLInputElement>) => {
		setVerInativos(event.target.checked);
	};

	useEffect(() => {
		const lista = async () => {
			try {
				if (googleId !== "") {
					const retorno = await planejamentoService.listaPlanejamentos(googleId);
					if (retorno?.data) {
						setPlanejamentos(retorno.data);
						setSelecionado(retorno.data[0].id || 0);
					}
				}
			} catch (error) {
				console.log("erro ao carregar planejamentos");
			}
		}
		lista();
	}, []);

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
								className={planejamento.id === selecionado ? "selecionado" : ""}
								onClick={() => setSelecionado(planejamento.id || 0)}
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
									onClick={() => console.log()}
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
}

export default ListagemPlanejamentos;