import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { SignInPage } from './pages/sign-in/sign-in.page';
import { MainPage } from './pages/main/main.page';
import { ManagerPage } from './pages/manager/manager.page';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { SharePage } from './pages/share/share.page';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignInPage },
  { path: 'signin', pathMatch: 'full', component: SignInPage },
  { path: 'main', component: MainPage,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'manager', component: ManagerPage,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'favorites', component: FavoritesPage,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'share/:id', component: SharePage},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
