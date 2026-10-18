import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawIntro } from './draw-intro';

describe('DrawIntro', () => {
  let component: DrawIntro;
  let fixture: ComponentFixture<DrawIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawIntro],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawIntro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
