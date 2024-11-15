import { Button, Divider } from "@mui/material";
import { FC, Fragment } from "react";
import { IGoogleIdProps } from "../../../interfaces/IGoogleIdProps";
import "./Geral.scss";
import ModalZerar from "./modalZerar/ModalZerar";
import useModalZerar from "./modalZerar/UseModalZerar";

const Geral: FC<Partial<IGoogleIdProps>> = (props: Partial<IGoogleIdProps>) => {
	const {isOpenModalAdd, closeModalZerar} = useModalZerar();

	const handleEditCategoria = () => {
		closeModalZerar();
	};

	return (
		<Fragment>
			<div className="geral">
				<div className="botao">
					<Button onClick={() => handleEditCategoria()}>
						Zerar saldo
					</Button>
					<Divider/>
				</div>
			</div>
			<ModalZerar
				closeModal={closeModalZerar}
				isOpen={isOpenModalAdd}
				handleEditCategoria={handleEditCategoria}
			/>
		</Fragment>
	);
};

export default Geral;
