import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { ITextoProps } from "../interfaces/ITextoprops";


const Textos: FC<ITextoProps> = (p: ITextoProps) => {
	return (
		<Box sx={{width: '60%', height: 'auto'}}>
			<Typography color="#ffffff" variant="h4" sx={{marginBottom: "2vh", display:"flex", justifyContent: "center"}}>{p.titulo}</Typography>
			<Typography color="#ffffff" sx={{fontSize: "2vh"}}>{p.texto}</Typography>
		</Box>
	);
}

export default Textos;