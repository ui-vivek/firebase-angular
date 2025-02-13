import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private msgCollection;

  constructor(private firestore: Firestore) {
    this.msgCollection = collection(this.firestore, 'messages');
  }

  getMessages() {
    let data = collectionData(this.msgCollection, { idField: 'id' });
    return data
  }

  submitMessage(msgData: any): Observable<any> {
    const msgToCreate = { ...msgData, Date: new Date() };
    return from(addDoc(this.msgCollection, msgToCreate));
  }
}
