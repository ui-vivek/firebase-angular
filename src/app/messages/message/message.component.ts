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
    MatPaginatorModule
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,private msgServuces:MessageService) {}
  ngOnInit(): void {
    this.isLoaded = false; 
    this.msgServuces.getMessages().subscribe((msgs:any)=>{
      console.log(msgs)
      this.messages = msgs;
      this.isLoaded = true; 
      this.sortByDate()
      this.paginator.length = this.messages.length;
      this.updateDisplayedMessages();
    })
  }
  sortByDate(){
    this.messages.sort((a, b) => {
      if (a.Date.seconds === b.Date.seconds) {
        return b.Date.nanoseconds - a.Date.nanoseconds;
      }
      return b.Date.seconds - a.Date.seconds;
    });
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
  updateDisplayedMessages() {
    const startIndex = this.currentPage * this.pageSize;
    this.displayedMessages = this.messages.slice(startIndex, startIndex + this.pageSize);
  }
}
