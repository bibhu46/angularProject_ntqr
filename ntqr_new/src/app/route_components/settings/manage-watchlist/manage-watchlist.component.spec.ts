import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWatchlistComponent } from './manage-watchlist.component';

describe('ManageWatchlistComponent', () => {
  let component: ManageWatchlistComponent;
  let fixture: ComponentFixture<ManageWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWatchlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
