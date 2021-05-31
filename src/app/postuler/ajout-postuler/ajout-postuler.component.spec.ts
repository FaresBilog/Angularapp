import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPostulerComponent } from './ajout-postuler.component';

describe('AjoutPostulerComponent', () => {
  let component: AjoutPostulerComponent;
  let fixture: ComponentFixture<AjoutPostulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPostulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPostulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
