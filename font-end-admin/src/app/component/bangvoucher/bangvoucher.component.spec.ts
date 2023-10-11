import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BangvoucherComponent } from './bangvoucher.component';

describe('BangvoucherComponent', () => {
  let component: BangvoucherComponent;
  let fixture: ComponentFixture<BangvoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BangvoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
