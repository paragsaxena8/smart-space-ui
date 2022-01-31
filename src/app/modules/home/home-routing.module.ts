import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
  {
    path: 'home',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
        outlet: 'homeApp',
      },
    ],
  },
  {
    path: 'about',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
        outlet: 'homeApp',
      },
    ],
  },
  {
    path: 'contact',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: ContactComponent,
        outlet: 'homeApp',
      },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
