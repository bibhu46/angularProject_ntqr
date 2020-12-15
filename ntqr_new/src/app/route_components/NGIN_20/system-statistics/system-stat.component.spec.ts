import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatComponent } from './system-stat.component';

describe('SystemStatComponent', () => {
  let component: SystemStatComponent;
  let fixture: ComponentFixture<SystemStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
