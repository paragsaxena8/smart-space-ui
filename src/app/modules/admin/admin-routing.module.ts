import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogActionComponent } from './components/blog-action/blog-action.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: 'Dashboard',
        },
        component: DashboardComponent,
      },
      {
        path: 'create',
        data: {
          title: 'Create Blog',
        },
        component:BlogActionComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
