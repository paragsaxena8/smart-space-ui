import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  currentUser: UserData | null = null;

  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
    this.currentUser =
      Object.keys(this._auth.currentUserValue).length > 0
        ? this._auth.currentUserValue.data.user
        : null;
  }
}
