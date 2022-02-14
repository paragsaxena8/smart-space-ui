import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './common/signup/signup.component';
import { LoginComponent } from './common/login/login.component';
import { SharedModule } from './modules/shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/_helpers/jwt.interceptor';
import { GlobalErrorHandler } from './services/_helpers/error.handler';
import { StartupComponent } from './common/startup/startup.component';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';
import { IsSignedInGuard } from './services/_helpers/islogged.guard';

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
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
    BrowserAnimationsModule,
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
