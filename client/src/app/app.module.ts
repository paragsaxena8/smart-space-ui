import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StartupComponent } from './core/startup/startup.component';
import { environment } from 'src/environments/environment';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { GlobalErrorHandler } from './core/services/_helpers/error.handler';
import { IsSignedInGuard } from './core/services/_helpers/islogged.guard';
import { JwtInterceptor } from './core/services/_helpers/jwt.interceptor';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { LayoutModule } from './core/layout/layout.module';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { VerifyAccountComponent } from './modules/auth/verify-account/verify-account.component';

let localProviders = [
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
  },
];
environment.production ? (localProviders = []) : localProviders;


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    StartupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ...localProviders,
    IsSignedInGuard,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
