import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceKeysComponent } from './service-keys.component';

describe('ServiceKeysComponent', () => {
  let component: ServiceKeysComponent;
  let fixture: ComponentFixture<ServiceKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
