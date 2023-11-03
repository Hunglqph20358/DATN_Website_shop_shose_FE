import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:font-end-view/src/app/component/sanpham/sanpham.component.spec.ts
import { SanphamComponent } from './sanpham.component';

describe('SanphamComponent', () => {
  let component: SanphamComponent;
  let fixture: ComponentFixture<SanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanphamComponent ]
========
import { DegiayComponent } from './degiay.component';

describe('DegiayComponent', () => {
  let component: DegiayComponent;
  let fixture: ComponentFixture<DegiayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegiayComponent ]
>>>>>>>> main:font-end-admin/src/app/component/degiay/degiay.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<<< HEAD:font-end-view/src/app/component/sanpham/sanpham.component.spec.ts
    fixture = TestBed.createComponent(SanphamComponent);
========
    fixture = TestBed.createComponent(DegiayComponent);
>>>>>>>> main:font-end-admin/src/app/component/degiay/degiay.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
