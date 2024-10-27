import { Box, Checkbox, Chip, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../../componentes/AppBar/AppBar";
import { TipoMovimentacaoEnum } from "../../enums/TipoMovimentacaoEnum";
import back from "../../http";
import { ICategoriaMovimentacao } from "../../interfaces/ICategoriaMovimentacao";
import { IGoogleIdProps } from "../../interfaces/IGoogleIdProps";
import { CategoriaMovimentacaoService } from "../../services/CategoriaMovimentacaoService";
import './Movimentacoes.scss';

const Movimentacoes: FC<IGoogleIdProps> = (props: IGoogleIdProps) => {
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const [categoriasCarregadas, setCategoriasCarregadas] = useState<ICategoriaMovimentacao[]>([]);
	const [dataInicio, setDataInicio] = useState<Dayjs | null>(dayjs());
	const [tipo, setTipo] = useState<string>(TipoMovimentacaoEnum.TODOS.toString());
	const [categorias, setCategorias] = useState(["todas"]);
	const navigate = useNavigate();
	const isMounted = useRef(true);
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
		setTipo(event.target.value);
	};

	const handleChangeCategorias = (event: SelectChangeEvent<typeof categorias>) => {
		const { target: { value },} = event;
		setCategorias(typeof value === 'string' ? value.split(',') : value,);
	};

	useEffect(() => {
		const buscaCategorias = async () => {
			if (!props.googleId && isMounted.current) {
				navigate("/login")
			}
			try {
				if (props.googleId !== "") {
					const categorias = await categoriaMovimentacaoService
						.obtemCategoriasPorTipoMovimentacaoEConta(props.googleId, TipoMovimentacaoEnum.NEGATIVO);
					if (categorias?.data) {
						setCategoriasCarregadas(categorias.data);
					}
				}
			} catch (error) {
				console.log("erro ao carregar categorias");
			}
		}
		buscaCategorias();
	}, [tipo]);

	return (
		<Fragment>
			<AppBar
				modulo="Movimentações"
				urlPicture={props.urlPicture}
				setId={props.setId}
				setPicture={props.setPicture}
			/>
			<div className="movimentacoes">
				<div className="card">
					<div className="filtros">
						<div className="filtro">
							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
								<DemoContainer components={['DatePicker']}>
									<DatePicker
										sx={{ m: 1, width: "25vh" }}
										label="De"
										value={dataInicio}
										defaultValue={dataInicio}
										onChange={(newValue) => setDataInicio(newValue)}
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
										value={dataInicio}
										defaultValue={dataInicio}
										onChange={(newValue) => setDataInicio(newValue)}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</div>
						<div className="filtro">
							<FormControl
								required
								sx={{ m: 1, width: "25vh" }}
							>
								<InputLabel
									id="demo-simple-select-helper-label"
								>
									Tipo movimentação
								</InputLabel>
								<Select
									id="select-categoria"
									value={tipo}
									label="Age"
									onChange={handleChangeTipo}
									required={true}
								>
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
									<MenuItem
										key={"TODOAS"}
										value={TipoMovimentacaoEnum.TODOS.toString()}
									>
										Todas
									</MenuItem>
								</Select>
							</FormControl>
						</div>
						<FormControl sx={{ m: 1, width: "25vh" }}>
							<InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
							<Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
								value={categorias}
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
					<Divider orientation="vertical"/>
					<div className="listagem">
						
					</div>
				</div>
			</div>
		</Fragment>
	);
	
	function obtemSelectCategorias(categoriasReceived: ICategoriaMovimentacao[]) {
		return categoriasReceived.map((categ, index) => (
			<MenuItem
				key={index}
				value={categ.nomeCategoria.toString()}
				style={getStyles( categ.nomeCategoria, categorias, theme)}
			>
				<Checkbox checked={categorias.includes(categ.nomeCategoria)} />
				{categ.nomeCategoria}
			</MenuItem>
		));
	}
}

export default Movimentacoes;