import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonusThresholdComponent } from './sonus-threshold.component';

describe('SonusThresholdComponent', () => {
  let component: SonusThresholdComponent;
  let fixture: ComponentFixture<SonusThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonusThresholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonusThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
