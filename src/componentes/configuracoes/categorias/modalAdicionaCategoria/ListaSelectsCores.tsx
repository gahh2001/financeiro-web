import { Circle } from "@mui/icons-material";
import { MenuItem } from "@mui/material";

const listaSelectCores = () => {
	return [
			<MenuItem
				key={"AZUL"}
				value={"#5482ff"}
			>
				<Circle sx={{color: "#5482ff"}}/>
			</MenuItem>,
			<MenuItem
				key={"VERMELHO"}
				value={"#e15734db"}
			>
				<Circle sx={{color: "#e15734db"}}/>
			</MenuItem>,
			<MenuItem
				key={"BRANCO"}
				value={"#e5e5e5"}
			>
				<Circle sx={{color: "#e5e5e5"}}/>
			</MenuItem>,
			<MenuItem
				key={"VERDE"}
				value={"#239d12"}
			>
				<Circle sx={{color: "#239d12"}}/>
			</MenuItem>,
			<MenuItem
				key={"AMARELO"}
				value={"#FFD141"}
			>
				<Circle sx={{color: "#FFD141"}}/>
			</MenuItem>,
			<MenuItem
				key={"ROSA"}
				value={"#f45dfa"}
			>
				<Circle sx={{color: "#f45dfa"}}/>
			</MenuItem>,
			<MenuItem
				key={"ROXO"}
				value={"#8200fb"}
			>
				<Circle sx={{color: "#8200fb"}}/>
			</MenuItem>,
			<MenuItem
				key={"CINZA"}
				value={"#656C7D"}
			>
				<Circle sx={{color: "#656C7D"}}/>
			</MenuItem>
		];
}

export default listaSelectCores;