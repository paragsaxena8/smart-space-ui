import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([]),
    SharedModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
