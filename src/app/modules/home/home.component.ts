import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <app-navigation></app-navigation>
  <div class="container">
    <router-outlet name="homeApp"></router-outlet>
  </div>`,
  styleUrls: [],
})
export class HomeComponent {
  constructor() {}
}
