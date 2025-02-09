import { Box, Checkbox, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { accessToken } from "../../atoms/atom";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import { useBack } from "../../http";
import { FiltrosMovimentacoesProps } from "../../interfaces/FiltrosMovimentacoesProps";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import { CategoriaMovimentacao } from "../../types/CategoriaMovimentacao";

const FiltrosMovimentacoes: FC<FiltrosMovimentacoesProps> = (props: FiltrosMovimentacoesProps) => {
	const [categoriasIniciais, setCategoriasIniciais] = useState<CategoriaMovimentacao[]>([]);
	const [categorias, setCategorias] = useState<CategoriaMovimentacao[]>([]);
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(useBack());
	const [accessTokenAtom] = useAtom(accessToken);
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

	function getStyles(name: string, personName: readonly string[], theme: Theme) {
		return {
		 fontWeight: personName.includes(name)
			? theme.typography.fontWeightMedium
			: theme.typography.fontWeightRegular,
		};
	}

	const handleChangeTipo = (event: SelectChangeEvent) => {
		props.setTipo(event.target.value);
	};

	const handleChangeCategorias = (event: SelectChangeEvent<typeof props.categorias>) => {
		const { target: { value },} = event;
		const newValue = typeof value === 'string' ? value.split(',') : value;
		let updatedCategorias = newValue.includes("Todas") && newValue.length > 1 
			? newValue.filter((categoria) => categoria !== "Todas") 
			: newValue;
		if (!newValue.length) {
			updatedCategorias = ["Todas"];
		}
		props.setCategorias(updatedCategorias);
	};

	useEffect(() => {
		const buscaCategorias = async () => {
			try {
				if (accessTokenAtom !== "") {
					const categorias = await categoriaMovimentacaoService
						.obtemCategoriasPorTipoMovimentacaoEConta(TipoMovimentacaoEnum.TODOS);
					if (categorias?.data) {
						setCategoriasIniciais(categorias.data);
					}
				}
			} catch (error) {
				console.log("erro ao carregar categorias");
			}
		}
		buscaCategorias();
	}, []);

	useEffect(() => {
		if (props.tipo === "TODOS") {
			setCategorias(categoriasIniciais);
			return;
		}
		setCategorias(categoriasIniciais.filter(categoria =>
			categoria.tipoMovimentacao === props.tipo
		));
		handleChangeCategorias({
			target: { value: ["Todas"] }
		} as SelectChangeEvent<typeof props.categorias>);
	}, [props.tipo, categoriasIniciais]);

	return (
		<div className="filtros">
			<div className="filtro">
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
					<DemoContainer components={['DatePicker']}>
						<DatePicker
							sx={{ width: "25vh" }}
							label="De"
							value={props.dataInicio}
							defaultValue={props.dataInicio}
							onChange={(newValue) => props.setDataInicio(newValue)}
						/>
					</DemoContainer>
				</LocalizationProvider>
			</div>
			<div className="filtro">
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
					<DemoContainer components={['DatePicker']}>
						<DatePicker
							sx={{ width: "25vh" }}
							label="Até"
							value={props.dataFim}
							defaultValue={props.dataFim}
							onChange={(newValue) => props.setDataFim(newValue)}
						/>
					</DemoContainer>
				</LocalizationProvider>
			</div>
			<div className="filtro">
				<FormControl
					sx={{ width: "25vh", marginTop: 1 }}
				>
					<InputLabel
						id="demo-simple-select-helper-label"
					>
						Tipo movimentação
					</InputLabel>
					<Select
						id="select-categoria"
						value={props.tipo}
						label="tipo"
						onChange={handleChangeTipo}
						required={true}
					>
						<MenuItem
							key={"TODOS"}
							value={TipoMovimentacaoEnum.TODOS.toString()}
						>
							Todos
						</MenuItem>
						<MenuItem
							key={"POSITIVAS"}
							value={TipoMovimentacaoEnum.POSITIVO.toString()}
						>
							Rendimentos
						</MenuItem>
						<MenuItem
							key={"NEGATIVAS"}
							value={TipoMovimentacaoEnum.NEGATIVO.toString()}
						>
							Despesas
						</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className="filtro">
				<FormControl sx={{ width: "25vh" }}>
					<InputLabel id="demo-multiple-chip-label">Categorias</InputLabel>
					<Select
						size="small"
						labelId="demo-multiple-chip-label"
						id="demo-multiple-chip"
						multiple
						value={props.categorias}
						onChange={handleChangeCategorias}
						input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
						renderValue={(selected) => (
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
								{selected.map((value) => (
									<Chip key={value} label={value} />
								))}
							</Box>
						)}
						MenuProps={MenuProps}
					>
						{obtemSelectCategorias(categorias)}
					</Select>
				</FormControl>
			</div>
		</div>
	);

	function obtemSelectCategorias(categoriasReceived: CategoriaMovimentacao[]) {
		return categoriasReceived.map((categ, index) => (
			<MenuItem
				key={index}
				value={categ.nomeCategoria.toString()}
				style={getStyles(categ.nomeCategoria, props.categorias, theme)}
			>
				<Checkbox checked={props.categorias.includes(categ.nomeCategoria)} />
				{categ.nomeCategoria}
			</MenuItem>
		));
	}
}

export default FiltrosMovimentacoes;