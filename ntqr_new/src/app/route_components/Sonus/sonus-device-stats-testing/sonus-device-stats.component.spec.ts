import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonusDeviceStatsComponent } from './sonus-device-stats.component';

describe('SonusDeviceStatsComponent', () => {
  let component: SonusDeviceStatsComponent;
  let fixture: ComponentFixture<SonusDeviceStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonusDeviceStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonusDeviceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
