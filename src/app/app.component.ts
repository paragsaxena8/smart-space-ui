import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { catchError, delay, Observable, tap, throwError } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from './services/_helpers/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: any;
  @ViewChild('notFound') notFound: any;
  isActive: any;
  currentUser: any;
  title = 'smart-space-ui';
  showSidebar = false;
  constructor(
    private router: Router,
    private location: Location,
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private ds: DataService,
    private dialog: MatDialog,
    public spinnerService: SpinnerService,
    private _auth: AuthService
  ) {}
  ngOnInit(): void {
    this.currentUser = this._auth.currentUserValue;
    this.ds.get().subscribe({
      next: (res: any) => {
        console.log(res);
        this.isActive = res['isActive'];
      },
      error: (err: any) => {
        console.log(err);
        this.dialog.open(this.notFound, {
          hasBackdrop: true,
          disableClose: true,
        });
        this.isActive = false;
      },
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentPath = this.location.path();
        currentPath === '/dashboard'
          ? (this.showSidebar = true)
          : (this.showSidebar = false);
        if (this.showSidebar) {
          this.observer
            .observe(['(max-width: 800px)'])
            .pipe(delay(1))
            .subscribe((res) => {
              console.log(res);

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
        }
      }
    });
  }
}
