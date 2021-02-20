import { Component, OnInit } from '@angular/core';
import { Bless } from 'src/app/model/Bless';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss']
})
// tslint:disable-next-line: component-class-suffix
export class SharePage implements OnInit {
  item: Observable<Bless>;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const itemDoc = this.afs.doc<Bless>(`blesses/${params.get('id')}`);
      this.item = itemDoc.valueChanges();
    });
  }
}
