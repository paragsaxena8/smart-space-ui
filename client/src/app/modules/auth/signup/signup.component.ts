import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
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
  form: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    username: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordConfirm: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    bio: new UntypedFormControl(''),
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

  submit(d: UntypedFormGroup) {
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
