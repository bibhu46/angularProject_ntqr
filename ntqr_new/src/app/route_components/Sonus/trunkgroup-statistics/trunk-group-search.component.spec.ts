import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrunkGroupSearchComponent } from './trunk-group-search.component';

describe('TrunkGroupSearchComponent', () => {
  let component: TrunkGroupSearchComponent;
  let fixture: ComponentFixture<TrunkGroupSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrunkGroupSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrunkGroupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
