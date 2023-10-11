import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanggiamgiaComponent } from './banggiamgia.component';

describe('BanggiamgiaComponent', () => {
  let component: BanggiamgiaComponent;
  let fixture: ComponentFixture<BanggiamgiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanggiamgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanggiamgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
