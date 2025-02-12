import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ],
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessagesComponent {
  messages: { email: string; message: string }[] = [];

  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.messages.push(result);
        console.log(this.messages);
      }
    });
  }
}
