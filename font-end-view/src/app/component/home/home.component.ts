import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  listProductNoiBat = [];

  isMouseOver: { [key: number]: boolean } = {};

  ngOnInit(): void {
    this.productService.getProductNoiBatByBrand(0).subscribe(res => {
        this.listProductNoiBat = res;
        console.log('Data => ', this.listProductNoiBat);
    }, error => {
      console.log(error.error);
    });
  }


  onMouseEnter(product: any) {
    // Khi chuột di vào, cập nhật isMouseOver của sản phẩm này thành true
    this.isMouseOver[product.id] = true;
  }

  onMouseLeave(product: any) {
    // Khi chuột rời khỏi, cập nhật isMouseOver của sản phẩm này thành false
    this.isMouseOver[product.id] = false;
  }
}
