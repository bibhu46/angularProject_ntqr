import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceKeyComponent } from './update-service-key.component';

describe('UpdateServiceKeyComponent', () => {
  let component: UpdateServiceKeyComponent;
  let fixture: ComponentFixture<UpdateServiceKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateServiceKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateServiceKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
