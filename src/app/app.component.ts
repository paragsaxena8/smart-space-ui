import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataService } from './core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from './core/services/spinner.service';
import { delay, map, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { UserData } from './core/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: any;
  @Input() layout: string = 'default';
  currentUser: UserData | null = null;
  @ViewChild('notFound') notFound: any;
  isActive: any;
  isActive$: Observable<any> = this.ds
    .get()
    .pipe(map((res: any) => res['isActive']));
  constructor(
    private ds: DataService,
    private dialog: MatDialog,
    public spinner: SpinnerService,
    private router: ActivatedRoute,
    private observer: BreakpointObserver,
    private _auth: AuthService
  ) {}
  ngOnInit(): void {
    console.log(this.router.snapshot.data);

    this.isActive$.subscribe({
      next: (res: any) => {
        if (res) {
          this.isActive = true;
        }
      },
      error: (err: any) => {
        this.isActive = false;
        this.dialog.open(this.notFound, {
          hasBackdrop: true,
          disableClose: true,
        });
      },
    });

    // this.layout = this.router.snapshot.data['layout'];
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

  logout() {
    localStorage.removeItem('currentUser');
    location.reload();
  }
}
