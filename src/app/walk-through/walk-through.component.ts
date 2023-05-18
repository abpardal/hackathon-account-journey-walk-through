import { Component, ElementRef, Input, ViewChild} from '@angular/core';
import { DemoStep } from '../models/demo-configs.model';
import {WalkThroughStepsService} from "./walk-through-steps-service";

@Component({
  selector: 'app-walk-through',
  templateUrl: './walk-through.component.html',
  styleUrls: ['./walk-through.component.scss']
})
export class WalkThroughComponent {

  @ViewChild('nextBtn', { static: false }) nextBtn!: ElementRef;
  @Input() configs: any;

  isPopupVisible = true;
  pointSet: PointSet | undefined = undefined

  constructor(private walkThroughService: WalkThroughStepsService) {
    this.getCurrentWalkThroughElement();
    this.listenForAutoClickTrigger();
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

    this.walkThroughService.setCurrentStepNum(nextStepId);

    // TODO - update info on cookies

  }

  listenForAutoClickTrigger(): void {
    this.walkThroughService.triggerClick$.subscribe(clickNextBtn => {
      if (clickNextBtn) {
        console.log('next clicked')
          this.nextStep();

      }
    })
  }

  getCurrentWalkThroughElement(): void {
    this.walkThroughService.currentElement$.subscribe(data => {
      if (data.stepElement) {
        const points = data.stepElement.nativeElement.getBoundingClientRect();
        this.setHighlightPoints(points);
      }
    })
  }

  private setHighlightPoints(points: PointSet) {
    this.pointSet = { left: points.left, height: points.height, top: points.top,
      width: points.width, bottom: points.bottom, right: points.right, x: points.x, y: points.y }
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

export interface PointSet {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number
  x: number,
  y: number
}
