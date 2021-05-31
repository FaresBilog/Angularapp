import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCompetanceComponent } from './ajout-competance.component';

describe('AjoutCompetanceComponent', () => {
  let component: AjoutCompetanceComponent;
  let fixture: ComponentFixture<AjoutCompetanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCompetanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCompetanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
