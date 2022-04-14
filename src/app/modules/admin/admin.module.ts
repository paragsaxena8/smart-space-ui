import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogActionComponent } from './components/blog-action/blog-action.component';

import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, BlogActionComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, NgxEditorModule],
})
export class AdminModule {}
