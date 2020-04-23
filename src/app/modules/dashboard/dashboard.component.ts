import { Component, OnInit } from '@angular/core';

interface Count {
  value: Number;
  viewValue: Number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  counts: Count[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 }
  ]

  selectedCount = this.counts[0].value;

  constructor() { }

  ngOnInit(): void {
  }

}
