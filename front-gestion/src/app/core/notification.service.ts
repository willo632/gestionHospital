import { Injectable, signal } from '@angular/core';

export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  severity: ToastSeverity;
  summary: string;
  detail: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private counter = 0;
  messages = signal<ToastMessage[]>([]);

  add(severity: ToastSeverity, summary: string, detail: string, duration = 3500): void {
    const id = ++this.counter;
    this.messages.update(m => [...m, { id, severity, summary, detail }]);
    setTimeout(() => this.remove(id), duration);
  }

  remove(id: number): void {
    this.messages.update(m => m.filter(x => x.id !== id));
  }

  success(detail: string): void { this.add('success', 'Éxito',      detail); }
  error(detail: string):   void { this.add('error',   'Error',      detail); }
  info(detail: string):    void { this.add('info',    'Información', detail); }
  warn(detail: string):    void { this.add('warning', 'Aviso',      detail); }
}
