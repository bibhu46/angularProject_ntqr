import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjCapacityComponent } from './obj-capacity.component';

describe('ObjCapacityComponent', () => {
  let component: ObjCapacityComponent;
  let fixture: ComponentFixture<ObjCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjCapacityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
