import { Box, Checkbox, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TipoMovimentacaoEnum } from "../../../enums/TipoMovimentacaoEnum";
import back from "../../../http";
import { FiltrosMovimentacoesProps } from "../../../interfaces/FiltrosMovimentacoesProps";
import { ICategoriaMovimentacao } from "../../../interfaces/ICategoriaMovimentacao";
import { CategoriaMovimentacaoService } from "../../../services/CategoriaMovimentacaoService";


const FiltrosMovimentacoes: FC<FiltrosMovimentacoesProps> = (props: FiltrosMovimentacoesProps) => {
	const [categoriasCarregadas, setCategoriasCarregadas] = useState<ICategoriaMovimentacao[]>([]);
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const theme = useTheme();
	const isMounted = useRef(true);
	const navigate = useNavigate();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const tipoEnum = props.tipo === "TODOS"
		? TipoMovimentacaoEnum.TODOS : props.tipo === "POSITIVO"
			? TipoMovimentacaoEnum.POSITIVO : TipoMovimentacaoEnum.NEGATIVO;
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
		if ( !newValue.length ) {
			updatedCategorias = ["Todas"];
		}
		props.setCategorias(updatedCategorias);
	};

	useEffect(() => {
		const buscaCategorias = async () => {
			if (!props.googleId && isMounted.current) {
				navigate("/login")
			}
			try {
				if (props.googleId !== "") {
					const categorias = await categoriaMovimentacaoService
						.obtemCategoriasPorTipoMovimentacaoEConta(props.googleId, tipoEnum);
					if (categorias?.data) {
						setCategoriasCarregadas(categorias.data);
					}
				}
			} catch (error) {
				console.log("erro ao carregar categorias");
			}
		}
		buscaCategorias();
	}, [props.tipo]);

	return (
		<div className="filtros">
			<div className="filtro">
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
					<DemoContainer components={['DatePicker']}>
						<DatePicker
							sx={{ m: 1, width: "25vh" }}
							label="De"
							value={props.dataInicio}
							defaultValue={props.dataInicio}
							onChange={(newValue) =>  props.setDataInicio(newValue)}
						/>
					</DemoContainer>
				</LocalizationProvider>
			</div>
			<div className="filtro">
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
					<DemoContainer components={['DatePicker']}>
						<DatePicker
							sx={{ m: 1, width: "25vh" }}
							label="Até"
							value={props.dataFim}
							defaultValue={props.dataFim}
							onChange={(newValue) =>  props.setDataFim(newValue)}
						/>
					</DemoContainer>
				</LocalizationProvider>
			</div>
			<div className="filtro">
				<FormControl
					sx={{ m: 1, width: "25vh" }}
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
			<FormControl sx={{ m: 1, width: "25vh" }}>
				<InputLabel id="demo-multiple-chip-label">Categorias</InputLabel>
				<Select
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
					{obtemSelectCategorias(categoriasCarregadas)}
				</Select>
			</FormControl>
		</div>
	);

	function obtemSelectCategorias(categoriasReceived: ICategoriaMovimentacao[]) {
		return categoriasReceived.map((categ, index) => (
			<MenuItem
				key={index}
				value={categ.nomeCategoria.toString()}
				style={getStyles( categ.nomeCategoria, props.categorias, theme)}
			>
				<Checkbox checked={props.categorias.includes(categ.nomeCategoria)} />
				{categ.nomeCategoria}
			</MenuItem>
		));
	}
}

export default FiltrosMovimentacoes;