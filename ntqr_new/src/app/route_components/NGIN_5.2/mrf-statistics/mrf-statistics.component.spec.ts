import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrfStatisticsComponent } from './mrf-statistics.component';

describe('MrfStatisticsComponent', () => {
  let component: MrfStatisticsComponent;
  let fixture: ComponentFixture<MrfStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrfStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrfStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
