import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastComponent } from '../core/toast/toast.component';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
