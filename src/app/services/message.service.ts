// message.service.ts
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
    console.log("getetettet")
    let data = collectionData(this.msgCollection, { idField: 'id' });
    console.log(data)
    return data
  }

  submitMessage(msgData: any): Observable<any> {
    const msgToCreate = { ...msgData, Date: new Date() };
    return from(addDoc(this.msgCollection, msgToCreate));
  }
}
