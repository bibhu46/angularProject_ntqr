import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalledNumbComponentV20 } from './installed-numb.component';

describe('InstalledNumbComponent', () => {
  let component: InstalledNumbComponentV20;
  let fixture: ComponentFixture<InstalledNumbComponentV20>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstalledNumbComponentV20 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalledNumbComponentV20);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
