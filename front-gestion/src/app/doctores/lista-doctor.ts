import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';

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
import Swal from 'sweetalert2';

import { DoctorService } from '../services/doctor.service';
import { NotificationService } from '../core/notification.service';
import { Doctor } from '../models/doctor';
import { DoctorCrear } from './doctor-crear/doctor-crear';

@Component({
  selector: 'app-doctores',
  standalone: true,
  imports: [
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
  templateUrl: './lista-doctor.html',
  styleUrl: './lista-doctor.css',
})
export class Doctores implements OnInit, AfterViewInit {
  columns = ['doctor_id', 'nombre', 'apellido', 'especialidad', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<Doctor>([]);
  loading = signal(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  constructor(
    private svc:    DoctorService,
    private dialog: MatDialog,
    private notif:  NotificationService,
  ) {}

  ngOnInit(): void { this.cargar(); }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  cargar(): void {
    this.loading.set(true);
    this.svc.listar().subscribe({
      next: data => { this.dataSource.data = data; this.loading.set(false); },
      error: ()   => { this.loading.set(false); this.notif.error('Error al cargar doctores'); },
    });
  }

  filtrar(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  abrirDialog(doctor: Doctor | null = null): void {
    const ref = this.dialog.open(DoctorCrear, { width: '420px', data: doctor });

    ref.afterClosed().subscribe((result: Omit<Doctor, 'doctor_id'>) => {
      if (!result) return;
      if (doctor?.doctor_id) {
        this.svc.actualizar(doctor.doctor_id, result).subscribe({
          next: () => { this.cargar(); this.notif.success('Doctor actualizado'); },
          error: (e) => this.notif.error(e?.error?.message ?? 'Error al actualizar'),
        });
      } else {
        this.svc.crear(result).subscribe({
          next: () => { this.cargar(); this.notif.success('Doctor creado'); },
          error: (e) => this.notif.error(e?.error?.message ?? 'Error al crear'),
        });
      }
    });
  }

  eliminar(d: Doctor): void {
    Swal.fire({
      title: '¿Eliminar doctor?',
      text: `Dr. ${d.nombre} ${d.apellido} será eliminado permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#C62828',
      cancelButtonColor:  '#546E7A',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:  'Cancelar',
    }).then(result => {
      if (!result.isConfirmed) return;
      this.svc.eliminar(d.doctor_id!).subscribe({
        next: () => { this.cargar(); this.notif.success('Doctor eliminado'); },
        error: (e) => this.notif.error(e?.error?.message ?? 'Error al eliminar'),
      });
    });
  }
}
