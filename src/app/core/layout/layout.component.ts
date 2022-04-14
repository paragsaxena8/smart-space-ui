import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { UserData } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: any;
  @Input() layout: string = 'default';
  currentUser: UserData | null = null;
  constructor(
    private router: ActivatedRoute,
    private observer: BreakpointObserver,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.layout = this.router.snapshot.data['layout'];
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (this.sidenav && this.sidenav.mode) {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }
      });
    this.currentUser =
      Object.keys(this._auth.currentUserValue).length > 0
        ? this._auth.currentUserValue.data.user
        : null;
  }
}
