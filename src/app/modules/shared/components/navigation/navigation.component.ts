import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  currentUser: any;
  @Input() sidenav:any;
  constructor(private _auth: AuthService) {}
  ngOnInit(): void {
    this._auth.currentUser.subscribe((x) => {
      if (Object.keys(x).length !== 0) this.currentUser = x;
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    location.reload();
  }
}
