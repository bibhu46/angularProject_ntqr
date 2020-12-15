import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceKeysComponent } from './edit-service-keys.component';

describe('EditServiceKeysComponent', () => {
  let component: EditServiceKeysComponent;
  let fixture: ComponentFixture<EditServiceKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditServiceKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
