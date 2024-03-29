import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(
    private fb: UntypedFormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  submit(d: UntypedFormGroup) {
    if (d.valid) {
      console.log(d.value);
      this._authService.login(d.value).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this._snackBar.open('Logged In successfully', 'X');
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          this._snackBar.open(err.error.message, 'X');
        },
      });
    }
  }
}
