import { Component, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { trace } from '@angular/fire/performance';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss']
})
// tslint:disable-next-line: component-class-suffix
export class SignInPage {
  private readonly userDisposable: Subscription|undefined;

  constructor(public readonly auth: AngularFireAuth, private router: Router, @Inject(PLATFORM_ID) platformId: object) {
    if (!isPlatformServer(platformId)) {
      this.userDisposable = this.auth.authState.pipe(
        trace('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.router.navigate(['main']);
      });
    }
  }

  async loginFacebook() {
    const user = await this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    window.localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['main']);
  }

  async login() {
    const user = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    window.localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['main']);
  }
}
