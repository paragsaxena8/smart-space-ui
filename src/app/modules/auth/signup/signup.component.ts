import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    bio: new FormControl(''),
  });
  showLoad = false;
  constructor(
    private ds: DataService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
      this.showLoad = true;
      console.log(d.value);

      this.ds.postData('users/signup', d.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.showLoad = false;
          this._snackBar.open(
            'User created successfully, Please Check your email',
            '',
            {
              duration: 5000,
              verticalPosition: 'top',
            }
          );
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err.error);
          this.showLoad = false;
          this._snackBar.open(err.error.message, 'X', {
            duration: 3000,
            panelClass: 'bg-danger',
          });
        },
      });
    }
  }
}
