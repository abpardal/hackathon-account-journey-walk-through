import { Component } from '@angular/core';
import { DemoConfigs } from '../models/demo-configs.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  demoConfigs: DemoConfigs = {
    position: {
      bottom: '16px',
      right: '16px'
    }, 
    isVisible: true,
    title: 'Hey, there!',
    description: 'Welcome to our demo. Let\'s start exploring the plataform', 
    steps: [
      {
        id: 1,
        title: 'Let\'s create a new site',
        description: 'Test',
        isActive: false
      },
      {
        id: 2,
        title: 'Sites Page',
        description: 'Test',
        isActive: false
      },
    ] 
  };

  constructor() {
    // TODO - check if user can see demo + steps
  }
}
