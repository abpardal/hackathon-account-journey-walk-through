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
    this.configs.steps.map((el: DemoStep) => el.isActive = false);
    // TODO - update info on cookies
  }

  nextStep(): void {
    const nextStepId = this.actualStep ? this.actualStep.id + 1 : 1;
    this.configs.steps.map((el: DemoStep) => el.isActive = el.id === nextStepId );

    // TODO - update info on cookies
  }

  get title(): string {
    return this.actualStep === null ? this.configs.title : this.actualStep.title;
  }

  get description(): string {
    return this.actualStep === null  ? this.configs.description : this.actualStep.description;
  }

  get actualStep(): DemoStep {
    const step = this.configs.steps.find((el: DemoStep) => el.isActive)
    return step ? step : null;
  }
}
