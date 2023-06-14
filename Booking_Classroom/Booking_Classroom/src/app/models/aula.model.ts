export interface Aula {
  id: string;
  aula: string;
  aforo: number;
  hora_inicial: number;
  hora_final: number;
  fecha: {seconds: number, miliseconds: number};
  ordenadores: string;
  proyector: string;
  reserva: {reservada: boolean, email: string}
}
