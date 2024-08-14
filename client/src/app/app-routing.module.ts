import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './core/services/_helpers/auth.guard';
import { IsSignedInGuard } from './core/services/_helpers/islogged.guard';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { VerifyAccountComponent } from './modules/auth/verify-account/verify-account.component';
import { StartupComponent } from './core/startup/startup.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      layout: 'default',
    },
    children: [
      { path: '', component: StartupComponent },
      {
        path: 'blog',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
      },
      {
        path: 'verify/:token',
        component: VerifyAccountComponent,
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: {
      layout: 'admin',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
  { path: '**', redirectTo: '/blog' },
];

export class AppRoutingModule {}
