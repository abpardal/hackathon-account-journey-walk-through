import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import { DemoStep } from '../models/demo-configs.model';
import {WalkThroughStepsService} from "./walk-through-steps-service";
import {take} from "rxjs";
import {DemoConfig} from "../shared/configs";

@Component({
  selector: 'app-walk-through',
  templateUrl: './walk-through.component.html',
  styleUrls: ['./walk-through.component.scss']
})
export class WalkThroughComponent {

  currentStepElement!: ElementRef;

  @ViewChild('nextBtn', { static: false }) nextBtn!: ElementRef;
  @Input() configs: any = DemoConfig;

  isPopupVisible = true;
  pointSet: PointSet | undefined = undefined

  constructor(private walkThroughService: WalkThroughStepsService, private rendered: Renderer2) {
    this.getCurrentWalkThroughElement();
    this.listenForAutoClickTrigger();
  }


  skipDemo(): void {
    this.isPopupVisible = false;
    this.configs.isVisible = false;
    this.configs.steps.map((el: DemoStep) => el.isActive = false);
    this.removeHighlight(this.currentStepElement);
    // TODO - update info on cookies
  }

  nextStep(): void {
    const nextStepId = this.actualStep ? this.actualStep.id + 1 : 1;
    // sets what the active step is
    if (this.configs && this.configs.steps) {
      this.configs.steps.map((el: DemoStep) => el.isActive = el.id === nextStepId );
      console.log('nextStepId: ', nextStepId)
      this.walkThroughService.setCurrentStepNum(nextStepId);
    }


    // TODO - update info on cookies

  }

  changeColor(x: number, y: number) {
    const elem = document.elementFromPoint(2, 2);
  }

  listenForAutoClickTrigger(): void {
    this.walkThroughService.triggerClick$.pipe(take(1)).subscribe(clickNextBtn => {
      if (clickNextBtn) {
        console.log('next clicked')
          this.nextStep();

      }
    })
  }

  getCurrentWalkThroughElement(): void {
    this.walkThroughService.currentElement$.subscribe(data => {
      console.log('getCurrentWalkThroughElement() ', data)
      if (data.stepElement) {
        this.removeHighlight(this.currentStepElement);
        this.currentStepElement = data.stepElement.nativeElement;
        const points = data.stepElement.nativeElement.getBoundingClientRect();
        this.addHighlight(data.stepElement.nativeElement);
        this.setHighlightPoints(points);
      }
    })
  }

  addHighlight(element: ElementRef): void {
    if (element) {
      this.rendered.setStyle(element, 'box-sizing', 'border-box');
      this.rendered.setStyle(element, 'border', '2px solid lime');
    }

  }
  removeHighlight(element: ElementRef): void {
    if (element) {
      this.rendered.removeStyle(element, 'border-style');
    }

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
    let step;

    if (this.configs && this.configs.steps) {
      step = this.configs.steps.find((el: DemoStep) => el.isActive)
    }
    return step ? step : null;
  }

  protected readonly undefined = undefined;
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
