import CheckIcon from '@mui/icons-material/Check';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Theme, Typography, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useState } from "react";
import { modalPlanajamento } from "../../../atoms/atom";
import { TipoPlanejamentoEnum } from "../../../enums/TipoPlanejamentoEnum";
import { TipoRecorrenciaEnum } from "../../../enums/TipoRecorrenciaEnum";
import { useBack } from '../../../http';
import { IModalPlanejamento } from "../../../interfaces/IModalPlanejamentoProps";
import { CategoriaMovimentacaoService } from "../../../services/CategoriaMovimentacaoService";
import { PlanejamentoService } from "../../../services/PlanejamentoService";
import { CategoriaMovimentacao } from "../../../types/CategoriaMovimentacao";
import { Planejamento } from "../../../types/Planejamento";
import './ModalPlanejamento.scss';

const ModalPlanejamento: FC<IModalPlanejamento> = (props: IModalPlanejamento) => {
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(useBack());
	const planejamentoService = new PlanejamentoService(useBack());
	const [isOpen, setIsOpenModalPlanejamento] = useAtom(modalPlanajamento);
	const [emptyNome, setEmptyNome] = useState(props.nome === '');
	const [emptyTipo, setEmptyTipo] = useState(props.tipo === '');
	const [emptyRecorrencia, setEmptyRecorrencia] = useState(props.recorrencia === '');
	const [emptyValor, setEmptyValor] = useState(props.valor === '');
	const [emptyInicio, setEmptyInicio] = useState(props.dataInicio === null);
	const [emptyFim, setEmptyFim] = useState(props.dataFim === null);
	const [emptyCategorias, setEmptyCategorias] = useState(props.categorias.length < 1);
	const [success, setSuccess] = useState(false);
	const camposInvalidos = emptyNome || emptyTipo || emptyRecorrencia || emptyValor || emptyInicio
		|| emptyFim || emptyCategorias;
	const [categorias, setCategorias] = useState<CategoriaMovimentacao[]>([]);
	let fraseValor = 'O valor será:';
	let fraseRecorrencia = 'Valor';
	let fraseSoma = '';

	switch (props.tipo) {
		case "META":
			fraseValor = "O valor da meta será:";
			fraseSoma = "Ao final do período, você terá somado $";
			break;
		case "LIMITE":
			fraseValor = "O valor do limite será:";
			fraseSoma = "Ao final do período, você terá economizado $";
			break;
		default:
			break;
	}

	switch (props.recorrencia) {
		case 'MENSAL':
			fraseRecorrencia = "$ por mes";
			break;
		case 'ANUAL':
			fraseRecorrencia = "$ por ano";
			break;
		default:
			break;
	}

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

	function getStyles(name: number, value: readonly number[], theme: Theme) {
		return {
		fontWeight: value.includes(name)
			? theme.typography.fontWeightMedium
			: theme.typography.fontWeightRegular,
		};
	}

	const handleChangeNome = (value: string) => {
		setEmptyNome(value === '');
		props.setNome(value);
	}

	const handleChangetipo = (event: SelectChangeEvent) => {
		props.setTipo(event.target.value);
		setEmptyTipo(event.target.value === '');
	};

	const handleChangeRecorrencia = (event: SelectChangeEvent) => {
		props.setRecorrencia(event.target.value);
		setEmptyRecorrencia(event.target.value === '');
	};

	const handleChangeCategorias = (event: SelectChangeEvent<typeof props.categorias>) => {
		props.setCategorias(event.target.value as number[]);
		setEmptyCategorias(event.target.value.length < 1)
	};

	const convertInputValor = (event: any) => {
		let value = event.target.value;
		value = value.replace(/[^0-9]/g, "");
		let numberValue = parseFloat(value) / 100;
		setEmptyValor(event.target.value === '');
		props.setValor(numberValue.toFixed(2));
	};

	const handleChangeInicio = (newValue: Dayjs | null) => {
		setEmptyInicio(newValue === null);
		props.setDataInicio(newValue);
	}

	const handleChangeFim = (newValue: Dayjs | null) => {
		setEmptyFim(newValue === null);
		props.setDataFim(newValue);
	}

	const handleChangeInativar = () => {
		props.setAtivo(!props.ativo);
	}

	const fechaModal = () => {
		setIsOpenModalPlanejamento(false);
		props.setId(0);
		props.setNome('');
		props.setTipo('');
		props.setRecorrencia('');
		props.setValor('');
		props.setDataInicio(null);
		props.setDataFim(null);
		props.setCategorias([]);
		props.setEdit(false);
		setEmptyNome(false);
		setEmptyTipo(false);
		setEmptyRecorrencia(false);
		setEmptyValor(false);
		setEmptyInicio(false);
		setEmptyFim(false);
		setEmptyCategorias(false);
		setSuccess(false);
	}

	function calculaSoma(): number {
		const unidade = props.recorrencia === "MENSAL" ? "month" : "year";
		const quantidade = props.dataFim?.diff(props.dataInicio, unidade);
		if (quantidade !== undefined) {
			return (Number(quantidade) + 1) * Number(props.valor);
		}
		return 0;
	}

	useEffect(() => {
		if (isOpen) {
			const carregaCategorias = async () => {
				const categorias = await categoriaMovimentacaoService
					.obtemCategoriasMovimentacaoPorConta();
				if (categorias) {
					setCategorias(categorias?.data);
				}
			}
			setEmptyNome(props.nome === '');
			setEmptyTipo(props.tipo === '');
			setEmptyRecorrencia(props.recorrencia === '');
			setEmptyValor(props.valor === '');
			setEmptyInicio(props.dataInicio === null);
			setEmptyFim(props.dataFim === null);
			setEmptyCategorias(props.categorias.length < 1);
			carregaCategorias();
		}
	},[isOpen]);

	return (
		<Fragment>
			<Dialog
				open={isOpen}
				onClose={fechaModal}
				id='modais'
			>
				<DialogTitle>Adicionar planejamento</DialogTitle>
				<DialogContent>
					<div className="modal-planejamento">
						<div className="linha-planejamento">
						<TextField
								required
								value={props.nome}
								onChange={(value) => handleChangeNome(value.target.value)}
								sx={{width: "100%" }}
								label="Nome"
							/>
						</div>
						<div className="linha-planejamento">
							<FormControl
								sx={{width: '250px'}}
								size="medium"
							>
								<InputLabel
									id="input-tipo-planejamento"
								>
									Tipo
								</InputLabel>
								<Select
									id="select-tipo-planejamento"
									value={props.tipo}
									onChange={handleChangetipo}
									defaultValue={TipoPlanejamentoEnum.META.toString()}
								>
									<MenuItem
										key={"META"}
										value={TipoPlanejamentoEnum.META.toString()}
									>
										Meta
									</MenuItem>
									<MenuItem
										key={"NEGATIVAS"}
										value={TipoPlanejamentoEnum.LIMITE.toString()}
									>
										Limite
									</MenuItem>
								</Select>
							</FormControl>
							<FormControl
								sx={{width: '250px'}}
								size="medium"
							>
								<InputLabel
									id="input-recorrencia-planejamento"
								>
									Recorrência
								</InputLabel>
								<Select
									id="select-recorrencia-planejamento"
									value={props.recorrencia}
									onChange={handleChangeRecorrencia}
									defaultValue={TipoRecorrenciaEnum.MENSAL.toString()}
								>
									<MenuItem
										key={"MENSAL"}
										value={TipoRecorrenciaEnum.MENSAL.toString()}
									>
										Mensal
									</MenuItem>
									<MenuItem
										key={"ANUAL"}
										value={TipoRecorrenciaEnum.ANUAL.toString()}
									>
										Anual
									</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="linha-planejamento">
							<Typography id="typo">{fraseValor}</Typography>
							<TextField
								required
								value={props.valor}
								onChange={convertInputValor}
								inputProps={{ type: 'number', step: "0.5"}}
								sx={{width: "250px" }}
								label= {fraseRecorrencia}
							/>
						</div>
						<div className="linha-planejamento">
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale="pt-br"
							>
								<DemoContainer components={['DatePicker']}>
									<DatePicker
										sx={{width: "250px" }}
										label="Data de início"
										value={props.dataInicio}
										onChange={(newValue) => handleChangeInicio(newValue)}
									/>
								</DemoContainer>
								<DemoContainer components={['DatePicker']}>
									<DatePicker
										sx={{width: "250px" }}
										label="Data do fim"
										value={props.dataFim}
										onChange={(newValue) => handleChangeFim(newValue)}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</div>
						<div className="linha-planejamento">
							<Typography id="quais-categorias" variant="subtitle1">Quais categorias farão parte? </Typography>
							<FormControl
								sx={{width: '250px'}}
								size="medium"
							>
								<InputLabel
									id="input-categoria-planejamento"
								>
									Categorias
								</InputLabel>
								<Select
									id="select-categoria-planejamento"
									value={props.categorias}
									onChange={handleChangeCategorias}
									MenuProps={MenuProps}
									multiple
								>
									<MenuItem
										key={"TODOSRENDIMENTOS"}
										value= {-1}
										style={getStyles(-1, props.categorias, theme)}
									>
										<Checkbox checked={props.categorias.includes(-1)} />
										Todos os rendimentos
									</MenuItem>
									<MenuItem
										key={"TODOSGASTOS"}
										value={-2}
										style={getStyles(-2, props.categorias, theme)}
									>
										<Checkbox checked={props.categorias.includes(-2)} />
										Todos os gastos
									</MenuItem>
									{obtemSelectCategorias()}
								</Select>
							</FormControl>
						</div>
						{props.tipo !== '' && props.recorrencia !== '' && props.valor !== '' && props.dataInicio !== null && props.dataFim !== null && (
							<div className="linha-planejamento">
								<Typography id="soma">{fraseSoma}{calculaSoma().toFixed(2).replace('.', ',')}</Typography>
							</div>
						)}
						{props.edit && <div className="inativar-planejamento">
							<FormGroup>
								<FormControlLabel
									control={
										<Switch
											checked={!props.ativo}
											color='primary'
											onChange={handleChangeInativar}
										/>
									}
									label="Inativar planejamento"
								/>
							</FormGroup>
						</div>}
					</div>
				</DialogContent>
				<DialogActions className="modal-planejamento-butons">
					<Button onClick={fechaModal}>Fechar</Button>
					<Button
						onClick={salvarPlanejamento}
						disabled={camposInvalidos || success}
					>
						{success ? <CheckIcon sx={{color: "green"}}/> : "Salvar"}
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);

	function obtemSelectCategorias() {
		return categorias.map((categ, index) => (
			<MenuItem
				key={index}
				value={categ.id || 0}
				style={getStyles(categ.id || 0, props.categorias, theme)}
			>
				<Checkbox checked={props.categorias.includes(categ.id || 0)} />
				{categ.nomeCategoria}
			</MenuItem>
		))
	}

	async function salvarPlanejamento() {
		const novo: Partial<Planejamento> = {
			id: props.id === 0 ? undefined : props.id,
			nome: props.nome,
			tipo: props.tipo,
			recorrencia: props.recorrencia,
			valor: Number(props.valor),
			dataInicio: props.dataInicio?.toDate() || new Date(),
			dataFim: props.dataFim?.toDate() || new Date(),
			categorias: props.categorias,
			ativo: true,
		};
		if (novo.id && novo.id !== 0) {
			novo.ativo = props.ativo
			await planejamentoService.atualizaPlanejamento(novo);
		} else {
			await planejamentoService.criaPlanejamento(novo);
		}
		setSuccess(true);
	}
}

export default ModalPlanejamento;