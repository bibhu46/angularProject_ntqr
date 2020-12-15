import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonusDataAvailabilityComponent } from './sonus-data-availability.component';

describe('SonusDataAvailabilityComponent', () => {
  let component: SonusDataAvailabilityComponent;
  let fixture: ComponentFixture<SonusDataAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonusDataAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonusDataAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
