import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-blog-action',
  templateUrl: './blog-action.component.html',
  styleUrls: ['./blog-action.component.scss'],
})
export class BlogActionComponent implements OnInit, OnDestroy {
  form: any;
  editor: Editor = new Editor();
  html = '';
  @ViewChild('UploadFileInput') uploadFileInput: any;
  myfilename: string = '';
  imageData: any;
  tagList: Observable<any> = this.ds.getData('tags').pipe(
    map((res: any) => {
      console.log(res.data);
      return res.data;
    })
  );
  categories: Observable<any> = this.ds.getData('categories').pipe(
    map((res: any) => {
      console.log(res.data);
      return res.data;
    })
  );
  imageUploadError: any = false;
  constructor(
    private ds: DataService,
    private _auth: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      image: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
    });
  }

  get title() {
    return this.form.get('title');
  }

  get content() {
    return this.form.get('content');
  }

  get category() {
    return this.form.get('category');
  }

  get tags() {
    return this.form.get('tags');
  }

  get image() {
    return this.form.get('image');
  }

  fileChangeEvent(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (file && allowedMimeTypes.includes(file.type)) {
        this.myfilename = `featured-image.${file.type.split('/')[1]}`;
        this.form.patchValue({ image: file });
        this.imageUploadError = false;
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.onerror = () => {
          this.imageUploadError = 'Unable to read file';
        };
        reader.readAsDataURL(file);
      } else {
        this.imageUploadError = 'Only png, jpeg and jpg files are allowed';
      }
    }
  }

  onSubmit(d: FormGroup) {

    if (d.valid) {
      const htmlDOC = toHTML(d.value.content);
      console.log('Blog is ready to be posted');
      const formData = new FormData();
      formData.append('title', d.value.title);
      formData.append('image', d.value.image, d.value.title.replace(/\s/g, ''));
      formData.append('body', htmlDOC);
      formData.append('author', this._auth.currentUserValue.data.user._id);
      formData.append('category', d.value.category);
      formData.append('tags', d.value.tags);
      this.ds.postData('blogs', formData).subscribe((res: any) => {
        console.log(res);
        this._snackBar.open('Blog posted successfully');
        this.router.navigate(['/blogs']);
      });
      this.form.reset();
      this.imageData = null;
    }
  }
}
