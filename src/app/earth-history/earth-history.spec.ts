import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EarthHistory } from './earth-history';

describe('EarthHistory', () => {
  let component: EarthHistory;
  let fixture: ComponentFixture<EarthHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarthHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(EarthHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
