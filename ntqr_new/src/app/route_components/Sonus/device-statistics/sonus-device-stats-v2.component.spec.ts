import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonusDeviceStatsV2Component } from './sonus-device-stats-v2.component';

describe('SonusDeviceStatsV2Component', () => {
  let component: SonusDeviceStatsV2Component;
  let fixture: ComponentFixture<SonusDeviceStatsV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonusDeviceStatsV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonusDeviceStatsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
