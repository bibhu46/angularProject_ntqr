import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncnCustomerComponent } from './edit-incn-customer.component';

describe('EditIncnCustomerComponent', () => {
  let component: EditIncnCustomerComponent;
  let fixture: ComponentFixture<EditIncnCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIncnCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIncnCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
