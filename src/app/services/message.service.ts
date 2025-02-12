import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private msgCollection;

  constructor(private db: AngularFireDatabase, private firestore: Firestore) {
    this.msgCollection = collection(this.firestore, 'messages');
  }

  getMessages(): Observable<any> {
    return collectionData(this.msgCollection, {
      idField: 'id',
    }) as Observable<any>;
  }
  submitMessage(msgData: any): Observable<any> {
    //TDO we need to make the inteface for the msg data
    const msgToCreate = msgData;
    const promise:any = addDoc(this.msgCollection, msgToCreate).then((resp) => {
       resp.id;
    });
    return promise ;
  }
}
