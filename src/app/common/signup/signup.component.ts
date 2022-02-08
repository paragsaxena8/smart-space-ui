import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Error } from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: any;
  constructor(
    private ds: DataService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      bio: [''],
    });
  }

  get username() {
    return this.form.get('username');
  }
  get email() {
    return this.form.get('email');
  }
  get name() {
    return this.form.get('name');
  }
  get password() {
    return this.form.get('password');
  }
  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }
  get bio() {
    return this.form.get('bio');
  }

  checkUserName(): any {
    const username = this.form.get('username')?.value;

    if (username === 'admin') {
      this.form.get('username')?.setErrors({
        username: 'username is not allowed',
      });
    } else {
      if (username.length > 3) {
        this.ds.postData('users/checkusername', { username }).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.form.get('username')?.setErrors({
                username: 'Username already taken',
              });
            }
          },
          error: (err) => {
            console.log(err);
            this._snackBar.open(err, 'X');
          },
        });
      }
    }
  }

  submit(d: FormGroup) {
    if (d.valid) {
      console.log(d.value);

      this.ds.postData('users/signup', d.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this._snackBar.open('User created successfully', '', {
            duration: 3000,
          });
          // this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this._snackBar.open(err, 'X', {
            duration: 3000,
            panelClass: 'bg-danger',
          });
        },
      });
    }
  }
}
