import { atom } from "jotai";
import { Planejamento } from "../types/Planejamento";

export const accessToken = atom("" as string | null);
export const pictureAtom = atom(localStorage.getItem("urlPicture") as string | null);
export const saldo = atom(0 as number);
export const modalPlanajamento = atom(false as boolean);
export const modalLogin = atom(false as boolean);
export const modalEditSaldo = atom(false as boolean);
export const modalTutoriais = atom(false as boolean);
export const alertMovimentacao = atom(false as boolean);
export const planejamento = atom({} as Planejamento);