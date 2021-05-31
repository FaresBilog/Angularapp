import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheterComponent } from './acheter.component';

describe('AcheterComponent', () => {
  let component: AcheterComponent;
  let fixture: ComponentFixture<AcheterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcheterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
