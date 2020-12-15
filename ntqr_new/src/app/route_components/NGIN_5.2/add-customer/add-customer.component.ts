import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CustomerReportsService } from 'src/app/services/ngin/customer-reports.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerList: any;

  constructor(private CustomerReportsService: CustomerReportsService, private router: Router, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 5.2 Add Customer');  
    this.get_customer_list();
  }
  get_customer_list() {
    this.global.show_loader();
    this.CustomerReportsService.getCustomerList().subscribe((results) => {
      this.customerList = results.responseResult.result.incnCustomerList;
      this.global.hide_loader();
    })
  }
  onCancel() {
    this.router.navigate(['/ngin5.2/customerReports']);
  }

  addCustomer() {
    this.router.navigate(['/ngin5.2/addCustomer']);
  }

  deleteCustomer(name) {
    this.global.show_loader();
    this.CustomerReportsService.deleteCustomerInList(name).subscribe((results) => {
      this.global.hide_loader();
    })
    let mess = "The Customer <span class='color-red'>" + name + "</span> has been deleted successfully";

    let modal_obj = {
      title: '<span>Customer </span> Status',
      size: "sm",
      color: "green",
      auto_close: false,
      content: '<p class="text-center my-3">' + mess + '</p>'
    };

    this.global.open_alert_message(modal_obj);

    this.get_customer_list();
    
  }

  editCustomer(name, id) {
    this.router.navigate(['/ngin5.2/editCustomer/' + name +"/"+ id]);
  }
}
