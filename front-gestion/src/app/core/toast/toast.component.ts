import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="toast-container">
      @for (msg of svc.messages(); track msg.id) {
        <div
          class="toast"
          [ngClass]="'toast-' + msg.severity"
          [@slideIn]
          (click)="svc.remove(msg.id)"
        >
          <span class="toast-icon">
            @switch (msg.severity) {
              @case ('success') { <i class="pi pi-check-circle"></i> }
              @case ('error')   { <i class="pi pi-times-circle"></i> }
              @case ('warning') { <i class="pi pi-exclamation-triangle"></i> }
              @default          { <i class="pi pi-info-circle"></i> }
            }
          </span>
          <div class="toast-body">
            <span class="toast-summary">{{ msg.summary }}</span>
            <span class="toast-detail">{{ msg.detail }}</span>
          </div>
          <button class="toast-close" (click)="svc.remove(msg.id)">
            <i class="pi pi-times"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 72px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 320px;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.18);
      cursor: pointer;
      color: #fff;
      font-family: Roboto, sans-serif;
    }

    .toast-success { background: #F1FBF4; border-left: 5px solid #43A047; color: #1B5E20; }
    .toast-error   { background: #FFF3F3; border-left: 5px solid #E53935; color: #B71C1C; }
    .toast-warning { background: #FFF8E1; border-left: 5px solid #FB8C00; color: #E65100; }
    .toast-info    { background: #F0F7FF; border-left: 5px solid #1E88E5; color: #01579B; }

    .toast-icon { font-size: 22px; flex-shrink: 0; }

    .toast-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .toast-summary {
      font-weight: 600;
      font-size: 0.88rem;
    }

    .toast-detail {
      font-size: 0.82rem;
      opacity: 0.9;
    }

    .toast-close {
      background: transparent;
      border: none;
      color: inherit;
      opacity: 0.5;
      cursor: pointer;
      font-size: 14px;
      padding: 0;
      line-height: 1;
      flex-shrink: 0;
    }

    .toast-close:hover { opacity: 1; }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(110%)', opacity: 0 }),
        animate('250ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(110%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ToastComponent {
  svc = inject(NotificationService);
}
