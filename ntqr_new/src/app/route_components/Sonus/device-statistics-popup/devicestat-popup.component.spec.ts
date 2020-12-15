import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStatPopupComponent } from './devicestat-popup.component';

describe('DevicekpiPopupComponent', () => {
  let component: DeviceStatPopupComponent;
  let fixture: ComponentFixture<DeviceStatPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceStatPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStatPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
