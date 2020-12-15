import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NginPerformanceThresholdComponent } from './ngin-performance-threshold.component';

describe('NginPerformanceThresholdComponent', () => {
  let component: NginPerformanceThresholdComponent;
  let fixture: ComponentFixture<NginPerformanceThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NginPerformanceThresholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NginPerformanceThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
