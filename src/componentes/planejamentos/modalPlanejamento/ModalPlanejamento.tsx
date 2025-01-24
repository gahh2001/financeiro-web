import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Theme, Typography, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useAtom } from "jotai";
import { FC, Fragment, useEffect, useState } from "react";
import { googleIdAtom, modalPlanajamento } from "../../../atoms/atom";
import { TipoPlanejamentoEnum } from "../../../enums/TipoPlanejamentoEnum";
import { TipoRecorrenciaEnum } from "../../../enums/TipoRecorrenciaEnum";
import back from "../../../http";
import { IModalPlanejamento } from "../../../interfaces/IModalPlanejamentoProps";
import { CategoriaMovimentacaoService } from "../../../services/CategoriaMovimentacaoService";
import { CategoriaMovimentacao } from "../../../types/CategoriaMovimentacao";
import './ModalPlanejamento.scss';

const ModalPlanejamento: FC<IModalPlanejamento> = (props: IModalPlanejamento) => {
	const categoriaMovimentacaoService = new CategoriaMovimentacaoService(back);
	const [isOpen, setIsOpenModalPlanejamento] = useAtom(modalPlanajamento);
	const [emptyValor, setEmptyValor] = useState(false);
	const [emptyNome, setEmptyNome] = useState(false);
	const [googleId] = useAtom(googleIdAtom);
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
		case 'SEMANAL':
			fraseRecorrencia = "$ por semana";
			break;
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

	const handleChangetipo = (event: SelectChangeEvent) => {
		props.setTipo(event.target.value);
	};

	const handleChangeRecorrencia = (event: SelectChangeEvent) => {
		props.setRecorrencia(event.target.value);
	};

	const handleChangeCategorias = (event: SelectChangeEvent<typeof props.categorias>) => {
		props.setCategorias(event.target.value as number[]);
	};

	const convertInputValor = (event: any) => {
		let value = event.target.value;
		value = value.replace(/[^0-9]/g, "");
		let numberValue = parseFloat(value) / 100;
		props.setValor(numberValue.toFixed(2));
	};

	const fechaModal = () => {
		setIsOpenModalPlanejamento(false);
		props.setNome('');
		props.setTipo('');
		props.setRecorrencia('');
		props.setValor('');
		props.setDataInicio(null);
		props.setDataFim(null);
		props.setCategorias([])
	}

	function calculaSoma(): number {
		const unidade = props.recorrencia === 'SEMANAL' ? "week" : props.recorrencia === "MENSAL" ? "month" : "year"
		const quantidade = props.dataFim?.diff(props.dataInicio, unidade);
		if (quantidade !== undefined) {
			return (Number(quantidade) + 1) * Number(props.valor) ;
		}
		return 0;
	}

	useEffect(() => {
		const carregaCategorias = async () => {
			const categorias = await categoriaMovimentacaoService
				.obtemCategoriasMovimentacaoPorConta(googleId);
			if (categorias) {
				setCategorias(categorias?.data);
			}
		}
		carregaCategorias();
	},[]);

	return (
		<Fragment>
			<Dialog
				open={isOpen}
				onClose={fechaModal}
			>
				<DialogTitle>Adicionar planejamento</DialogTitle>
				<DialogContent>
					<div className="modal-planejamento">
						<div className="linha-planejamento">
						<TextField
								required
								error={emptyNome}
								value={props.nome}
								onChange={(value) => props.setNome(value.target.value)}
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
										key={"SEMANAL"}
										value={TipoRecorrenciaEnum.SEMANAL.toString()}
									>
										Semanal
									</MenuItem>
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
								error={emptyValor}
								value={props.valor}
								onChange={convertInputValor}
								inputProps={{ type: 'number', step: "0.5"}}
								sx={{width: "250px" }}
								label= {fraseRecorrencia}
							/>
						</div>
						<div className="linha-planejamento">
							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
								<DemoContainer components={['DatePicker']}>
									<DatePicker
										sx={{width: "250px" }}
										label="Data de início"
										value={props.dataInicio}
										onChange={(newValue) => props.setDataInicio(newValue)}
									/>
								</DemoContainer>
								<DemoContainer components={['DatePicker']}>
									<DatePicker
										sx={{width: "250px" }}
										label="Data do fim"
										value={props.dataFim}
										onChange={(newValue) => props.setDataFim(newValue)}
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
										style={getStyles( -1, props.categorias, theme)}
									>
										<Checkbox checked={props.categorias.includes(-1)} />
										Todos os rendimentos
									</MenuItem>
									<MenuItem
										key={"TODOSGASTOS"}
										value={-2}
										style={getStyles( -2, props.categorias, theme)}
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
					</div>
				</DialogContent>
				<DialogActions className="modal-planejamento-butons">
					<Button onClick={fechaModal}>Cancelar</Button>
					<Button type="submit">Salvar</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);

	function obtemSelectCategorias() {
		return categorias.map((categ, index) => (
			<MenuItem
				key={index}
				value={categ.id || 0}
				style={getStyles( categ.id || 0, props.categorias, theme)}
			>
				<Checkbox checked={props.categorias.includes(categ.id || 0)} />
				{categ.nomeCategoria}
			</MenuItem>
		))
	}
}

export default ModalPlanejamento;