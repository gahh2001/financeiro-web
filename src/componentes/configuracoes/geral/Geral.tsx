import { Button, Divider } from "@mui/material";
import { useAtom } from "jotai";
import { FC, Fragment } from "react";
import { modalEditSaldo, modalTutoriais } from "../../../atoms/atom";
import { ILoginProps } from "../../../interfaces/ILoginProps";
import "./Geral.scss";
import ModalTutoriais from "./modalTutoriais/ModalTutoriais";
import ModalZerar from "./modalZerar/ModalZerar";

const Geral: FC<Partial<ILoginProps>> = (props: Partial<ILoginProps>) => {
	const [, setOpenSaldo] = useAtom(modalEditSaldo);
	const [, setOpenTutoriais] = useAtom(modalTutoriais);

	return (
		<Fragment>
			<div className="geral">
				<div className="botoes">
					<Divider/>
					<Button onClick={() => setOpenSaldo(true)}>
						Editar saldo
					</Button>
					<Divider/>
					<Button onClick={() => setOpenTutoriais(true)}>
						Mostrar Tutoriais
					</Button>
					<Divider/>
				</div>
			</div>
			<ModalZerar/>
			<ModalTutoriais/>
		</Fragment>
	);
};

export default Geral;
