export class OrderDetail{
  idOrder: string;
  idProductDetail: string;
  quantity: string;
  price: string;

  constructor(idOrder: string, idProductDetail: string, quantity: string, price: string) {
    this.idOrder = idOrder;
    this.idProductDetail = idProductDetail;
    this.quantity = quantity;
    this.price = price;
  }
}
