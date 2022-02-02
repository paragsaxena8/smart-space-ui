import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  currentUser: any;
  constructor(private _auth: AuthService) {}
  ngOnInit(): void {
    this.currentUser = this._auth.currentUserValue.data.user;
  }

  logout() {
    localStorage.removeItem('currentUser');
    location.reload();
  }
}
