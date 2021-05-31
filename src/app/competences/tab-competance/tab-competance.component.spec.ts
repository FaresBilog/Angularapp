import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCompetanceComponent } from './tab-competance.component';

describe('TabCompetanceComponent', () => {
  let component: TabCompetanceComponent;
  let fixture: ComponentFixture<TabCompetanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCompetanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCompetanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
