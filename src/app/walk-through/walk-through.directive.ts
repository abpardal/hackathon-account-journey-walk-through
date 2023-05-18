import {
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import {WalkThroughStepsService} from "./walk-through-steps-service";

@Directive({
  selector: '[appWalkThrough]'
})

/**
 * get all the elements that have the WalkThroughDirective along with the walk through step number &
 * store in the WalkThroughStepsService
 *
 */

export class WalkThroughDirective {

  private readonly currentElement: ElementRef;
  private value!: WalkThroughData;
  @Input() set currentStep(value: WalkThroughData) {
    this.value = value;
    const triggerNext = value.triggerNext ? value.triggerNext : false;
    this.wtStepsStorage.addStepElement({ stepNum: value.step,  triggerNext: triggerNext, stepElement:  this.currentElement })
  }

  constructor(private element: ElementRef, private wtStepsStorage: WalkThroughStepsService) {
    this.currentElement = element
  }

  @HostListener('click', ['$event.target'])
  onClick() {
    if (this.value.triggerNext) {
      this.wtStepsStorage.triggerAutoClick();
    }
  }
}

export interface WalkThroughData {
  step: number,
  triggerNext?: boolean
}
