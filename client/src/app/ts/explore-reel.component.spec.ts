import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreReelComponent } from './explore-reel.component';

describe('ExploreReelComponent', () => {
  let component: ExploreReelComponent;
  let fixture: ComponentFixture<ExploreReelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreReelComponent]
    });
    fixture = TestBed.createComponent(ExploreReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
