import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegiayComponent } from './degiay.component';

describe('DegiayComponent', () => {
  let component: DegiayComponent;
  let fixture: ComponentFixture<DegiayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegiayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegiayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
