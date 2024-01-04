export class OrderDetail{
  idOrder: string;
  idProductDetail: string;
  quantity: string;
  price: number;

  constructor(idOrder: string, idProductDetail: string, quantity: string, price: number) {
    this.idOrder = idOrder;
    this.idProductDetail = idProductDetail;
    this.quantity = quantity;
    this.price = price;
  }
}
