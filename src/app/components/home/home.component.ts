import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date = new Date();
  calendario: NgbDateStruct = { day: this.date.getUTCDay(), month: this.date.getUTCMonth(), year: this.date.getUTCFullYear()};
  day: string;

  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {
  }

}
