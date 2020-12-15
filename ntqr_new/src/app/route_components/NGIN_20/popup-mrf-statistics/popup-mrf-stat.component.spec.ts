import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMrfStatComponent } from './popup-mrf-stat.component';

describe('PopupMrfStatComponent', () => {
  let component: PopupMrfStatComponent;
  let fixture: ComponentFixture<PopupMrfStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupMrfStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMrfStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
