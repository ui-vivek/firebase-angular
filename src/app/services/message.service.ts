import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs'; // Import from


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private msgCollection;

  constructor( private firestore: Firestore) {
    this.msgCollection = collection(this.firestore, 'messages');
  }

  getMessages(): Observable<any> {
    return collectionData(this.msgCollection, {
      idField: 'id',
    }) as Observable<any>;
  }
  submitMessage(msgData: any): Observable<any> {
    const msgToCreate = msgData;
    return from(addDoc(this.msgCollection, msgToCreate)); // Convert Promise to Observable
  }
}
