import { IMediasAnalitico } from "./IMediasAnalitico";

export interface ICategoriasInformacoesGeraisProps {
	medias: IMediasAnalitico | undefined;
	tipo: string;
	setComparison: (tipo: string) => void;
}