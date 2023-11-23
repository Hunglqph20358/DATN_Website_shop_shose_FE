import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ColorService} from '../../service/color.service';
import {SizeService} from '../../service/size.service';
import {CookieService} from 'ngx-cookie-service';
import {UtilService} from '../../util/util.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  cartData = new Map();
  productData = new Map();

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute,
              private colorService: ColorService, private sizeService: SizeService,
              private cookieService: CookieService, private router: Router, public utilService: UtilService) {
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


  selectSize(s) {
    console.log(s);

    // Kiểm tra xem kích thước đã chọn có được chọn trước đó không, nếu có, hãy xóa lựa chọn
    if (s.isSelected) {
      this.listSize.forEach(size => {
        size.isSelected = false;
        size.disabled = false;
      });
      this.listColor.forEach(color => {
        color.disabled = false;
      });
      this.sizeId = null;
      this.checkIfBothSizeAndColorSelected();
      return; // Thoát khỏi hàm sớm
    }

    // Xóa lựa chọn trước đó
    this.listSize.forEach(size => {
      size.isSelected = false;
      size.disabled = false;
    });

    const selectedSizeId = s.id;
    const colorIDsForSelectedSize = this.product.productDetailDTOList
      .filter(detail => detail.idSize === parseInt(String(selectedSizeId), 10) && detail.idColor && detail.quantity > 0)
      .map(detail => detail.idColor);

    // Cập nhật kích thước đã chọn
    s.isSelected = true;

    // Vô hiệu hóa các kích thước không khả dụng cho màu đã chọn
    // this.listSize.forEach(size => {
    //   size.disabled = !colorIDsForSelectedSize.includes(size.id);
    // });

    // Vô hiệu hóa các màu không khả dụng cho kích thước đã chọn
    this.listColor.forEach(color => {
      color.disabled = !colorIDsForSelectedSize.includes(color.id);
    });

    this.sizeId = selectedSizeId;
    this.checkIfBothSizeAndColorSelected();
  }



  selectColor(c) {
    if (c.isSelected) {
      this.listColor.forEach(color => {
        color.disabled = false;
        color.isSelected = false;
      });
      this.listSize.forEach(size => {
        size.disabled = false;
      });
      this.colorId = null;
      this.checkIfBothSizeAndColorSelected();
      return; // Thoát khỏi hàm sớm
    }

    this.listColor.forEach(color => {
      color.disabled = false;
      color.isSelected = false;
    });

    const selectColorId = c.id;
    const sizeIDsForSelectedColor = this.product.productDetailDTOList
      .filter(detail => detail.idSize === parseInt(String(selectColorId), 10) && detail.idSize && detail.quantity > 0)
      .map(detail => detail.idColor);

    c.isSelected = true;

    this.listSize.forEach(size => {
      size.disabled = !sizeIDsForSelectedColor.includes(size.id);
    });
    this.colorId = selectColorId;
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

  buyNow(productId: any) {
    const productKey = productId + '-' + this.colorId + '-' + this.sizeId;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 30 * 60 * 1000);
    this.productData.set(productKey, 1);
    this.cookieService.set('checkout', JSON.stringify(Array.from(this.productData.entries())), expirationDate);
    this.router.navigate(['cart/checkout']);
  }
}
