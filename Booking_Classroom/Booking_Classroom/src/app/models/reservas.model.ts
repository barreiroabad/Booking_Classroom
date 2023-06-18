import { Aula } from "./aula.model";

export interface Reservas {
  id: string
  email: string;
  fecha: number ;
  aula: Aula
}
