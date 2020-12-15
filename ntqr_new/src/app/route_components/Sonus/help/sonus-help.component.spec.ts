import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonusHelpComponent } from './sonus-help.component';

describe('SonusHelpComponent', () => {
  let component: SonusHelpComponent;
  let fixture: ComponentFixture<SonusHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonusHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonusHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
