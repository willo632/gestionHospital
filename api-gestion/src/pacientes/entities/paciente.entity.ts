import { Cita} from "src/citas/entities/cita.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('pacientes')
export class Paciente {
    @PrimaryGeneratedColumn()
    paciente_id!: number;

  @Column({type: 'varchar', length: 100 })
    nombre!: string;

  @Column({type: 'varchar', length: 100 })
    apellido!: string;

  @Column({ type: 'date' })
    fecha_nacimiento!: string;

  @Column({type: 'varchar', length: 20 })
    telefono!: string;

  @OneToMany(() => Cita, (cita) => cita.paciente)
    citas!: Cita[];
}
