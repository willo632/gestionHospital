import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

import { CitaService } from '../services/cita.service';
import { PacienteService } from '../services/paciente.service';
import { DoctorService } from '../services/doctor.service';
import { NotificationService } from '../core/notification.service';
import { Cita } from '../models/cita';
import { Paciente } from '../models/paciente';
import { Doctor } from '../models/doctor';
import { CitaCrear, CitaCrearData } from './cita-crear/cita-crear';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [
    NgClass,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './lista-cita.html',
  styleUrl: './lista-cita.css',
})
export class Citas implements OnInit, AfterViewInit {
  columns = ['cita_id', 'paciente', 'doctor', 'fecha', 'hora', 'motivo', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Cita>([]);
  loading = signal(false);

  private pacientes: Paciente[] = [];
  private doctores:  Doctor[]   = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  constructor(
    private citaSvc:     CitaService,
    private pacienteSvc: PacienteService,
    private doctorSvc:   DoctorService,
    private dialog:      MatDialog,
    private notif:       NotificationService,
  ) {}

  ngOnInit(): void {
    this.loading.set(true);
    forkJoin({
      pacientes: this.pacienteSvc.listar(),
      doctores:  this.doctorSvc.listar(),
      citas:     this.citaSvc.listar(),
    }).subscribe({
      next: ({ pacientes, doctores, citas }) => {
        this.pacientes       = pacientes;
        this.doctores        = doctores;
        this.dataSource.data = citas;
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); this.notif.error('Error al cargar datos'); },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  filtrar(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  nombrePaciente(id: number): string {
    const p = this.pacientes.find(x => x.paciente_id === id);
    return p ? `${p.nombre} ${p.apellido}` : `#${id}`;
  }

  nombreDoctor(id: number): string {
    const d = this.doctores.find(x => x.doctor_id === id);
    return d ? `Dr. ${d.nombre} ${d.apellido}` : `#${id}`;
  }

  abrirDialog(cita: Cita | null = null): void {
    const ref = this.dialog.open(CitaCrear, {
      width: '520px',
      data: { cita, pacientes: this.pacientes, doctores: this.doctores } as CitaCrearData,
    });

    ref.afterClosed().subscribe((result: Omit<Cita, 'cita_id'>) => {
      if (!result) return;
      if (cita?.cita_id) {
        this.citaSvc.actualizar(cita.cita_id, result).subscribe({
          next: () => { this.recargarCitas(); this.notif.success('Cita actualizada'); },
          error: (e) => this.notif.error(e?.error?.message ?? 'Error al actualizar'),
        });
      } else {
        this.citaSvc.crear(result).subscribe({
          next: () => { this.recargarCitas(); this.notif.success('Cita creada'); },
          error: (e) => this.notif.error(e?.error?.message ?? 'Error al crear'),
        });
      }
    });
  }

  eliminar(c: Cita): void {
    Swal.fire({
      title: '¿Eliminar cita?',
      text: `La cita del ${c.fecha} a las ${c.hora} será eliminada permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#C62828',
      cancelButtonColor:  '#546E7A',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:  'Cancelar',
    }).then(result => {
      if (!result.isConfirmed) return;
      this.citaSvc.eliminar(c.cita_id!).subscribe({
        next: () => { this.recargarCitas(); this.notif.success('Cita eliminada'); },
        error: (e) => this.notif.error(e?.error?.message ?? 'Error al eliminar'),
      });
    });
  }

  private recargarCitas(): void {
    this.citaSvc.listar().subscribe(data => this.dataSource.data = data);
  }
}
