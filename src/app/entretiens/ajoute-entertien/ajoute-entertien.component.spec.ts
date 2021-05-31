import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteEntertienComponent } from './ajoute-entertien.component';

describe('AjouteEntertienComponent', () => {
  let component: AjouteEntertienComponent;
  let fixture: ComponentFixture<AjouteEntertienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteEntertienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteEntertienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
