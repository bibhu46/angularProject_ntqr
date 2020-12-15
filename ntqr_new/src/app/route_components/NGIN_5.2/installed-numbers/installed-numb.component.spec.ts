import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalledNumbComponent } from './installed-numb.component';

describe('InstalledNumbComponent', () => {
  let component: InstalledNumbComponent;
  let fixture: ComponentFixture<InstalledNumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstalledNumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalledNumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
