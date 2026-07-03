import { Cita } from "src/citas/entities/cita.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctores')
export class Doctor {
  @PrimaryGeneratedColumn()
    doctor_id!: number;

  @Column({ type: 'varchar', length: 100 })
    nombre!: string;

  @Column({ type: 'varchar', length: 100 })
    apellido!: string;

  @Column({ type: 'varchar', length: 100 })
    especialidad!: string;

  @Column({ type: 'varchar', length: 20 })
    telefono!: string;

  @OneToMany(() => Cita, (cita) => cita.doctor)
    citas!: Cita[];  
}
