import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetComponent } from '../account/reset/reset.component';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetComponent]
    });
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
