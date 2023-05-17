import { ElementRef, Injectable, } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class WalkThroughStepsService {

    // Observable for the steps elements
    private currentElement = new BehaviorSubject({ });
    currentElement$ = this.currentElement.asObservable();

    private currentStepNum = new BehaviorSubject(0);
    currentStepNum$ = this.currentStepNum.asObservable();

    private stepsAry: {stepNum: number, stepElement: ElementRef}[] = [];

    constructor() {
        this.getElementAtWalkthroughIndex();
    }

    setCurrentWalkThroughNum(stepNum: number): void {
        console.log('setCurrentWalkThroughNum: ', stepNum)
        if (stepNum > 0) {
            this.currentStepNum.next(stepNum);
        }
    }

    addStepElement(element: { stepNum: number, stepElement: ElementRef } ): void {
        this.stepsAry.push(element);
    }

    // listen for a new step number, find element associated with that number
    // & send to currentElement$ observable
    private getElementAtWalkthroughIndex(){
        console.log('getElementAtWalkthroughIndex')
        this.currentStepNum$.subscribe(stepNum => {
            const currentElement = this.stepsAry.filter(stepEl => {
                return stepEl.stepNum === stepNum;
            })
            if (currentElement[0]) {
                console.log('currentElement[0]: ', currentElement[0])
                this.currentElement.next(currentElement[0])
            }
        })
    }

}
