import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatiluserOffreComponent } from './deatiluser-offre.component';

describe('DeatiluserOffreComponent', () => {
  let component: DeatiluserOffreComponent;
  let fixture: ComponentFixture<DeatiluserOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeatiluserOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeatiluserOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
