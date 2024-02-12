import { FC } from 'react';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasInformacoesGerais.scss';

const CategoriasInformacoesGerais: FC = () => {
	return (
		<div className='card-categorias-informacoes-gerais'>
			<div className="titulo">
				Informações gerais
			</div>
			<div className="info">
				Categoria mais gasta: categoria123
			</div>
			<div className="info">
				Categoria que mais rende: categoria321
			</div>
			<div className="info">
				Você ganha em média, $10 por mês
			</div>
			<div className="info">
				Você gasta em média, $10 por mês
			</div>
		</div>
	)
}

export default CategoriasInformacoesGerais;