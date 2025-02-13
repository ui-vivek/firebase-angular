import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog-view',
  imports: [],
  templateUrl: './message-dialog-view.component.html',
  styleUrl: './message-dialog-view.component.scss'
})
export class MessageDialogViewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

  close() {
    // Logic to close the dialog
  }
}