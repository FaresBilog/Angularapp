import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEntertienComponent } from './tab-entertien.component';

describe('TabEntertienComponent', () => {
  let component: TabEntertienComponent;
  let fixture: ComponentFixture<TabEntertienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEntertienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEntertienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
