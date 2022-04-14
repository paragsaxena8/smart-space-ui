import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  editEnabled = false;
  profileData: any;
  form: FormGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required]),
    active: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
  });
  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
    this.profileData = this._auth.currentUserValue.data.user;
    console.log(this.profileData);

    this.form.setValue({
      userName: this.profileData.username,
      name: this.profileData.name,
      email: this.profileData.email,
      role: this.profileData.role,
      bio: this.profileData.bio,
      active: this.profileData.active,
      photo: this.profileData.photo,
    });
    this.form.disable();
  }

  enableEdit() {
    this.form.controls['name'].enable();
    this.form.controls['bio'].enable();
    this.editEnabled = true;
  }

  get userName() {
    return this.form.controls['userName'];
  }

  get name() {
    return this.form.controls['name'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get role() {
    return this.form.controls['role'];
  }

  get bio() {
    return this.form.controls['bio'];
  }

  get active() {
    return this.form.controls['active'];
  }

  get photo() {
    return this.form.controls['photo'];
  }

  uploadImage() {}

  onSubmit() {
    console.log(this.form.value);
  }
}
