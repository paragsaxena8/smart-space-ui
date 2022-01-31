import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminNavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    component: AdminNavigationComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        outlet: 'adminApp',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
