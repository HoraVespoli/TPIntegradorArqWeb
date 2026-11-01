import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Apod } from './apod';

describe('Apod', () => {
  let component: Apod;
  let fixture: ComponentFixture<Apod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Apod],
    }).compileComponents();

    fixture = TestBed.createComponent(Apod);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
