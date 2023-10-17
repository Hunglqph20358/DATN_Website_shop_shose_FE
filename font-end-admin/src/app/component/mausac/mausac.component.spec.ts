import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MausacComponent } from './mausac.component';

describe('MausacComponent', () => {
  let component: MausacComponent;
  let fixture: ComponentFixture<MausacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MausacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MausacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
