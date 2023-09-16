import React from 'react';
import './InformacoesDoMes.scss';
import { AddCircleOutlineRounded,
	AssessmentOutlined,
	RemoveCircleOutlineRounded } from '@mui/icons-material';

const InformacoesDoMes: React.FC = () => {
	return (
		<div className="informacoes-do-mes">
			<div className="card-resumo-mes" style={{marginRight: "0.5%"}}>
				<div className="titulo">Resumos do mês</div>
				<div className="info-mes">
					<AddCircleOutlineRounded 
						sx={{ color: "#44A81D" }}
						fontSize="large"
					>
					</AddCircleOutlineRounded>Total recebido no mês: $10,00
				</div>
				<div className="info-mes">
					<RemoveCircleOutlineRounded 
						sx={{ color: "#B82121" }}
						fontSize="large"
					>
					</RemoveCircleOutlineRounded>Total de gastos do mês: $10,00
				</div>
				<div className="info-mes">
					<AssessmentOutlined 
						sx={{ color: "#3451C7" }}
						fontSize="large"
					>
					</AssessmentOutlined>Você gastou: 50% dos ganhos.
				</div>
			</div>
			<div className="card-resumo-mes" style={{marginRight: "0.5%"}}>
				<div className="titulo">Gráfico de ganhos</div>
			</div>
			<div className="card-resumo-mes">
				<div className="titulo">Gráfico de gastos</div>
			</div>
		</div>
	);
};

export default InformacoesDoMes;
