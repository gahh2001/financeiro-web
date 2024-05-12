export type IGoogleIdProps = {
	googleId: string | null;
	urlPicture: string | null;
	setId: (id: string) => void;
	setPicture: (url: string) => void;
}