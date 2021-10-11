import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './Components/layouts/main-layout/main-layout.component';
import {FreeScrollComponent} from "./Components/free-scroll/free-scroll.component";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'free-scroll',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>import('./Components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>import('./Components/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'free-scroll',
        component: FreeScrollComponent
        // loadChildren: () =>import('./Components/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'profile',
        loadChildren: () =>import('./Components/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'search',
        loadChildren: () =>import('./Components/search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>import('./Components/privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
      },
      {
        path: 'login',
        loadChildren: () =>import('./Components/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>import('./Components/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'notification',
        loadChildren: () =>import('./Components/notifications/notifications.module').then((m) => m.NotificationsModule),
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
