import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSysStatComponent } from './popup-sys-stat.component';

describe('PopupSysStatComponent', () => {
  let component: PopupSysStatComponent;
  let fixture: ComponentFixture<PopupSysStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSysStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSysStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
