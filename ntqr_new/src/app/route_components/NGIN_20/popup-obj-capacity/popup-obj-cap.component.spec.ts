import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupObjCapComponent } from './popup-obj-cap.component';

describe('PopupObjCapComponent', () => {
  let component: PopupObjCapComponent;
  let fixture: ComponentFixture<PopupObjCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupObjCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupObjCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
