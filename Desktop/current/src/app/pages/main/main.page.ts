import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Bless } from '../../model/Bless';
import { CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Favorite } from 'src/app/model/Favorite';

import {MatSnackBar} from '@angular/material/snack-bar';
import copy from 'copy-to-clipboard';

const COLLECTION_NAME = 'blesses';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
// tslint:disable-next-line: component-class-suffix
export class MainPage {
  blessingForm;
  user;
  position;
  private itemsCollection: AngularFirestoreCollection<Bless>;
  items: Observable<Bless[]>;
  private itemDoc: AngularFirestoreDocument<Bless>;
  item: Observable<Bless>;

  constructor(
    private afs: AngularFirestore,
    public readonly auth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    const data = JSON.parse(window.localStorage.getItem('user'));
    this.user = data.user;
    this.itemsCollection = afs.collection<Bless>(
      `${COLLECTION_NAME}`,
      ref => ref.orderBy('z')
    );
    this.items = this.itemsCollection.valueChanges({ idField: 'uid' });

    // form
    this.blessingForm = this.formBuilder.group({
      description: ''
    });
  }

  moveItem(event: CdkDragMove): void {
    this.position = event.distance;
  }

  dragEnd(item): void {
    this.itemDoc = this.afs.doc<Bless>(`${COLLECTION_NAME}/${item.uid}`);
    item.x += this.position.x;
    item.y += this.position.y;
    this.itemDoc.update(item);
    this.items = this.itemsCollection.valueChanges({ idField: 'uid' });
  }

  addFavorite(data: Bless): void {
    const itemsCollection = this.afs.collection<Favorite>(`favorites`);
    const id = this.afs.createId();
    itemsCollection.add({
      uid: id,
      description: data.description,
      createTime: new Date().getTime(),
      updateTime: new Date().getTime(),
      userEmail: data.userEmail,
      userDisplayName: data.userDisplayName,
      userUID: data.userUID,
      mineEmail: this.user.email,
      mineDisplayName: this.user.displayName,
      mineUID: this.user.uid,
    });
  }

  copyShare(id): void {
    copy(`${window.location.host}/share/${id}`);
    this._snackBar.open('🎁Copy share url success', '', {
      duration: 2000,
    });
  }

  clickItem(item): void {
    this.itemDoc = this.afs.doc<Bless>(`${COLLECTION_NAME}/${item.uid}`);
    item.z = new Date().getTime();
    this.itemDoc.update(item);
    this.items = this.itemsCollection.valueChanges({ idField: 'uid' });
  }

  onSubmit(customerData): void {
    const id = this.afs.createId();
    this.itemsCollection.add({
      uid: id,
      description: customerData.description,
      type: true,
      createTime: new Date().getTime(),
      updateTime: new Date().getTime(),
      userEmail: this.user.email,
      userDisplayName: this.user.displayName,
      userUID: this.user.uid,
      x: Math.random() * 1000,
      y: Math.random() * 500 + 65,
      z: new Date().getTime()
    });
    this._snackBar.open('🎁Blessing success', '', {
      duration: 2000,
    });
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
    this.router.navigate(['']);
  }
}
