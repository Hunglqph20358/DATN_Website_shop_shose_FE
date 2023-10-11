import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemvoucherComponent } from './themvoucher.component';

describe('ThemvoucherComponent', () => {
  let component: ThemvoucherComponent;
  let fixture: ComponentFixture<ThemvoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemvoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
