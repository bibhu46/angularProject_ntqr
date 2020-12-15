import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonusPerformanceThresholdComponent } from './sonus-performance-threshold.component';

describe('SonusPerformanceThresholdComponent', () => {
  let component: SonusPerformanceThresholdComponent;
  let fixture: ComponentFixture<SonusPerformanceThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonusPerformanceThresholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonusPerformanceThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
