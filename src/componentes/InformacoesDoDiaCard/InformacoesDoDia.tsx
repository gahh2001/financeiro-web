import React from 'react';
import './InformacoesDoDia.scss';
import { AddCircleOutlineRounded,
		InfoOutlined,
		AssessmentOutlined,
		RemoveCircleOutlineRounded } from '@mui/icons-material';

const InformacoesDoDia: React.FC = () => {
	return (
		<div className="informacoes-do-dia">
			<div className="card-resumo-dia">
				<div className="titulo">Resumo do dia 01/01/2023</div>
				<div className="info-dia"> 
					<AddCircleOutlineRounded 
						sx={{ color: "#44A81D" }}
						fontSize="large"
					>
					</AddCircleOutlineRounded>Total de ganhos: $10,00
				</div>
				<div className="info-dia">
					<RemoveCircleOutlineRounded 
						color="error"
						fontSize="large"
					>
					</RemoveCircleOutlineRounded>Total de gastos: $10,00
				</div>
				<div className="info-dia">
					<AssessmentOutlined
						sx={{ color: "#3451C7" }}
						fontSize="large"
					>
					</AssessmentOutlined>Saldo total do dia: $0,00
				</div>
				<div className="buttons">
					<button style={{marginRight: "40px"}}>
						<AddCircleOutlineRounded 
							sx={{ color: "#44A81D" }}
							fontSize="inherit"
							
						>
						</AddCircleOutlineRounded>
					</button>
					<button>
						<RemoveCircleOutlineRounded 
							sx={{ color: "#B82121" }}
							fontSize="inherit"
						>
						</RemoveCircleOutlineRounded>
					</button>
				</div>
				<div className="dica" style={{textAlign: "center"}}>
					<InfoOutlined 
						fontSize="small"
					>
					</InfoOutlined>Selecione um dia do calendário para ver as movimentações.
				</div>
			</div>
			<div className="card-movimentacoes">
				<div className="titulo">Movimentações:</div>
				<div className="header">
					<div className="header-vazio"></div>
					<div className="header-categoria">Categoria:</div>
					<div className="header-valor">Valor:</div>
				</div>
				
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded 
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded 
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded 
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded 
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded 
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded 
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded 
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded 
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<AddCircleOutlineRounded 
							sx={{ color: "#44A81D" }}
							fontSize="large"
						>
						</AddCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
				<div className="movimentacao-dia">
					<div className="icon-movimentacao">
						<RemoveCircleOutlineRounded 
							sx={{ color: "#B82121" }}
							fontSize="large"
						>
						</RemoveCircleOutlineRounded>
						
					</div>
					<div className="descricao-movimentacao">Aluguel</div>
					<div className="valor-movimentacao">$500,00</div>
				</div>
			</div>
		</div>
	);
};

export default InformacoesDoDia;
