import { useState } from "react";

export default function useModalZerar() {
	const [isOpenModal, setisOpen] = useState(false);

	const closeModalZerar = () => {
		setisOpen(!isOpenModal);
	};

	return {
		isOpenModalAdd: isOpenModal,
		closeModalZerar: closeModalZerar
	};
}