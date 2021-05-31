import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteOffreComponent } from './ajoute-offre.component';

describe('AjouteOffreComponent', () => {
  let component: AjouteOffreComponent;
  let fixture: ComponentFixture<AjouteOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
