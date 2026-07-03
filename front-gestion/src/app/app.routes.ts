import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'pacientes', pathMatch: 'full' },
      {
        path: 'pacientes',
        loadComponent: () => import('./pacientes/lista-paciente').then(m => m.Pacientes),
      },
      {
        path: 'doctores',
        loadComponent: () => import('./doctores/lista-doctor').then(m => m.Doctores),
      },
      {
        path: 'citas',
        loadComponent: () => import('./citas/lista-cita').then(m => m.Citas),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
