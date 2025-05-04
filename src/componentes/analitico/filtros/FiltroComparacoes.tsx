import { Box, Checkbox, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { TipoComparacaoEnum } from "../../../enums/TipoComparacaoEnum";
import { IFiltroComparacoesProps } from "../../../interfaces/IFiltroComparacoesProps";
import { CategoriaMovimentacaoService } from "../../../services/CategoriaMovimentacaoService";
import { CategoriaMovimentacao } from "../../../types/CategoriaMovimentacao";
import './FiltroComparacoes.scss';

const FiltroComparacoes: FC<IFiltroComparacoesProps> = (props: IFiltroComparacoesProps) => {
	const POSITIVOS = "POSITIVOS";
	const NEGATIVOS = "NEGATIVOS";
	const [categorias, setCategorias] = useState<CategoriaMovimentacao[]>([]);
	const [selecionadas, setSelecionadas] = useState<string[]>([POSITIVOS]);
	const categoriaService = new CategoriaMovimentacaoService();
	const theme = useTheme();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	const handleChangeComparacao = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		props.setTipoComparacao(newValue);
	};

	const handleChangeCategorias = (event: SelectChangeEvent<typeof selecionadas>) => {
		const { target: { value }} = event;
		const valueArray = typeof value === 'string' ? value.split(',') : value;
		if (!selecionadas.includes(POSITIVOS) && valueArray.includes(POSITIVOS)) {
			setSelecionadas([POSITIVOS]);
			props.setCategoriasComparacao([POSITIVOS]);
			return;
		}
		if (!selecionadas.includes(NEGATIVOS) && valueArray.includes(NEGATIVOS)) {
			setSelecionadas([NEGATIVOS]);
			props.setCategoriasComparacao([NEGATIVOS]);
			return;
		}
		const positivos = valueArray.filter(item => ![POSITIVOS, NEGATIVOS].includes(item));
		setSelecionadas(positivos);
		props.setCategoriasComparacao(positivos);
	};

	useEffect(() => {
		const obtemCategorias = async () => {
			const response = await categoriaService.obtemCategoriasMovimentacaoPorConta();
			if (response?.data) {
				setCategorias(response.data)
			}
		}
		obtemCategorias();
	}, []);

	return (
		<div className="card-filters">
			<div className="filter">
				<FormControl className="form-categories" sx={{ width: "25vh", height: "57px", marginTop: 2 }}>
					<InputLabel id="demo-multiple-chip-label">Categorias</InputLabel>
					<Select
						size="small"
						labelId="demo-multiple-chip-label"
						id="demo-multiple-chip"
						multiple
						value={selecionadas}
						onChange={handleChangeCategorias}
						input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
						renderValue={(selected) => (
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
								{selected.map((value) => (
									<Chip key={value} label={value} />
								))}
							</Box>
						)}
						MenuProps={MenuProps}
					>
						<MenuItem
							key={POSITIVOS}
							value={POSITIVOS}
							style={getStyles(POSITIVOS, theme)}
						>
							<Checkbox checked={selecionadas.includes(POSITIVOS)} />
							{"Todas os rendimentos"}
						</MenuItem>
						<MenuItem
							key={NEGATIVOS}
							value={NEGATIVOS}
							style={getStyles(NEGATIVOS, theme)}
						>
							<Checkbox checked={selecionadas.includes(NEGATIVOS)} />
							{"Todas as despesas"}
						</MenuItem>
						{obtemSelectCategorias(categorias)}
					</Select>
				</FormControl>
			</div>
			<div className="filter">
				<FormControl
					sx={{m: 1, width: '18vh'}}
					size="small"
				>
					<InputLabel
						id="comparacao"
					>
						Comparação
					</InputLabel>
					<Select
						id="select-comparacao"
						value={props.tipoComparacao}
						onChange={handleChangeComparacao}
						defaultValue={TipoComparacaoEnum.TRESMESES.toString()}
					>
						<MenuItem
							key={"3"}
							value={TipoComparacaoEnum.TRESMESES.toString()}
						>
							Ùltimos 3 meses
						</MenuItem>
						<MenuItem
							key={"6"}
							value={TipoComparacaoEnum.SEISMESES.toString()}
						>
							Ùltimos 6 meses
						</MenuItem>
						<MenuItem
							key={"12"}
							value={TipoComparacaoEnum.UMANO.toString()}
						>
							Ùltimos 12 meses
						</MenuItem>
					</Select>
				</FormControl>
			</div>
		</div>
	);

	function getStyles(nome: string, theme: Theme) {
		return {
		 fontWeight: categorias.map(item => item.nomeCategoria).includes(nome)
			? theme.typography.fontWeightMedium
			: theme.typography.fontWeightRegular,
		};
	}

	function obtemSelectCategorias(categoriasReceived: CategoriaMovimentacao[]) {
		return categoriasReceived.map((categ, index) => (
			<MenuItem
				key={index}
				value={categ.nomeCategoria}
				style={getStyles(categ.nomeCategoria, theme)}
			>
				<Checkbox checked={selecionadas.includes(categ.nomeCategoria)} />
				{categ.nomeCategoria}
			</MenuItem>
		));
	}
}

export default FiltroComparacoes;