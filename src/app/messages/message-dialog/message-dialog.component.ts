import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import * as MessageActions from '../state/message.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { selectLoading, selectError } from '../state/message.selectors';

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
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.messageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.messageForm.valid) {
      const { email, message } = this.messageForm.value;
      this.store.dispatch(MessageActions.submitMessage({ email, message }));

      this.loading$.subscribe((loading) => {
        if (!loading) {
          this.onClose();
          this.openSnackBar('Message sent successfully!');
        }
      });

      this.error$.subscribe((error) => {
        if (error) {
          this.openSnackBar('Failed to send message.');
        }
      });
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000 });
  }
}
