import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private ds: DataService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.form.get('email');
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
