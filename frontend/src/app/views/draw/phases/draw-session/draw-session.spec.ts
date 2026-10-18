import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawSession } from './draw-session';

describe('DrawSession', () => {
  let component: DrawSession;
  let fixture: ComponentFixture<DrawSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawSession],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawSession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
