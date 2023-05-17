import {
  AfterViewInit,
  Directive,
  ElementRef,
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
  @Input() set currentStep(value) {
    this.wtStepsStorage.addStepElement({ stepNum: value, stepElement:  this.currentElement })
  }

  constructor(private element: ElementRef, private wtStepsStorage: WalkThroughStepsService) {
    this.currentElement = element.nativeElement;
  }

}
