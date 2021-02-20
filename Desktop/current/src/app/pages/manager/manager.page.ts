import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Bless } from '../../model/Bless';

import * as _moment from 'moment';

const COLLECTION_NAME = 'blesses';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss']
})
// tslint:disable-next-line: component-class-suffix
export class ManagerPage {
  displayedColumns: string[] = ['description', 'user', 'createTime', 'updateTime', 'action'];
  private itemsCollection: AngularFirestoreCollection<Bless>;
  private itemDoc: AngularFirestoreDocument<Bless>;
  items: Observable<Bless[]>;
  item: Observable<Bless>;

  private user;

  constructor(
    private afs: AngularFirestore,
    public readonly auth: AngularFireAuth,
    private router: Router) {
    const data = JSON.parse(window.localStorage.getItem('user'));
    this.user = data.user;
    this.itemsCollection = afs.collection<Bless>(`${COLLECTION_NAME}`, ref => ref.where('userEmail', '==', data.user.email));
    this.items = this.itemsCollection.valueChanges({ idField: 'uid' });
  }

  moment(val) {
    return _moment(val).format('MM/DD/YYYY HH:mm');
  }

  addItem(item: Bless) {
    const id = this.afs.createId();
    item.uid = id;
    this.itemsCollection.add(item);
  }

  deleteItem(uid) {
    this.itemDoc = this.afs.doc<Bless>(`${COLLECTION_NAME}/${uid}`);
    this.itemDoc.delete();
    this.items = this.itemsCollection.valueChanges({ idField: 'uid' });
  }

  updateItem(item: Bless) {
    this.itemDoc = this.afs.doc<Bless>(`${COLLECTION_NAME}/${item.uid}`);
    this.itemDoc.update(item);
    this.items = this.itemsCollection.valueChanges({ idField: 'uid' });
  }

  routeToHome() {
    this.router.navigate(['main']);
  }

  routeToManager() {
    this.router.navigate(['manager']);
  }

  routeToFavorites() {
    this.router.navigate(['favorites']);
  }

  logout() {
    this.auth.signOut();
    window.localStorage.removeItem('user');
  }
}
