import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkThroughComponent } from './walk-through.component';

describe('WalkThroughComponent', () => {
  let component: WalkThroughComponent;
  let fixture: ComponentFixture<WalkThroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkThroughComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkThroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
