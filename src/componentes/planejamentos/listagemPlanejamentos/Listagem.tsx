import { AddCircleOutlineRounded, DoDisturbAlt, InfoOutlined, ModeEdit, ModeStandby } from "@mui/icons-material";
import { Button, FormControlLabel, FormGroup, IconButton, Switch, Tooltip } from "@mui/material";
import { ChangeEvent, FC } from "react";
import './Listagem.scss';

const ListagemPlanejamentos: FC = () => {
	
	const handleChangeFullYear = (event: ChangeEvent<HTMLInputElement>) => {
		//props.setFullYear(event.target.checked);
	};

	return (
		<div className="lista">
			<div className="adicionar-planejamento">
				<Button>
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
								onChange={handleChangeFullYear}
							/>
						}
						label="Visualizar inativos"
					/>
				</FormGroup>
				<div className="header-listagem">
					<p>Tipo</p>
					<p>Nome</p>
					<p>Início</p>
					<p>Fim</p>
				</div>
				<div className="listagem-planejamentos">
					<div className="item-planejamento">
						<Button>
							<div className="info-planejamento">
								<Tooltip
									title="Meta"
									placement="right"
								>
									<ModeStandby color="success"/>
								</Tooltip>
							</div>
							<div className="info-planejamento">
								Nomezinho 1
							</div>
							<div className="info-planejamento">
								01/01/2025
							</div>
							<div className="info-planejamento">
								31/12/2025
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
					<div className="item-planejamento">
						<Button>
							<div className="info-planejamento">
								<Tooltip
									title="Limite"
									placement="right"
								>
									<DoDisturbAlt color="error"/>
								</Tooltip>
							</div>
							<div className="info-planejamento">
								Nomezinho 2
							</div>
							<div className="info-planejamento">
								01/01/2025
							</div>
							<div className="info-planejamento">
								31/12/2025
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
					<div className="item-planejamento">
						<Button>
							<div className="info-planejamento">
								<Tooltip
									title="Meta"
									placement="right"
								>
									<ModeStandby color="success"/>
								</Tooltip>
							</div>
							<div className="info-planejamento">
								Nomezinho 1
							</div>
							<div className="info-planejamento">
								01/01/2025
							</div>
							<div className="info-planejamento">
								31/12/2025
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
					<div className="item-planejamento">
						<Button>
							<div className="info-planejamento">
								<Tooltip
									title="Limite"
									placement="right"
								>
									<DoDisturbAlt color="error"/>
								</Tooltip>
							</div>
							<div className="info-planejamento">
								Nomezinho 2
							</div>
							<div className="info-planejamento">
								01/01/2025
							</div>
							<div className="info-planejamento">
								31/12/2025
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
				</div>
			</div>
		</div>
	);
}

export default ListagemPlanejamentos;