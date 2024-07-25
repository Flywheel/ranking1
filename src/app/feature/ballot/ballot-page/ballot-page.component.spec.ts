import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotPageComponent } from './ballot-page.component';

describe('BallotPageComponent', () => {
  let component: BallotPageComponent;
  let fixture: ComponentFixture<BallotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallotPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BallotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
