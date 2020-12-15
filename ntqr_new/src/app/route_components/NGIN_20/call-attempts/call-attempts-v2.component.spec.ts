import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallAttemptsV2Component } from './call-attempts-v2.component';

describe('CallAttemptsV2Component', () => {
  let component: CallAttemptsV2Component;
  let fixture: ComponentFixture<CallAttemptsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallAttemptsV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallAttemptsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
