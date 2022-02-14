import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/interfaces/user.interface';
import { DataService } from 'src/app/services/data.service';
import { blogData } from 'src/app/interfaces/blog.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  currentUser: UserData = this._auth.currentUserValue.data.user;
  allBlogs$: Observable<blogData[]> = this.ds.getData('blogs/').pipe(
    map((rsp: any) => rsp.data),
    shareReplay()
  );
  mybreakpoint: number = 3;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _auth: AuthService,
    private ds: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isHandset$.subscribe((isHandset) => {
      this.mybreakpoint = isHandset ? 1 : 3;
    });

  }

  openPost(blog: blogData) {
    const slug = blog.slug;
    this.router.navigate(['/post', slug]);
    console.log('/post', slug);
  }

}
