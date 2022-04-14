import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  slug: any;
  blogData: any;
  constructor(private route: ActivatedRoute, private ds: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
    });
    this.getBlogData();
  }

  getBlogData() {
    this.ds.getData(`blogs/${this.slug}`).subscribe((res: any) => {
      this.blogData = res.data;
      console.log(this.blogData);

    });
  }
}
