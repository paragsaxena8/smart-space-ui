import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private ds: DataService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get password() {
    return this.form.get('password');
  }

  get cnfmPassword() {
    return this.form.get('cnfmPassword');
  }

  submit(d: FormGroup) {
    console.log(d.value);
    // if (d.valid) {
    //   this.ds.postData('/users/forgotPassword', d.value).subscribe({
    //     next: (res: any) => {
    //       console.log(res);
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //     },
    //   });
    // }
  }
}
