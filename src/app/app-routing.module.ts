import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { StartupComponent } from './common/startup/startup.component';
import { AboutComponent } from './modules/home/components/about/about.component';
import { AuthGuard } from './services/_helpers/auth.guard';
import { IsSignedInGuard } from './services/_helpers/islogged.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'blog',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'post/:slug',
    component: AboutComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'home',
    component: StartupComponent,
  },
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

export class AppRoutingModule {}
