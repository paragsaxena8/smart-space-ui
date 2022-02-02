import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: ` <app-navigation></app-navigation>
    <div class="container">
      <router-outlet name="adminApp"></router-outlet>
    </div>`,
  styleUrls: [],
})
export class AdminComponent {
  constructor() {}
}
