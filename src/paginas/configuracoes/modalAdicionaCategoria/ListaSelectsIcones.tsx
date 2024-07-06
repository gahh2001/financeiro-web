import { AccountBalance, AccountBalanceWallet, AttachMoney, Audiotrack, Commute, Cottage, CreditCard, Dining, Discount, Flight, LocalGasStation, ShoppingCart, SportsEsports, Star, Store } from "@mui/icons-material";
import BarChart from "@mui/icons-material/BarChart";
import { MenuItem } from "@mui/material";

const listaSelectIcones = () => {
	return [
			<MenuItem
				key={"grafico"}
				value={"GRAFICO"}
			>
				<BarChart/>
			</MenuItem>,
			<MenuItem
				key={"banco"}
				value={"BANCO"}
			>
				<AccountBalance/>
			</MenuItem>,
			<MenuItem
				key={"carteira"}
				value={"CARTEIRA"}
			>
				<AccountBalanceWallet/>
			</MenuItem>,
			<MenuItem
				key={"loja"}
				value={"LOJA"}
			>
				<Store/>
			</MenuItem>,
			<MenuItem
				key={"dinheiro"}
				value={"DINHEIRO"}
			>
				<AttachMoney/>
			</MenuItem>,
			<MenuItem
				key={"midia"}
				value={"MIDIA"}
			>
				<Audiotrack/>
			</MenuItem>,
			<MenuItem
				key={"transporte"}
				value={"TRANSPORTE"}
			>
				<Commute/>
			</MenuItem>,
			<MenuItem
				key={"casa"}
				value={"CASA"}
			>
				<Cottage/>
			</MenuItem>,
			<MenuItem
				key={"cartao"}
				value={"CARTAO"}
			>
				<CreditCard/>
			</MenuItem>,
			<MenuItem
				key={"comida"}
				value={"COMIDA"}
			>
				<Dining/>
			</MenuItem>,
			<MenuItem
				key={"compra"}
				value={"COMPRA"}
			>
				<Discount/>
			</MenuItem>,
			<MenuItem
				key={"viagem"}
				value={"VIAGEM"}
			>
				<Flight/>
			</MenuItem>,
			<MenuItem
				key={"combustivel"}
				value={"COMBUSTIVEL"}
			>
				<LocalGasStation/>
			</MenuItem>,
			<MenuItem
				key={"mercado"}
				value={"MERCADO"}
			>
				<ShoppingCart/>
			</MenuItem>,
			<MenuItem
				key={"favorito"}
				value={"FAVORITO"}
			>
				<Star/>
			</MenuItem>,
			<MenuItem
				key={"jogo"}
				value={"JOGO"}
			>
				<SportsEsports/>
			</MenuItem>
		];
}

export default listaSelectIcones;