import { ElementRef, Injectable, } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class WalkThroughStepsService {

    // Observable for the steps elements
    private currentElement = new BehaviorSubject({} as {stepNum: number, triggerNext: boolean, stepElement: ElementRef<any>});
    currentElement$ = this.currentElement.asObservable();

    private currentStepNum = new BehaviorSubject(0);
    currentStepNum$ = this.currentStepNum.asObservable();

    private triggerClick = new BehaviorSubject(false);
    triggerClick$ = this.triggerClick.asObservable();

    private stepsAry: {stepNum: number, triggerNext: boolean, stepElement: ElementRef}[] = [];

    constructor() {
        this.getElementAtWalkthroughIndex();
    }

    setCurrentStepNum(stepNum: number): void {
        console.log('setCurrentWalkThroughNum: ', stepNum)
        if (stepNum > 0) {
            this.currentStepNum.next(stepNum);
        }
    }

    addStepElement(element: { stepNum: number, triggerNext: boolean, stepElement: ElementRef } ): void {
        this.stepsAry.push(element);
    }

    triggerAutoClick(): void {
        this.triggerClick.next(true);
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
                this.currentElement.next(currentElement[0])
            }
        })
    }

}
