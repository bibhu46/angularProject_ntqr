import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrunkgroupWatchlistSearcComponent } from './trunkgroup-watchlist-search.component';

describe('TrunkgroupWatchlistSearcComponent', () => {
  let component: TrunkgroupWatchlistSearcComponent;
  let fixture: ComponentFixture<TrunkgroupWatchlistSearcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrunkgroupWatchlistSearcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrunkgroupWatchlistSearcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
