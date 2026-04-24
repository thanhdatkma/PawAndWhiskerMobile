import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community-alerts',
  templateUrl: './community-alerts.component.html',
  styleUrls: ['./community-alerts.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CommunityAlertsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
