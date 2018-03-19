import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ICourse } from '../types';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() searchTerm: string;

  courses$: Observable<ICourse[]>;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses(this.searchTerm);
  }

  ngOnChanges() {
    this.getCourses(this.searchTerm);
  }

  getCourses(searchTerm) {
    this.courses$ = this.courseService.getAllCourses(searchTerm);
  }

}
