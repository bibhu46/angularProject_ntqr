import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardInformationComponent } from './edit-card-information.component';

describe('EditCardInformationComponent', () => {
  let component: EditCardInformationComponent;
  let fixture: ComponentFixture<EditCardInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCardInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
