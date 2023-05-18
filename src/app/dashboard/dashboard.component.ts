import { Component } from '@angular/core';
import { DemoConfigs } from '../models/demo-configs.model';
import {DemoConfig} from "../shared/configs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  demoConfigs = DemoConfig

  constructor() {
    // TODO - check if user can see demo + steps
  }
}
