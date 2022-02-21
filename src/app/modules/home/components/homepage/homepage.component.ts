import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/interfaces/user.interface';
import { DataService } from 'src/app/services/data.service';
import { blogData } from 'src/app/interfaces/blog.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  currentUser: UserData = this._auth.currentUserValue.data.user;

  constructor(private _auth: AuthService) {}

  ngOnInit(): void {}
}
