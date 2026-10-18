import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawWords } from './draw-words';

describe('DrawWords', () => {
  let component: DrawWords;
  let fixture: ComponentFixture<DrawWords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawWords],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawWords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
