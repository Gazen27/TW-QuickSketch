import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawCategories } from './draw-categories';

describe('DrawCategories', () => {
  let component: DrawCategories;
  let fixture: ComponentFixture<DrawCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawCategories],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
