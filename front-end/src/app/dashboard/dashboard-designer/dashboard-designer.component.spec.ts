import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDesignerComponent } from './dashboard-designer.component';

describe('DashboardDesignerComponent', () => {
  let component: DashboardDesignerComponent;
  let fixture: ComponentFixture<DashboardDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
