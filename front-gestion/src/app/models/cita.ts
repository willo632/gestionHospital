import { Doctor } from "./doctor";
import { Paciente } from "./paciente";
export type EstadoCita = 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Completada';

export interface Cita {
    cita_id?: number;
  paciente_id: number;
  doctor_id: number;
  fecha: string;
  hora: string;
  motivo: string;
  estado: EstadoCita;
  paciente?: Paciente;
  doctor?: Doctor;
}
