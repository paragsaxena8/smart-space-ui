import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  currentPath = this.route.snapshot.data['title'];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.currentPath);
    console.log(this.route.snapshot.data);

  }
}
