import { AddCircleOutlineRounded } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { FC, Fragment } from "react";
import AppBar from "../../componentes/AppBar/AppBar";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import "./Configuracoes.scss";

const Configuracoes: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {

	return (
		<Fragment>
			<AppBar
				modulo="Configurações"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="configuracoes">
				<div className="card">
					<div className="card-menus">
						<Divider variant="fullWidth"/>
						<Button>Categorias de movimentação</Button>
						<br/>
						<Divider variant="fullWidth"/>
						<Button>Teste</Button>
						<Divider variant="fullWidth"/>
						<Button>Configuração</Button>
						<Divider variant="fullWidth"/>
					</div>
					<Divider orientation="vertical" variant="fullWidth"/>
					<div className="config">
						<div className="titulo">
							Teste
						</div>
						{montaCategoriasMovimentacao()}
					</div>
				</div>
			</div>
		</Fragment>
	);

	function montaCategoriasMovimentacao() {
		return (
			<div className="categorias">
				<div className="headers">
					<p>Tipo</p>
					<p>Nome</p>
					<p>Ícone</p>
				</div>
				<div className="listagem">
					<Divider/>
					<div className="itens">
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
						<Button>
							<p>positivo</p>
							<p>Nome de teste</p>
							<AddCircleOutlineRounded/>
						</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default Configuracoes