import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawPreview } from './draw-preview';

describe('DrawPreview', () => {
  let component: DrawPreview;
  let fixture: ComponentFixture<DrawPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
