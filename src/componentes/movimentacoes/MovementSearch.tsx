import { Close, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { movementSearchText } from "../../atoms/atom";

const MovementSearch: FC = () => {
	const [searchText, setSearchText] = useAtom(movementSearchText);
	const [typedText, setTypedText] = useState(searchText);

	useEffect(() => () => setSearchText(""), []);

	const changeSearchText = (text: string) => {
		setTypedText(text);
		setSearchText(text.trim());
	};

	return (
		<div className="busca">
			<TextField
				fullWidth
				size="small"
				placeholder="Buscar pela descrição da movimentação"
				value={typedText}
				onChange={(event) => changeSearchText(event.target.value)}
				helperText={searchText ? "Buscando em todo o período. Tipo e categorias continuam aplicados." : " "}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search/>
						</InputAdornment>
					),
					endAdornment: typedText && (
						<InputAdornment position="end">
							<IconButton size="small" onClick={() => changeSearchText("")}>
								<Close/>
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
		</div>
	);
}

export default MovementSearch;