import {
	AccountBalance, AccountBalanceWallet, AttachMoney, Audiotrack, Commute, Cottage,
	CreditCard, Dining, Discount, Flight, LocalGasStation, ShoppingCart, SportsEsports,
	Star, Store
} from "@mui/icons-material";
import BarChart from "@mui/icons-material/BarChart";
import { FC } from "react";
import { IModalCategoriaProps } from "../interfaces/IModalCategoriaProps";

const ConverteIcone: FC<Partial<IModalCategoriaProps>> = (props: Partial<IModalCategoriaProps>) => {
	switch (props.icone) {
		case "BANCO":
			return (
				<AccountBalance sx={{color: props.corIcone}}/>
			);
		case "CARTEIRA":
			return (
				<AccountBalanceWallet sx={{color: props.corIcone}}/>
			);
		case "LOJA":
			return (
				<Store sx={{color: props.corIcone}}/>
			);
		case "DINHEIRO":
			return (
				<AttachMoney sx={{color: props.corIcone}}/>
			);
		case "MIDIA":
			return (
				<Audiotrack sx={{color: props.corIcone}}/>
			);
		case "TRANSPORTE":
			return (
				<Commute sx={{color: props.corIcone}}/>
			);
		case "CASA":
			return (
				<Cottage sx={{color: props.corIcone}}/>
			);
		case "CARTAO":
			return (
				<CreditCard sx={{color: props.corIcone}}/>
			);
		case "COMIDA":
			return (
				<Dining sx={{color: props.corIcone}}/>
			);
		case "COMPRA":
			return (
				<Discount sx={{color: props.corIcone}}/>
			);
		case "VIAGEM":
			return (
				<Flight sx={{color: props.corIcone}}/>
			);
		case "COMBUSTIVEL":
			return (
				<LocalGasStation sx={{color: props.corIcone}}/>
			);
		case "MERCADO":
			return (
				<ShoppingCart sx={{color: props.corIcone}}/>
			);
		case "FAVORITO":
			return (
				<Star sx={{color: props.corIcone}}/>
			);
		case "JOGO":
			return (
				<SportsEsports sx={{color: props.corIcone}}/>
			);
		default:
			return (
				<BarChart sx={{color: props.corIcone}}/>
			);
	}
}

export default ConverteIcone;