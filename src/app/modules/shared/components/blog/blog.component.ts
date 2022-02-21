import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { blogData } from 'src/app/interfaces/blog.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @Input() location:any;
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}').data
    .user;
  allMyBlogs$: Observable<blogData[]> = this.ds
    .getDataWithParams('blogs', {
      name: 'user',
      value: this.currentUser._id,
    })
    .pipe(
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
    private ds: DataService,
    private breakpointObserver: BreakpointObserver,
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
