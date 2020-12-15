import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCallAttemptComponent } from './popup-call-attempt.component';

describe('PopupCallAttemptComponent', () => {
  let component: PopupCallAttemptComponent;
  let fixture: ComponentFixture<PopupCallAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCallAttemptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCallAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
