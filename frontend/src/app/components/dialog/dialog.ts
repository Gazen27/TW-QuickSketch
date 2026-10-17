
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

export type DialogMode = 'alert' | 'confirm' | 'toast';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.html',
  styleUrl: './dialog.css'
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() title = '';
  @Input() message = '';
  @Input() mode: DialogMode = 'alert';

  @Input() confirmText = 'OK';
  @Input() cancelText = 'Cancel';
  @Input() autoClose = 3000;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private timeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (this.mode === 'toast') {
      this.timeoutId = setTimeout(() => {
        this.closed.emit();
      }, this.autoClose);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
