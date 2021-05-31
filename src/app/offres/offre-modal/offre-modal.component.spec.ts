import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreModalComponent } from './offre-modal.component';

describe('OffreModalComponent', () => {
  let component: OffreModalComponent;
  let fixture: ComponentFixture<OffreModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffreModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
