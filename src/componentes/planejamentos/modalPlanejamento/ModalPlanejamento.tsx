import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useAtom } from "jotai";
import { FC, Fragment, useState } from "react";
import { modalPlanajamento } from "../../../atoms/atom";
import { TipoPlanejamentoEnum } from "../../../enums/TipoPlanejamentoEnum";
import { TipoRecorrenciaEnum } from "../../../enums/TipoRecorrenciaEnum";
import { IModalPlanejamento } from "../../../interfaces/IModalPlanejamentoProps";
import './ModalPlanejamento.scss';

const ModalPlanejamento: FC<IModalPlanejamento> = (props: IModalPlanejamento) => {
	const [isOpen, setIsOpenModalPlanejamento] = useAtom(modalPlanajamento);
	const [emptyValor, setEmptyValor] = useState(false);
	const [emptyNome, setEmptyNome] = useState(false);
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
	
	const handleChangetipo = (event: SelectChangeEvent) => {
		props.setTipo(event.target.value);
	};

	const handleChangeRecorrencia = (event: SelectChangeEvent) => {
		props.setRecorrencia(event.target.value);
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
	}

	function calculaSoma(): number {
		const unidade = props.recorrencia === 'SEMANAL' ? "week" : props.recorrencia === "MENSAL" ? "month" : "year"
		const quantidade = props.dataFim?.diff(props.dataInicio, unidade);
		if (quantidade !== undefined) {
			return (Number(quantidade) + 1) * Number(props.valor) ;
		}
		return 0;
	}

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
								//inputProps={{ type: 'number', step: "0.5"}}
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
						{props.tipo !== '' && props.recorrencia !== '' && props.valor !== '' && props.dataInicio !== null && props.dataFim !== null && (
							<div className="linha-planejamento">
								<Typography id="soma">{fraseSoma}{calculaSoma().toFixed(2).replace('.', ',')}</Typography>
							</div>
						)}
					</div>
				</DialogContent>
				<DialogActions>
				<Button onClick={fechaModal}>Cancel</Button>
				<Button type="submit">Subscribe</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

export default ModalPlanejamento;