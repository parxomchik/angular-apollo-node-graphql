import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from '../types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() course: ICourse;
  constructor() { }

  ngOnInit() {
  }

}
