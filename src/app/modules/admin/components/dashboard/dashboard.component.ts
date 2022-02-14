import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { blogData } from 'src/app/interfaces/blog.interface';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
  constructor(private ds: DataService) {}

  ngOnInit(): void {}
}
