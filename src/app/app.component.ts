import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { UserData } from './interfaces/user.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  currentUser:any;
  title = 'smart-space-ui';
  showSidebar = false;
  constructor(
    private router: Router,
    private location: Location,
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private _auth: AuthService
  ) {}
  ngOnInit(): void {
    let currentPath;
    if (this._auth.currentUserValue.data && this._auth.currentUserValue.data.user) {
      this.currentUser = this._auth.currentUserValue.data.user;
    }
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          currentPath = this.location.path();
          this.showSidebar = currentPath === '/dashboard' ? true : false;
          if (this.showSidebar) {
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
                  this.cdr.detectChanges();
                }
              });
          }
        }
      });
  }
}
