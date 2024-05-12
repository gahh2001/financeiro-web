export interface IAppBarProps {
	modulo: string;
	urlPicture: string | null;
	setId: (id: string) => void;
	setPicture: (url: string) => void;
}