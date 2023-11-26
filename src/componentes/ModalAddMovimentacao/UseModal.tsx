import { useState } from "react";

export default function useModal() {
	const [isOpen, setisOpen] = useState(false);

	const closeModal = () => {
		setisOpen(!isOpen);
	};

	return {
		isOpen,
		closeModal
	};
}
