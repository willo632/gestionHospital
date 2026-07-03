import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Cita, EstadoCita } from '../../models/cita';
import { Paciente } from '../../models/paciente';
import { Doctor } from '../../models/doctor';

export interface CitaCrearData {
  cita:      Cita | null;
  pacientes: Paciente[];
  doctores:  Doctor[];
}

@Component({
  selector: 'app-cita-crear',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './cita-crear.html',
  styleUrl: './cita-crear.css',
})
export class CitaCrear {
  form: FormGroup;
  readonly estados: EstadoCita[] = ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'];

  constructor(
    fb: FormBuilder,
    private ref: MatDialogRef<CitaCrear>,
    @Inject(MAT_DIALOG_DATA) public data: CitaCrearData,
  ) {
    this.form = fb.group({
      paciente_id: [data.cita?.paciente_id ?? null, Validators.required],
      doctor_id:   [data.cita?.doctor_id   ?? null, Validators.required],
      fecha:       [data.cita?.fecha        ?? '',   Validators.required],
      hora:        [data.cita?.hora         ?? '',   Validators.required],
      motivo:      [data.cita?.motivo       ?? '',   Validators.required],
      estado:      [data.cita?.estado       ?? 'Pendiente', Validators.required],
    });
  }

  guardar(): void {
    if (!this.form.valid) return;
    const v = this.form.value;
    this.ref.close({
      ...v,
      motivo: v.motivo.toUpperCase(),
    });
  }
}
