import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncnCustomerComponent } from './incn-customer.component';

describe('IncnCustomerComponent', () => {
  let component: IncnCustomerComponent;
  let fixture: ComponentFixture<IncnCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncnCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncnCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
