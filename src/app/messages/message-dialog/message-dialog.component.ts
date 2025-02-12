import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule,FormsModule} from '@angular/forms';
import {
  Component,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { Store } from '@ngrx/store';
import * as MessageActions from '../state/message.actions';
import { MessageService } from '../../services/message.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent {
  messageForm: FormGroup;
  isSubmitting: boolean = false;
  private _snackBar = inject(MatSnackBar);

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    private fb: FormBuilder,
    private store: Store,
    private messageService: MessageService,
  ) {
    this.messageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.isSubmitting = true;
    if (this.messageForm.valid) {
      const { email, message } = this.messageForm.value;
      this.messageService.submitMessage({email, message}).subscribe((resp)=>{
        console.log(resp);
        this.openSnackBar("Message Sent");
        this.dialogRef.close();
        this.isSubmitting = false;
      }, (error) => {
        console.error(error);
        this.openSnackBar("Failed to send message");
        this.isSubmitting = false;
      });
      this.store.dispatch(MessageActions.submitMessage({ email, message }));
    } else {
      this.isSubmitting = false;
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000 });
  }
}
