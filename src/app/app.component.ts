import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from './core/services/spinner.service';
import { map, Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('notFound') notFound: any;
  isActive: any;
  isActive$: Observable<any> = this.ds
    .get()
    .pipe(map((res: any) => res['isActive']));
  constructor(
    private ds: DataService,
    private dialog: MatDialog,
    public spinner: SpinnerService,
  ) {}
  ngOnInit(): void {
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
  }
}
