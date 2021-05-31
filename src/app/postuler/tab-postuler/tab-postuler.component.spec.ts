import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPostulerComponent } from './tab-postuler.component';

describe('TabPostulerComponent', () => {
  let component: TabPostulerComponent;
  let fixture: ComponentFixture<TabPostulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPostulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPostulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
