import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOffreComponent } from './tab-offre.component';

describe('TabOffreComponent', () => {
  let component: TabOffreComponent;
  let fixture: ComponentFixture<TabOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
