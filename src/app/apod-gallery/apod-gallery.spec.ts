import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApodGallery } from './apod-gallery';

describe('ApodGallery', () => {
  let component: ApodGallery;
  let fixture: ComponentFixture<ApodGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApodGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(ApodGallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
