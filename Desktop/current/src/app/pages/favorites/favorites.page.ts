import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Favorite } from '../../model/Favorite';

import * as _moment from 'moment';

const COLLECTION_NAME = 'favorites';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
// tslint:disable-next-line: component-class-suffix
export class FavoritesPage {
  displayedColumns: string[] = ['description', 'user', 'createTime', 'updateTime', 'action'];
  private itemsCollection: AngularFirestoreCollection<Favorite>;
  private itemDoc: AngularFirestoreDocument<Favorite>;
  items: Observable<Favorite[]>;
  item: Observable<Favorite>;

  private user;

  constructor(
    private afs: AngularFirestore,
    public readonly auth: AngularFireAuth,
    private router: Router) {
      const data = JSON.parse(window.localStorage.getItem('user'));
      this.user = data.user;
      this.itemsCollection = afs.collection<Favorite>(`${COLLECTION_NAME}`, ref => ref.where('mineEmail', '==', data.user.email));
      this.items = this.itemsCollection.valueChanges({ idField: 'uid' });
  }

  deleteItem(uid): void {
    this.itemDoc = this.afs.doc<Favorite>(`${COLLECTION_NAME}/${uid}`);
    this.itemDoc.delete();
    this.items = this.itemsCollection.valueChanges({ idField: 'uid' });
  }

  moment(val) {
    return _moment(val).format('MM/DD/YYYY HH:mm');
  }

  routeToHome(): void {
    this.router.navigate(['main']);
  }

  routeToManager(): void {
    this.router.navigate(['manager']);
  }

  routeToFavorites(): void {
    this.router.navigate(['favorites']);
  }

  logout(): void {
    this.auth.signOut();
    window.localStorage.removeItem('user');
  }
}
