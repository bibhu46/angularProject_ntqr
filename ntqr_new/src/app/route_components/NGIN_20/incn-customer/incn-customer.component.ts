import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerReportsService } from 'src/app/services/ngin/customer-reports.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global-service.service';
import { Title } from '@angular/platform-browser'; 

@Component({
  selector: 'app-incn-customer',
  templateUrl: './incn-customer.component.html',
  styleUrls: ['./incn-customer.component.scss']
})
export class IncnCustomerComponentV20 implements OnInit {

  customer_form = new FormGroup({
    customer_name: new FormControl({ value: "", disabled: false }, [Validators.required]),
  });


  constructor(private CustomerReportsService: CustomerReportsService, private router: Router, private global: GlobalService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NGIN 20 Incn Customers'); 
  }

  
  customer_submit_form() {
    console.log('called');
    let customer_form_value = this.customer_form.value;
    let submit_obj =
    {
      "incnCustomerName": customer_form_value.customer_name,
    };
    console.log(submit_obj);
    this.CustomerReportsService.addCustomerInList(submit_obj).subscribe((results) => {

      console.log(results)
      let mess = "The Customer <span class='color-red'>" + customer_form_value.customer_name + "</span> has been added successfully";

      let modal_obj = {
        title: '<span>Customer </span> Status',
        size: "sm",
        color: "green",
        auto_close: false,
        content: '<p class="text-center my-3">' + mess + '</p>'
      };

      this.global.open_alert_message(modal_obj);
    })
    this.router.navigate(['/ngin20/addedCustomerList']);
  }
  onCancel() {
    console.log('cancel')
    this.router.navigate(['/ngin20/addedCustomerList']);
  }

}
