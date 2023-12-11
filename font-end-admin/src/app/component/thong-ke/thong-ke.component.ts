import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ThongKeService} from '../../service/thong-ke.service';
import {formatDateYYYY_MM_dd} from '../../util/util';
import {UtilService} from '../../util/util.service';

@Component({
  selector: 'app-thong-ke',
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.scss']
})
export class ThongKeComponent implements OnInit {
  listYear = [];
  totalRevenue;
  totalRevenueToday;
  totalOrder = 0;
  totalQuantityProduct;
  seriesDataRevenue: number[] = [];
  seriesDataOrder: number[] = [];
  seriesDateStr: string[] = [];
  categoriesRevenue: string[] = [];
  categoriesOrder: string[] = [];
  listProductBestSeller: any = [];
  dateFromCurrent;
  dateToCurrent;
  checkDateRanges: boolean = false;

  public pieData = [
    { category: 'Hoàn thành', value: 0.0933},
    { category: 'Hủy', value: 0.2545 },
    { category: 'Đang xử lý', value: 0.1552 },
    { category: 'Đang giao', value: 0.4059 },
    { category: 'Chờ xác nhận', value: 0.0911 }
  ];
  constructor(private thongKeService: ThongKeService, private cdr: ChangeDetectorRef, public utilService: UtilService) {
    const currentDate = new Date();
    this.dateFromCurrent = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    this.dateToCurrent = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  }

  ngOnInit(): void {
    this.getStatistical();
    console.log(this.dateFromCurrent);
    console.log(this.dateToCurrent);
  }

  getStatistical() {
    this.totalRevenue = 0;
    this.totalOrder = 0;
    this.seriesDataRevenue = [];
    this.seriesDataOrder = [];
    this.categoriesRevenue = [];
    this.categoriesOrder = [];
    const obj = {
      dateFrom: formatDateYYYY_MM_dd(this.dateFromCurrent),
      dateTo: formatDateYYYY_MM_dd(this.dateToCurrent)
    };
    this.thongKeService.getStatisticalByYear(obj).subscribe(res => {
      this.totalRevenue = res.totalRevenue;
      this.totalOrder = res.totalOrder;
      this.totalRevenueToday = res.totalRevenueToday;
      this.totalQuantityProduct = res.totalQuantityProduct;
      this.listProductBestSeller = res.listProductBestSeller;
      this.seriesDateStr = res.statisticalAdminDTOList.map((item: any) => item.dateStr);
      this.categoriesOrder = res.statisticalAdminDTOList.map((item: any) => item.quantityOrder);
      console.log(this.seriesDateStr);
      console.log(this.categoriesOrder);
      this.cdr.detectChanges();
    });

  }

  changeGetStatistical() {
    this.getStatistical();
  }
  getDater(data) {
    console.log(data);
    if(data.startDate && data.endDate){
      this.dateFromCurrent = data.startDate;
      this.dateToCurrent = data.endDate;
      this.getStatistical();
    }
  }
  isDateRangeValid(): boolean {
    return this.checkDateRanges = this.dateFromCurrent != null && this.dateToCurrent != null;
  }
}
