import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostratedComponent } from '../components/postrated/postrated.component';

describe('PostratedComponent', () => {
  let component: PostratedComponent;
  let fixture: ComponentFixture<PostratedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostratedComponent]
    });
    fixture = TestBed.createComponent(PostratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
