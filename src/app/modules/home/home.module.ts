import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomepageComponent, AboutComponent, ContactComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
