import { Component, Input, Output } from '@angular/core';
import { DemoConfigs, DemoStep } from '../models/demo-configs.model';

@Component({
  selector: 'app-walk-through',
  templateUrl: './walk-through.component.html',
  styleUrls: ['./walk-through.component.scss']
})
export class WalkThroughComponent {
  @Input() configs: any;

  isPopupVisible = false;

  constructor() {
  }

  skipDemo(): void {
    this.isPopupVisible = false;
    this.configs.isVisible = false;
    // TODO - update info on cookies
  }

  nextStep(): void {
    const nextStepId = this.actualStepId + 1;
    this.configs.steps[this.actualStepId].isActive = false;
    this.configs.steps[nextStepId].isActive = true;

    // TODO - update info on cookies
  }

  get actualStepId(): number {
    const step = this.configs.steps.find((el: DemoStep) => el.isActive)
    return step ? step.id : 0;
  }

  get title(): string {
    return this.actualStepId === 0 ? this.configs.title : this.configs.steps[this.actualStepId].title;
  }

  get description(): string {
    return this.actualStepId === 0 ? this.configs.description : this.configs.steps[this.actualStepId].description;
  }
}
