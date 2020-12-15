import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsBarComponent } from './ratings-bar.component';

describe('RatingsBarComponent', () => {
  let component: RatingsBarComponent;
  let fixture: ComponentFixture<RatingsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
