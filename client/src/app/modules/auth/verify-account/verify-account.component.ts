import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit {
  token: string = '';
  isVerfied = false;
  errorMessage = '';
  constructor(private route: ActivatedRoute, private ds: DataService, private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    if (this.token) {
      this.ds.getData(`users/activate/${this.token}`).subscribe({
        next: () => {
          this.isVerfied = true;
        },
        error: (err) => {
          this.errorMessage = err.error.message
           this.snackBar.open(this.errorMessage, 'Close!')
        }
      });
    }
  }
}
