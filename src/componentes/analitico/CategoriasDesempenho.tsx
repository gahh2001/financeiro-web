import { FC } from 'react';
import { ICategoriasInformacoesGeraisProps } from '../../interfaces/ICategoriasInformacoesGeraisProps';

const CategoriasDesempenho: FC<ICategoriasInformacoesGeraisProps> = (props: ICategoriasInformacoesGeraisProps) => {
	
	return (
		<div className='card-categorias-informacoes-gerais'>
			<div className="titulo">
				Desempenho
			</div>
			{props.medias ?
				<>
					<div className="infos">
						<div className="info">
							A categoria que você mais ganhou foi {props.medias?.categoriaMaisGasta}.
						</div>
						<div className="info">
							A categoria que você mais gastou foi {props.medias?.categoriaMenosGasta}.
						</div>
						<div className="info">
							Você ganhou em média, ${props.medias?.ganhoMedia.toFixed(0).replace('.', '')} por mês.
						</div>
						<div className="info">
							Você gastou em média, ${props.medias?.gastomedia.toFixed(0).replace('.', '')} por mês.
						</div>
						<div className="info">
							Em média, você gastou {props.medias?.porcentagem.toFixed(0).replace('.', '')}% dos seus rendimentos.
						</div>
					</div>
				</>
			: <div className="mensagem">
				Nenhum registro para este período!
			</div>}
		</div>
	)
}

export default CategoriasDesempenho;