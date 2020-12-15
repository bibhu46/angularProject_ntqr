import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBusyHourReportComponent } from './daily-busy-hour-report.component';

describe('DailyBusyHourReportComponent', () => {
  let component: DailyBusyHourReportComponent;
  let fixture: ComponentFixture<DailyBusyHourReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyBusyHourReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyBusyHourReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
