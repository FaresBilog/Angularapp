import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCondidatsComponent } from './tab-condidats.component';

describe('TabCondidatsComponent', () => {
  let component: TabCondidatsComponent;
  let fixture: ComponentFixture<TabCondidatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCondidatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCondidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
