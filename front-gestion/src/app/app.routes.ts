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
        loadComponent: () => import('./pacientes/pacientes').then(m => m.Pacientes),
      },
      {
        path: 'doctores',
        loadComponent: () => import('./doctores/doctores').then(m => m.Doctores),
      },
      {
        path: 'citas',
        loadComponent: () => import('./citas/citas').then(m => m.Citas),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
