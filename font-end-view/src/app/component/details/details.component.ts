import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {ColorService} from '../../service/color.service';
import {SizeService} from '../../service/size.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  cartData = new Map();

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute,
              private colorService: ColorService, private sizeService: SizeService,
              private cookieService: CookieService) {
    // @ts-ignore
    window.scrollTo(top, 0, 0);
    if (this.cookieService.check('cart')) {
      const cartData = this.cookieService.get('cart');
      const entries = JSON.parse(cartData);
      this.cartData = new Map(entries);
    }

  }

  product: any;
  listColor = [];
  listSize = [];

  colorId: number | null = null;
  sizeId: number | null = null;
  bothSizeAndColorSelected: boolean = false;
  sizeSelected: boolean = false;
  colorSelected: boolean = false;


  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params.idProduct;
      this.productService.getDetailProduct(id).subscribe(res => {
        this.product = res.data;
        console.log(this.product);
      });
    });
    this.colorService.getAllColor().subscribe(res => {
      this.listColor = res;
    });
    this.sizeService.getAllSize().subscribe(res => {
      this.listSize = res;
    });
  }

  selectSize(event: any) {
    const selectedSizeId = event.target.value;
    const colorIDsForSelectedSize = this.product.productDetailDTOList
      .filter(detail => detail.idSize === parseInt(String(selectedSizeId), 10))
      .map(detail => detail.idColor);
    this.listSize.forEach(size => {
      size.isSelected = size.id == selectedSizeId; // So sánh id với selectedSizeId
    });

    this.listColor.forEach(c => {
      c.disabled = !colorIDsForSelectedSize.includes(c.id);
    });
    this.sizeId = selectedSizeId;
    this.sizeSelected = true;
    this.checkIfBothSizeAndColorSelected();
  }


  selectColor(event: any) {
    const selectedColorId = event.target.value;

    const sizeIDsForSelectedColor = this.product.productDetailDTOList
      .filter(detail => detail.idColor === parseInt(String(selectedColorId), 10))
      .map(detail => detail.idSize);

    this.listColor.forEach(c => {
      c.isSelected = c.id == selectedColorId; // So sánh id với selectedColorId
    });
    this.colorId = event.target.value;
    this.listSize.forEach(s => {
      s.disabled = !sizeIDsForSelectedColor.includes(s.id);
    });
    this.colorSelected = true;
    this.checkIfBothSizeAndColorSelected();
  }

  checkIfBothSizeAndColorSelected() {
    // Kiểm tra xem đã chọn cả size và color chưa
    this.bothSizeAndColorSelected = this.colorId !== null && this.sizeId !== null;
  }

  getProductDetailQuantity(): number {
    if (this.sizeId !== null && this.colorId !== null) {
      const selectedProductDetail = this.product.productDetailDTOList.find(
        detail => detail.idSize === parseInt(String(this.sizeId), 10) && detail.idColor === parseInt(String(this.colorId), 10)
      );
      if (selectedProductDetail) {
        return selectedProductDetail.quantity;
      }
    }
    return 0; // Trả về 0 nếu không tìm thấy hoặc chưa chọn cả size và color
  }

  refresh(resetType: 'size' | 'color') {
    if (resetType === 'size') {
      this.listSize.forEach(s => {
        s.isSelected = false;
        s.disabled = false;
      });
      this.listColor.forEach(c => {
        c.disabled = false;
      });
      this.sizeId = null;
      this.sizeSelected = false;
    } else if (resetType === 'color') {
      this.listColor.forEach(c => {
        c.isSelected = false;
        c.disabled = false;
      });
      this.listSize.forEach(s => {
        s.disabled = false;
      });
      this.colorId = null;
      this.colorSelected = false;
    }
    this.checkIfBothSizeAndColorSelected();
  }

  addToCart(product: number) {
    const productKey = product + '-' + this.colorId + '-' + this.sizeId;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 30 * 60 * 1000);
    if (this.cartData.has(productKey)) {
      const slHienTai = this.cartData.get(productKey);
      this.cartData.set(productKey, slHienTai + 1);
      this.cookieService.set('cart', JSON.stringify(Array.from(this.cartData.entries())), expirationDate);
    } else {
      this.cartData.set(productKey, 1);
      this.cookieService.set('cart', JSON.stringify(Array.from(this.cartData.entries())), expirationDate);
    }
    console.log(this.cartData);

  }
}
