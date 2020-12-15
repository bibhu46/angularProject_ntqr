import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInstalledNumComponent } from './popup-installed-num.component';

describe('PopupInstalledNumComponent', () => {
  let component: PopupInstalledNumComponent;
  let fixture: ComponentFixture<PopupInstalledNumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupInstalledNumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInstalledNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
