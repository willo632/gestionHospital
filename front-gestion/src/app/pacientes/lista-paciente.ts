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

import { PacienteService } from '../services/paciente.service';
import { NotificationService } from '../core/notification.service';
import { Paciente } from '../models/paciente';
import { PacienteCrear } from './paciente-crear/paciente-crear';

@Component({
  selector: 'app-pacientes',
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
  templateUrl: './lista-paciente.html',
  styleUrl: './lista-paciente.css',
})
export class Pacientes implements OnInit, AfterViewInit {
  columns = ['paciente_id', 'nombre', 'apellido', 'fecha_nacimiento', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<Paciente>([]);
  loading = signal(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  constructor(
    private svc:   PacienteService,
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
      error: ()   => { this.loading.set(false); this.notif.error('Error al cargar pacientes'); },
    });
  }

  filtrar(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  abrirDialog(paciente: Paciente | null = null): void {
    const ref = this.dialog.open(PacienteCrear, { width: '420px', data: paciente });

    ref.afterClosed().subscribe((result: Omit<Paciente, 'paciente_id'>) => {
      if (!result) return;
      if (paciente?.paciente_id) {
        this.svc.actualizar(paciente.paciente_id, result).subscribe({
          next: () => { this.cargar(); this.notif.success('Paciente actualizado'); },
          error: (e) => this.notif.error(e?.error?.message ?? 'Error al actualizar'),
        });
      } else {
        this.svc.crear(result).subscribe({
          next: () => { this.cargar(); this.notif.success('Paciente creado'); },
          error: (e) => this.notif.error(e?.error?.message ?? 'Error al crear'),
        });
      }
    });
  }

  eliminar(p: Paciente): void {
    Swal.fire({
      title: '¿Eliminar paciente?',
      text: `${p.nombre} ${p.apellido} será eliminado permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#C62828',
      cancelButtonColor:  '#546E7A',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText:  'Cancelar',
    }).then(result => {
      if (!result.isConfirmed) return;
      this.svc.eliminar(p.paciente_id!).subscribe({
        next: () => { this.cargar(); this.notif.success('Paciente eliminado'); },
        error: (e) => this.notif.error(e?.error?.message ?? 'Error al eliminar'),
      });
    });
  }
}
