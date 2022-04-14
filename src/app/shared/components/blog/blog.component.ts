import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { blogData } from 'src/app/core/interfaces/blog.interface';
import { UserData } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @Input() location: any;
  currentUser: UserData | null = null;
  allBlogs$!: Observable<blogData[]>;
  mybreakpoint: number = 3;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private ds: DataService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private _auth: AuthService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.currentUser =
      Object.keys(this._auth.currentUserValue).length > 0
        ? this._auth.currentUserValue.data.user
        : null;
    console.log(this.location);

    if (this.currentUser && this.location !== 'home') {
      this.allBlogs$ = this.ds
        .getDataWithParams('blogs', {
          name: 'user',
          value: this.currentUser._id,
        })
        .pipe(
          map((rsp: any) => rsp.data),
          shareReplay(),
          catchError((err) => {
            return throwError(() => new Error(err));
          })
        );
    } else {
      this.allBlogs$ = this.ds.getData('blogs').pipe(
        map((rsp: any) => rsp.data),
        shareReplay(),
        catchError((err) => {
          return throwError(() => new Error(err));
        })
      );
    }

    this.isHandset$.subscribe((isHandset) => {
      this.mybreakpoint = isHandset ? 1 : 4;
    });
  }

  openPost(blog: blogData) {
    const slug = blog.slug;
    console.log('/post', slug);
    this.router.navigate(['/blog/post', slug]);
  }

  // to Title Case
  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  htmlToPlaintext(text: string): string {
    // add dom sanitizer to prevent xss
    this.domSanitizer.bypassSecurityTrustHtml(text).toString();
    // convert html to plain text
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }
}
