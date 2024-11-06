import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCmComponent } from './slider-cm.component';

describe('SliderCmComponent', () => {
  let component: SliderCmComponent;
  let fixture: ComponentFixture<SliderCmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderCmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderCmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
