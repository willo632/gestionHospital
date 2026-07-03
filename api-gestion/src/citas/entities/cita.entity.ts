import { Doctor } from "src/doctores/entities/doctor.entity";
import { Paciente } from "src/pacientes/entities/paciente.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export type EstadoCita = 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Completada';
@Entity('citas')
export class Cita {
   @PrimaryGeneratedColumn()
    cita_id!: number;

  @Column()
    paciente_id!: number;

  @Column()
    doctor_id!: number;

  @Column({ type: 'date' })
    fecha!: string;

  @Column({ type: 'varchar', length: 5 })
    hora!: string;

  @Column({ type: 'varchar', length: 255 })
    motivo!: string;

  @Column({
        type: 'varchar',
        length: 20,
        default: 'Pendiente',
    })
    estado: EstadoCita = "Pendiente";

  @ManyToOne(() => Paciente, (paciente) => paciente.citas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente = new Paciente();

  @ManyToOne(() => Doctor, (doctor) => doctor.citas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor = new Doctor();
}
