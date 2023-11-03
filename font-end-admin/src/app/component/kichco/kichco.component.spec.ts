import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KichcoComponent } from './kichco.component';

describe('KichcoComponent', () => {
  let component: KichcoComponent;
  let fixture: ComponentFixture<KichcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KichcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KichcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
