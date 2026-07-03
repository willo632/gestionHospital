import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-paciente-crear',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './paciente-crear.html',
  styleUrl: './paciente-crear.css',
})
export class PacienteCrear {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private ref: MatDialogRef<PacienteCrear>,
    @Inject(MAT_DIALOG_DATA) public data: Paciente | null,
  ) {
    this.form = fb.group({
      nombre:           [data?.nombre           ?? '', Validators.required],
      apellido:         [data?.apellido         ?? '', Validators.required],
      fecha_nacimiento: [data?.fecha_nacimiento ?? '', Validators.required],
      telefono:         [data?.telefono         ?? '', Validators.required],
    });
  }

  guardar(): void {
    if (!this.form.valid) return;
    const v = this.form.value;
    this.ref.close({
      ...v,
      nombre:   v.nombre.toUpperCase(),
      apellido: v.apellido.toUpperCase(),
    });
  }
}
