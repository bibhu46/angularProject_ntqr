import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceKeyComponent } from './add-service-key.component';

describe('AddServiceKeyComponent', () => {
  let component: AddServiceKeyComponent;
  let fixture: ComponentFixture<AddServiceKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
