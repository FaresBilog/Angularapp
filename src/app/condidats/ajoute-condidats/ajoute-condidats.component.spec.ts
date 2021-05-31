import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteCondidatsComponent } from './ajoute-condidats.component';

describe('AjouteCondidatsComponent', () => {
  let component: AjouteCondidatsComponent;
  let fixture: ComponentFixture<AjouteCondidatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteCondidatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteCondidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
