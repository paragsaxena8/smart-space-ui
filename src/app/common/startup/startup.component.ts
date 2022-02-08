import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss'],
})
export class StartupComponent implements OnInit {
  currentUser = this._auth.currentUserValue;
  constructor(private _auth:AuthService) {}

  ngOnInit(): void {}
}
