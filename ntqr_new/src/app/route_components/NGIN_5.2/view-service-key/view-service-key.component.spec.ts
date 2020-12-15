import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceKeyComponent } from './view-service-key.component';

describe('ViewServiceKeyComponent', () => {
  let component: ViewServiceKeyComponent;
  let fixture: ComponentFixture<ViewServiceKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewServiceKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServiceKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
