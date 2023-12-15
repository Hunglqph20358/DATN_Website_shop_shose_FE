import {CustomerSalesDTO} from './CustomerSalesDTO';

export class Order{
  id?: number;
  code?: string;
  idCustomer?: number;
  idStaff?: number;
  codeVoucher?: string;
  createDate?: string;
  paymentDate?: string;
  deliveryDate?: string;
  receivedDate?: string;
  addressReceived?: string;
  shipperPhone?: string;
  receiverPhone?: string;
  receiver?: string;
  shipPrice?: string;
  totalPrice?: number;
  totalPayment?: number;
  paymentType?: number;
  description?: string;
  statusPayment?: string;
  status?: number;
  customerDTO: CustomerSalesDTO;
  email?: string;
  constructor(id: number, code: string, idCustomer: number, idStaff: number, codeVoucher: string, createDate: string, paymentDate: string, deliveryDate: string, receivedDate: string, addressReceived: string, shipperPhone: string, receiverPhone: string, receiver: string, shipPrice: string, totalPrice: number, totalPayment: number, paymentType: number, description: string, status: number, customerDTO: CustomerSalesDTO, email: string) {
    this.id = id;
    this.code = code;
    this.idCustomer = idCustomer;
    this.idStaff = idStaff;
    this.codeVoucher = codeVoucher;
    this.createDate = createDate;
    this.paymentDate = paymentDate;
    this.deliveryDate = deliveryDate;
    this.receivedDate = receivedDate;
    this.addressReceived = addressReceived;
    this.shipperPhone = shipperPhone;
    this.receiverPhone = receiverPhone;
    this.receiver = receiver;
    this.shipPrice = shipPrice;
    this.totalPrice = totalPrice;
    this.totalPayment = totalPayment;
    this.paymentType = paymentType;
    this.description = description;
    this.status = status;
    this.customerDTO = customerDTO;
    this.email = email;
  }
}
