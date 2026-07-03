import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-doctor-crear',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './doctor-crear.html',
  styleUrl: './doctor-crear.css',
})
export class DoctorCrear {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private ref: MatDialogRef<DoctorCrear>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor | null,
  ) {
    this.form = fb.group({
      nombre:       [data?.nombre       ?? '', Validators.required],
      apellido:     [data?.apellido     ?? '', Validators.required],
      especialidad: [data?.especialidad ?? '', Validators.required],
      telefono:     [data?.telefono     ?? '', Validators.required],
    });
  }

  guardar(): void {
    if (!this.form.valid) return;
    const v = this.form.value;
    this.ref.close({
      ...v,
      nombre:       v.nombre.toUpperCase(),
      apellido:     v.apellido.toUpperCase(),
      especialidad: v.especialidad.toUpperCase(),
    });
  }
}
