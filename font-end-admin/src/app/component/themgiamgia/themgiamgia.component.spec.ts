import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemgiamgiaComponent } from './themgiamgia.component';

describe('ThemgiamgiaComponent', () => {
  let component: ThemgiamgiaComponent;
  let fixture: ComponentFixture<ThemgiamgiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemgiamgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemgiamgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
