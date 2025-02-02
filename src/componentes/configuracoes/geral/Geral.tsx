import { Button, Divider } from "@mui/material";
import { useAtom } from "jotai";
import { FC, Fragment } from "react";
import { modalEditSaldo } from "../../../atoms/atom";
import { IGoogleIdProps } from "../../../interfaces/IGoogleIdProps";
import "./Geral.scss";
import ModalZerar from "./modalZerar/ModalZerar";

const Geral: FC<Partial<IGoogleIdProps>> = (props: Partial<IGoogleIdProps>) => {
	const [, setOpen] = useAtom(modalEditSaldo);

	return (
		<Fragment>
			<div className="geral">
				<div className="botao">
					<Button onClick={() => setOpen(true)}>
						Editar saldo
					</Button>
					<Divider/>
				</div>
			</div>
			<ModalZerar/>
		</Fragment>
	);
};

export default Geral;
