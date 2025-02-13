  import { Component, OnInit, ViewChild } from '@angular/core';
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
  import { MessageService } from '../../services/message.service';
  import {MatButtonModule} from '@angular/material/button';
  import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
  import { MatPaginator } from '@angular/material/paginator';
  import { PageEvent } from '@angular/material/paginator';
  import {MatPaginatorModule} from '@angular/material/paginator';
  import {MatTooltipModule} from '@angular/material/tooltip';
  import { MessageDialogViewComponent } from '../../message-dialog-view/message-dialog-view.component';
  import { Store } from '@ngrx/store';
  import { Observable } from 'rxjs';
  import { getMsgList, selectError, selectLoading, selectMessages } from '../state/message.selectors';
  import * as MessageActions from '../state/message.actions';
  @Component({
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      MatIconModule,
      MatCardModule,
      MatTableModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      MatTooltipModule
    ],
    selector: 'app-messages',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
  })
  export class MessagesComponent implements OnInit{
    messages: { email: string; message: string; id: string; Date: any }[] = [];
    displayedMessages: { email: string; message: string; id: string; Date: any }[] = [];
    pageSize: number = 10;
    currentPage: number = 0;
    isLoaded: boolean = false; 
    messages$: Observable<any[]>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private dialog: MatDialog,private store: Store) {
      this.messages$ = this.store.select(selectMessages);
    }
    
    ngOnInit(): void {
      this.getallMessages();
    }
    
    getallMessages() {
      this.store.dispatch(MessageActions.loadMessages());
    
      this.store.select(getMsgList).subscribe((megs: any) => {
        let resp = {...megs};
        if (megs && megs.messages) {
          let arrayForSort = [...megs.messages]
          arrayForSort.sort((a, b) => {
            const dateA = this.convertTimestamp(a.Date).getTime();
            const dateB = this.convertTimestamp(b.Date).getTime();
            return dateB - dateA;
          });
          this.messages = arrayForSort
          this.isLoaded = resp.messages.length > 0 ? false : true;
          this.updateDisplayedMessages();
        }
      });
    }
    updateDisplayedMessages() {
      const startIndex = this.currentPage * this.pageSize;
      this.displayedMessages = this.messages.slice(startIndex, startIndex + this.pageSize);
    }
    
    openDialog() {
      const dialogRef = this.dialog.open(MessageDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.messages.push(result);
          console.log(this.messages);
        }
      });
    }
    convertTimestamp(timestamp: { seconds: number, nanoseconds: number }): Date {
      return new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000));
    }
    handlePageEvent(event: PageEvent) {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updateDisplayedMessages();
    }
    openDialogMsgView(message: string) {
      this.dialog.open(MessageDialogViewComponent, {
        data: { message: message }, 
      });
    }
  }
