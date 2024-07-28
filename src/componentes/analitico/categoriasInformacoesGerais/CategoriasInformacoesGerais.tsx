import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { ICategoriasInformacoesGeraisProps } from '../../../interfaces/ICategoriasInformacoesGeraisProps';
import '../../../paginas/analitico/Analitico.scss';
import './CategoriasInformacoesGerais.scss';

const CategoriasInformacoesGerais: FC<ICategoriasInformacoesGeraisProps> = (props: ICategoriasInformacoesGeraisProps) => {

	const handleChangeComparison = (event: ChangeEvent<HTMLInputElement>) => {
		props.setComparison(event.target.value);
	};
	
	return (
		<div className='card-categorias-informacoes-gerais'>
			<div className="titulo">
				Informações gerais
			</div>
			{montaGrafico()}
		</div>
	)

	function montaGrafico() {
		return props.medias && props.medias.categoriaMaisGasta ?
			<>
				<div className="type-comparison">
					<FormControl>
						<RadioGroup
							row
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="comparison"
							name="radio-buttons-group"
							onChange={handleChangeComparison}
						>
							<FormControlLabel value="comparison" control={<Radio />} label="Usar comparação" />
							<FormControlLabel value="selection" control={<Radio />} label="Usar mês selecionado" />
						</RadioGroup>
					</FormControl>
				</div>
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
		</div>

	}
}

export default CategoriasInformacoesGerais;