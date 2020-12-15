import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NginRatingbarComponent } from './ngin-ratingbar.component';

describe('NginRatingbarComponent', () => {
  let component: NginRatingbarComponent;
  let fixture: ComponentFixture<NginRatingbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NginRatingbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NginRatingbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
