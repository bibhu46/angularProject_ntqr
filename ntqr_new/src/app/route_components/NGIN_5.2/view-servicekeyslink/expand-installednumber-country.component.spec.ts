import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandInstallednumberCountryComponent } from './expand-installednumber-country.component';

describe('ExpandInstallednumberCountryComponent', () => {
  let component: ExpandInstallednumberCountryComponent;
  let fixture: ComponentFixture<ExpandInstallednumberCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandInstallednumberCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandInstallednumberCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
